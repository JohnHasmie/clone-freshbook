import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Popover,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState, useRef,useEffect,useContext } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import { bell, toggler } from "../../components/Icons";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction, { MoreActionCSV } from "../../components/Reports/MoreAction";
import SendEmail from "../../components/Reports/SendEmail";
import ButtonCustom from "../../components/Button/index";
import axios from "axios";
import { useQuery } from "react-query";
import moment from "moment";
import { getTotalGlobal, numberWithDot } from "../../components/Utils";
import AppContext from "../../components/context/AppContext";

export default function PaymentsCollected() {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    currency: "GBP",
  });
  const [form] = Form.useForm();
  const [newUser, setNewUser] = useState(JSON.parse(localStorage.getItem("newUser")) || {data:""});

  const { user } = useContext(AppContext);

  const myRef = useRef(null);
  const { data: dataPayment, status: statusPayment } = useQuery(
    ["payment-collection", filter],
    async (key) =>
      axios
        .get("reports/payment-collection", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );

  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  let history = useHistory();
  const onFinish = (values) => {
    // console.log(values,"values")
    setFilter({ ...filter, currency: values.currency });
    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterRevenueByClient = (
    <div tw="mt-3">
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <span tw="text-base text-primary" onClick={() => form.resetFields()}>
          Reset All
        </span>
      </div>
      <span tw="text-black ">AS OF</span>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        layout="vertical"
        size={"large"}
        tw="mt-5"
        fields={[
          {
            name: ["currency"],
            value: filter?.currency,
          },
        ]}
      >
        <Row gutter={24}>
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
            <Button
              onClick={() => form.submit()}
              tw="text-lg text-white bg-success px-8"
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
    
  );
  useEffect(() => {
    user &&
      localStorage.setItem("newUser",JSON.stringify(user))
  }, [user]);
  const headers = [
    { label: "Date", key: "date" },
    { label: "Client Name", key: "clientName" },
    { label: "Method", key: "method" },
    { label: "Description", key: "description" },
    { label: "Payment For", key: "paymentFor" },
    { label: "Number", key: "number" },

    { label: "Amount", key: "amount" },

    { label: "Currency", key: "currency" },


  ];

  const data =statusPayment === "success" && dataPayment?.data?.data?.map((item,i)=>(
    { date: moment(item.payment_at).format("MM/DD/YYYY"), clientName: item.client.first_name +" " +item.client.last_name, method: item.payment, 
    description:"",paymentFor:"Invoice",number:item.invoice.code,
    amount: item.amount !== null &&
    numberWithDot(
      Math.round(item.amount * 100) / 100
    ),currency: filter?.currency })
  )
  
  ;
  const csvReport = {
    data: data,
    headers: headers,
    filename: 'payments_collected.csv'
  };
  const { isFetching: excelIsFetching, refetch: excelRefetch } = useQuery(
    ["export-csv",{...filter,export:true}],
    async (key) =>
      axios
        .get(`reports/payment-collection`, {
          params: key.queryKey[1],
          responseType: "blob",
        })
        .then((res) => {
          const href = URL.createObjectURL(res.data);

          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", "payment.csv");
          document.body.appendChild(link);
          link.click();
    
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        })
        ,
    {
      enabled: false,
    }
  )
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
          <span tw="capitalize text-4xl font-bold text-black">
            Payments Collected
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
        {statusPayment === "success" && <Popover
            placement="bottom"
            content={<MoreAction myRef={myRef}  excelRefetch={excelRefetch} />}
            // content={<MoreActionCSV myRef={myRef}  csvReport={{...csvReport}} />}

            trigger="click"
          >
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>}
          <Popover
            placement="bottom"
            content={<SendEmail hide={hide} />}
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

        <CardReporting >
          <h1 tw="text-blueDefault">Payments Collected</h1>
          <div tw="my-3 flex flex-col">
            <span tw="text-sm text-gray-600">        {user?.data?.company_name || newUser?.data?.company_name}</span>
            <span tw="text-sm text-gray-600">Total Billed </span>
            <span tw="text-sm text-gray-600"> As of {moment(new Date()).format("MMMM DD, YYYY")}</span>
          </div>
          {statusPayment === "loading" && (
            <div
              role="status"
              tw="flex flex-col w-full h-full items-center justify-center"
            >
              <svg
                tw="inline mr-2 w-52 h-52 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          {statusPayment === "success" &&
          dataPayment?.data?.data?.length === 0 ? (
            <div tw="flex justify-center text-gray-600">
              No payments found. Please adjust the range.
            </div>
          ) : (
                  statusPayment == "success" && (
            <div tw="mb-5">
              <div tw="overflow-x-auto ">
                <table>
                    <thead>
                      <tr>
                        <th tw="text-left py-4 ">
                          <span tw="rounded-full border border-orange-500 p-1 py-1.5  mr-0.5 ">
                            {dataPayment?.data?.data[0]?.client.first_name[0] +
                              dataPayment?.data?.data[0]?.client.last_name[0]}
                          </span>{" "}
                          {dataPayment?.data?.data[0]?.client.company_name}
                        </th>
                      </tr>
                    </thead>
                  <tbody>
                    <tr tw="text-left text-sm font-bold  border-b-2 border-gray-200">
                      <th tw="pb-1  pt-5">Summary</th>
                    </tr>
                    <tr tw="text-left text-sm ">
                      <th tw="py-2">
                        <div tw="grid">
                          <span>
                            Total Payments Collected ({filter.currency})
                          </span>
                          <span tw="font-thin text-gray-400">
                            (*Payments applied from credit do not count towards
                            total)
                          </span>
                        </div>
                      </th>

                      <td tw="text-right ">
                        {
                          dataPayment?.data?.data?.length > 0 &&
                          getTotalGlobal(
                            dataPayment?.data?.data?.map((item) => {
                              const splitAmount = item?.amount?.split(".");
                              return parseInt(splitAmount[0]);
                            })
                          )
                          }
                        <span tw="font-thin text-gray-400 ml-1">
                          {filter.currency}
                        </span>{" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div tw="overflow-x-auto ">
                <table>
                  <tbody>
                    <tr tw="text-left text-sm  border-b-2 border-gray-200">
                      <th tw="pb-1 pt-5 font-bold">Payments</th>
                    </tr>
                    <tr tw="text-left text-sm border-b   border-gray-200">
                      <th tw="pb-1 pt-5">Date</th>
                      <th tw="pb-1 pt-5">Client</th>
                      <th tw="pb-1 pt-5">Method</th>
                      {/* <th tw="pb-1 pt-5">Description</th> */}
                      <th tw="pb-1 pt-5">Payment for</th>
                      <th tw="pb-1 pt-5 text-right">Amount</th>
                    </tr>
                    {dataPayment?.data?.data?.map((item, i) => (
                      <tr
                        key={i}
                        tw="text-left text-sm border-b border-dotted  border-gray-200"
                      >
                        <td tw="pb-1 pt-2">
                          {moment(item.payment_at).format("MM/DD/YYYY")}
                        </td>
                        <td tw="pb-1 pt-2 text-primary font-bold">
                          {item.client.first_name + item.client.last_name}
                        </td>
                        <td tw="pb-1 pt-2">{item.payment}</td>
                        {/* <td tw="pb-1 pt-2"></td> */}
                        <td tw="pb-1 pt-2">
                          <div tw="grid text-primary">
                            <span>{item.invoice.code}</span>
                          </div>
                        </td>
                        <td tw="pb-1 pt-2 text-right">
                          <div tw="grid ">
                            <span>{numberWithDot(item.amount)}</span>
                            <span tw="text-gray-400">{filter.currency}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
                  )

          )}
          {/* <div tw="overflow-x-auto ">
            <table 
            >
              <thead>
                <tr>
                  <th tw="text-left py-4 ">Primary Contact/ Organization</th>

                  <th tw="py-4 ">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr tw="text-right text-sm" style={{ display: "table-row" }}>
                  <th tw="pt-12 text-left ">
                    <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                      C
                    </span>
                    <span tw="text-primary">Company Name</span>
                  </th>
                  <td tw="py-5  text-primary">6,000.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="double">
                  <td tw=" text-left font-semibold">Total</td>

                  <td tw="pt-3  flex flex-col items-end ">
                    <span tw="font-semibold ">$6,000.00</span>
                    <span tw="text-gray-600 text-right">USD</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div> */}
        </CardReporting>
        </div>

        <Filter
          Filtering={FilterRevenueByClient}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
}
