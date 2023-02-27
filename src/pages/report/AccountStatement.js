import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  notification,
  Popover,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import { MoreActionCSV } from "../../components/Reports/MoreAction";
import SendEmail, {
  SendEmailDefault,
} from "../../components/Reports/SendEmail";
import { bell, toggler } from "../../components/Icons";
import ButtonCustom from "../../components/Button/index";
import AppContext from "../../components/context/AppContext";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import { getTotalGlobal, numberWithDot } from "../../components/Utils";
import jsPDF from "jspdf";
import "jspdf-autotable";
const dateFormat = "DD/MM/YYYY";

export default function AccountStatement() {
  const [open, setOpen] = useState(false);
  const { Title } = Typography;
  let history = useHistory();
  const [clicked, setClicked] = useState(false);
  const { user } = useContext(AppContext);
  const [newUser, setNewUser] = useState(
    JSON.parse(localStorage.getItem("newUser")) || { data: "" }
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get("clientId");
  const [filter, setFilter] = useState({
    currency: "USD",
    start_date:moment().startOf('year').format("MM/DD/YYYY"),
 end_date:moment().endOf('year').format("MM/DD/YYYY"),
  });
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([
    { label: "Date", key: "date" },
    { label: "Description", key: "desc" },
    { label: "Invoice#", key: "invoice" },
    { label: "Invoice Due", key: "due" },
    { label: "Amount", key: "amount" },
    { label: "Paid", key: "paid" },
    { label: "Currency", key: "currency" },
  ]);
  const myRef = useRef(null);

//   useEffect(() => {
// setFilter({ ...filter, client_id: clientId });
//   }, [clientId]);

 
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  const onFinish = (values) => {
    setFilter({
      start_at: values.start_at._d,
      finish_at:values.finish_at._d,
      currency: values.currency === undefined ? "USD" : values.currency,
    });
    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterAccountStatement = (
    <div>
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <p
          tw="text-base text-primary cursor-pointer"
          onClick={() => setFilter({ currency: "" })}
        >
          Reset All
        </p>
      </div>
      <span tw="text-black ">DATE RANGE</span>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
        fields={[
          { name: ["start_at"], value:  filter.start_at
          ? moment(new Date(filter.start_at), dateFormat)
          : "" },
          { name: ["finish_at"], value: filter.finish_at
          ? moment(new Date(filter.finish_at), dateFormat)
          : "" },
          {
            name: ["currency"],
            value: filter?.currency,
          },
        ]}
      >
        <Row gutter={24}>
          {/* <Col span={24}>
            <Form.Item name="time">
              <Select
                defaultValue="this-year"
                options={[
                  {
                    value: "this-year",
                    label: "This Year",
                  },
                  {
                    value: "this-month",
                    label: "This Month",
                  },
                  {
                    value: "this-month",
                    label: "This Month",
                  },
                  {
                    value: "last-year",
                    label: "Last Year",
                  },
                ]}
              />
            </Form.Item>
          </Col> */}
<Col span={24}>
            <Form.Item name="start_at">
              <DatePicker
                tw="w-full rounded-md"
             
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="finish_at">
              <DatePicker
                tw="w-full rounded-md"
               
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Currency" name="currency">
              <Select
                options={[
                  {
                    value: "USD",
                    label: "USD - US dollar",
                  },
                  {
                    value: "GBP",
                    label: "GBP - Pound Sterling",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={12}>
            <Button tw="text-lg px-8" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Col>
          <Col span={12}>
            <Button htmlType="submit" tw="text-lg text-white bg-success px-8">
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
  const { data: dataStatement, status: statusStatement } = useQuery(
    ["trial-balance", filter],
    async (key) =>
      axios
        .get("reports/account-statement", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );
  useEffect(() => {
    if(user){
      localStorage.setItem("newUser", JSON.stringify(user))
      setFilter({ ...filter, currency: user?.data?.base_currency,client_id:clientId })
    };
    if(newUser){
      setFilter({ ...filter, currency: newUser?.data?.base_currency,client_id:clientId })
    };
  }, [user || newUser]);
  const { data: dataClients, status } = useQuery(["clients"], async (key) =>
    axios
      .get("clients", {
        params: key.queryKey[1],
      })
      .then((res) => res.data.data)
  );
  let newDataItems =
    statusStatement === "success" &&
    dataStatement?.data?.details?.invoices?.map((item) => [
      moment(new Date(item?.created_at)).format("MMM DD, YYYY"),
      item.notes,
      item.code,
      moment(new Date(item?.due_date)).format("MMM DD, YYYY"),
      numberWithDot(item?.total),
      item?.paid_at && moment(new Date(item?.paid_at)).format("MMM DD, YYYY"),
      filter.currency,
    ]);
  const newDataHeaders = statusStatement === "success" && [
    [
      `Account Statement ${moment(
        new Date(new Date().getFullYear(), 0, 1)
      ).format("MMM DD, YYYY")} - ${moment(
        new Date(new Date().getFullYear(), 11, 31)
      ).format("MMM DD, YYYY")}`,
      "",
      "",
      "",
      "",
      "",
      "",
    ],
    ["", "", "", "", "", "", ""],
    ["Summary", "", "", "", "", "", ""],
    [
      "Invoiced Total",
      dataStatement?.data?.data?.invoice,
      filter.currency,
      "",
      "",
      "",
      "",
    ],
    [
      "Paid Total",
      dataStatement?.data?.data?.paid,
      filter.currency,
      "",
      "",
      "",
      "",
    ],
    [
      "Available Credit",
      dataStatement?.data?.data?.credit,
      filter.currency,
      "",
      "",
      "",
      "",
    ],
    [
      "Account Balance",
      dataStatement?.data?.data &&
        getTotalData(
          Object.values(dataStatement?.data?.data)?.map((item) => {
            const splitAmount = item?.split(".");
            return parseInt(splitAmount[0]);
          })
        ),
      filter.currency,
      "",
      "",
      "",
      "",
    ],
    [
      "Date",
      "Description",
      "Invoice#",
      "Invoice Due",
      "Amount",
      "Paid",
      "Currency",
    ],
  ];
  // useEffect(() => {
  //   user && localStorage.setItem("newUser", JSON.stringify(user));
  // }, [user]);
  useEffect(() => {
    if (statusStatement === "success") {
      setData([...newDataHeaders, ...newDataItems]);
    }
  }, [statusStatement]);
  const csvReport = {
    data: data,
    // headers: headers,
    filename: `${dataStatement?.data?.client?.first_name}_${dataStatement?.data?.client?.last_name}_account_statement.csv`,
  };
  const generatePdf = () => {
    const doc = new jsPDF();

    doc.autoTable({
    body:data});

    doc.save(`${dataStatement?.data?.client?.first_name}_${dataStatement?.data?.client?.last_name}_account_statement.pdf`);
  };

  const mutation = useMutation(
    async (data) => {
      return axios
        .post(`reports/account-statement/send?client_id=${clientId}`, data)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        notification.success({
          message: `Account Statement has been sent`,
          placement: "topLeft",
        });
        hide();
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        console.log(err.response.data.message);
      },
    }
  );
  console.log("filter",clientId,filter)

  return (
    <div tw="max-w-screen-lg mx-auto">
      <div tw="grid grid-cols-1 gap-y-2 md:grid-cols-2 mx-5">
        <div tw="flex justify-between md:hidden">
          <div>{bell}</div>
          <ButtonCustom
            tw="!bg-transparent !border-0 hover:opacity-50"
            type="link"
            className="sidebar-toggler"
            // onClick={() => onPress()}
          >
            {toggler}
          </ButtonCustom>
        </div>
        <div tw="md:col-span-2">
          <button
            onClick={() => history.goBack()}
            tw="bg-transparent flex items-center mt-5 text-primary cursor-pointer"
          >
            <LeftOutlined />
            <span tw="ml-1">Reports</span>
          </button>
        </div>
        <div tw="flex items-center">
          <span tw="capitalize text-black text-4xl font-bold">
            Account Statement
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover
            placement="bottom"
            content={
              <MoreActionCSV myRef={myRef} csvReport={{ ...csvReport }}  generatePdf={generatePdf}/>
            }
            trigger="click"
          >
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>
          <Popover
            placement="bottom"
            content={
              <SendEmailDefault
                hide={hide}
                dataClients={dataClients}
                user={newUser}
                mutation={mutation}
              />
            }
            trigger="click"
            visible={clicked}
            onVisibleChange={handleClickChange}
          >
            <Button tw=" md:ml-2 bg-success text-white px-4  flex justify-center items-center ">
              <span tw="text-lg">Send...</span>
            </Button>
          </Popover>
        </div>
      </div>

      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5">
        <div ref={myRef} tw="md:col-span-9 mb-10 mt-10 md:mt-2">
          <CardReporting>
            <h1 tw="text-blueDefault">Account Statement</h1>
            <p>
            For {moment(new Date(filter.start_at)).format("MMM DD, YYYY")} - {moment(new Date(filter.finish_at)).format("MMM DD, YYYY")}
            </p>
            <div tw="flex justify-between items-end">
              {statusStatement === "loading" && (
                <div
                  role="status"
                  tw="flex flex-col w-full h-full items-center justify-center"
                >
                  <svg
                    tw="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              {statusStatement === "success" && (
                <div>
                  <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                    {dataStatement?.data?.client?.company_name[0]}
                  </span>
                  <span>{dataStatement?.data?.client?.company_name}</span>
                </div>
              )}
              <div tw="my-3 flex flex-col text-right">
                <span tw="text-sm text-gray-600">
                  {user?.data?.company_name || newUser?.data?.company_name}
                </span>
                <span tw="text-sm text-gray-600">
                  {user?.data?.address || newUser?.data?.address}
                </span>
                <span tw="text-sm text-gray-600">
                  {user?.data?.city || newUser?.data?.city}
                </span>
                <span tw="text-sm text-gray-600">
                  {user?.data?.zip || newUser?.data?.zip}
                </span>
                <span tw="text-sm text-gray-600">
                  {user?.data?.country || newUser?.data?.country}
                </span>
              </div>
            </div>
            <div tw="overflow-x-auto ">
              <table>
                <thead>
                  <tr>
                    <th tw="text-left py-4 ">Summary</th>
                  </tr>
                </thead>
                {statusStatement === "loading" && (
                  <div
                    role="status"
                    tw="flex flex-col w-full h-full items-center justify-center"
                  >
                    <svg
                      tw="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {statusStatement === "success" && (
                  <tbody>
                    {/* <tr tw="text-left text-sm font-bold  border-b-4 border-double ">
                      <th tw="py-2">Balance Forward</th>

                      <td tw="text-right">0.00</td>
                    </tr> */}
                    <tr tw="text-left text-sm border-b border-dotted border-gray-200">
                      <th tw="py-2">Invoiced</th>

                      <td tw="text-right">
                        {dataStatement?.data?.data?.invoice &&
                          numberWithDot(dataStatement?.data?.data?.invoice)}
                      </td>
                    </tr>
                    <tr tw="text-left text-sm border-b border-dotted  border-gray-200">
                      <th tw="py-2">Paid</th>

                      <td tw="text-right">
                        {dataStatement?.data?.data?.paid &&
                          numberWithDot(dataStatement?.data?.data?.paid)}
                      </td>
                    </tr>
                    <tr tw="text-left text-sm border-b border-dotted  border-gray-200">
                      <th tw="py-2">Credit Balance</th>

                      <td tw="text-right">
                        {dataStatement?.data?.data?.credit &&
                          numberWithDot(dataStatement?.data?.data?.credit)}
                      </td>
                    </tr>
                  </tbody>
                )}
                <tfoot>
                  <tr className="double" tw="font-bold  ">
                    <th tw="text-left text-sm ">Account Balance</th>

                    <td tw="flex flex-col text-right text-sm">
                      <span>
                        {dataStatement?.data?.data &&
                          getTotalGlobal(
                            Object.values(dataStatement?.data?.data)?.map(
                              (item) => {
                                const splitAmount = item?.split(".");
                                return parseInt(splitAmount[0]);
                              }
                            )
                          )}
                      </span>
                      <span tw="text-gray-400">{filter.currency}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div tw="overflow-x-auto mt-10 ">
              <table>
                <thead>
                  <tr>
                    <th tw="text-left py-4 ">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr tw="text-left text-sm font-bold  border-b border-gray-200 ">
                    <th tw="py-2">Date</th>
                    <th>Description</th>
                    <th>Invoice #</th>
                    <th>Invoice Due</th>
                    <th>Amount</th>
                    <th>Paid</th>
                  </tr>
                  {statusStatement === "success" &&
                    dataStatement?.data?.details?.invoices?.length > 0 &&
                    dataStatement?.data?.details?.invoices?.map((item, i) => (
                      <tr tw="text-left text-sm border-b border-dotted border-gray-200">
                        <td tw="py-2">
                          {moment(new Date(item?.created_at)).format(
                            "MMM DD, YYYY"
                          )}
                        </td>
                        <td>{item?.notes}</td>
                        <td>{item?.code}</td>
                        <td>
                          {moment(new Date(item?.due_date)).format(
                            "MMM DD, YYYY"
                          )}
                        </td>
                        <td>{numberWithDot(item?.total)}</td>
                        <td>
                          {item?.paid_at &&
                            moment(new Date(item?.paid_at)).format(
                              "MMM DD, YYYY"
                            )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </CardReporting>
        </div>
        <Filter
          Filtering={FilterAccountStatement}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
}
export function getTotalData(outstanding) {
  const sum = outstanding.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return sum;
}
