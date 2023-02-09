import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  notification,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction, { MoreActionCSV } from "../../components/Reports/MoreAction";
import SendEmail, { SendEmailDefaultWithCsv } from "../../components/Reports/SendEmail";
import { bell, toggler } from "../../components/Icons";
import ButtonCustom from "../../components/Button/index";
import AppContext from "../../components/context/AppContext";
import moment from "moment";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import {
  getTotalGlobal,
  numberWithDot,
  truncate,
} from "../../components/Utils";

const dateFormat = "DD/MM/YYYY";

export default function AccountAging() {
  const [open, setOpen] = useState(false);
  const { Title } = Typography;
  const [filterOutstanding, setFilterOutstanding] = useState({
    currency: "USD",
    group_by: "outstanding",
    as_of: new Date(),
  });
  const [clicked, setClicked] = useState(false);
  const [newUser, setNewUser] = useState(
    JSON.parse(localStorage.getItem("newUser")) || { data: "" }
  );
  const [headers, setHeaders] = useState([
    { label: "Client", key: "client" },
    { label: "0-30 Days", key: "0_30" },
    { label: "31-60 Days", key: "31_60" },
    { label: "61-90 Days", key: "61_90" },
    { label: "91+ Days", key: "91" },
    { label: "Total", key: "total" },
  ]);
  const[ data,setData] =useState(
    [
   
  
    ])
  const myRef = useRef();
  const { user } = useContext(AppContext);

  const { data: dataAccount, status: statusAccount } = useQuery(
    ["account-aging-listing", filterOutstanding],
    async (key) =>
      axios
        .get("reports/account-aging", {
          params: key.queryKey[1],
        })
        .then((res) => res.data?.data)
  );

  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  let history = useHistory();
  const onFinish = (values) => {
    setFilterOutstanding({
      as_of: values.as_of._d,
      currency: values.currency,
      group_by: values.group_by,
    });
    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterAccountAging = (
    <div tw="mt-3">
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <p
          tw="text-base text-primary cursor-pointer"
          onClick={() =>
            setFilterOutstanding({
              ...filterOutstanding,
              group_by: "outstanding",
            })
          }
        >
          Reset All
        </p>
      </div>
      <span tw="text-black ">AS OF</span>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
        fields={[
          {
            name: ["as_of"],
            value: filterOutstanding.as_of
              ? moment(new Date(filterOutstanding.as_of), dateFormat)
              : "",
          },
          {
            name: ["group_by"],
            value: filterOutstanding?.group_by,
          },
          {
            name: ["currency"],
            value: filterOutstanding?.currency,
          },
        ]}
      >
        <Row gutter={24}>
          {/* <Col span={24}>
            <Form.Item name="time">
              <Select
                options={[
                  {
                    value: "today",
                    label: "Today",
                  },
                  {
                    value: "last-month",
                    label: "End of Last Month",
                  },
                  {
                    value: "last-quarter",
                    label: "End of Last Quarter",
                  },
                  {
                    value: "last-year",
                    label: "End of Last Year",
                  },
                ]}
              />
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <Form.Item name="as_of">
              <DatePicker tw="w-full rounded-md" format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Group By" name="group_by">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="outstanding">Outstanding</Radio>
                  <Radio value="overdue">Overdue</Radio>
                </Space>
              </Radio.Group>
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
  useEffect(() => {
    user && localStorage.setItem("newUser", JSON.stringify(user));
  }, [user]);
 
  let newDataItems =
    statusAccount === "success" &&
    dataAccount?.map((item) => ({
      client:item?.client?.company_name,
      "0_30": item?.account_aging["0_30"],
      "31_60": item?.account_aging["31_60"],
      "61_90": item?.account_aging["61_90"],
      90: item?.account_aging["90"],
      total: item?.account_aging["total"],
    }));
    let newDataTotal =
    statusAccount === "success" &&
    {
      client:`Total (${filterOutstanding.currency})`,
      "0_30": getTotalData(
        dataAccount?.map((item) => {
          const splitAmount =
            item?.account_aging["0_30"].split(".");
          return compareData(splitAmount[0]);
        })
      ),
      "31_60": getTotalData(
        dataAccount?.map((item) => {
          const splitAmount =
            item?.account_aging["31_60"].split(".");
          return compareData(splitAmount[0]);
        })
      ),
      "61_90": getTotalData(
        dataAccount?.map((item) => {
          const splitAmount =
            item?.account_aging["61_90"].split(".");
          return compareData(splitAmount[0]);
        })
      ),
      "90": getTotalData(
        dataAccount?.map((item) => {
          const splitAmount =
            item?.account_aging["90"].split(".");
          return compareData(splitAmount[0]);
        })
      ),
      total: getTotalData(
        dataAccount?.map((item) => {
          const splitAmount =
            item?.account_aging["total"].split(".");
          return compareData(splitAmount[0]);
        })
      )
    };


    useEffect(() => {
      if(statusAccount=== "success"){
        setData([...newDataItems,newDataTotal])
      }
    
    }, [statusAccount])
    const mutation = useMutation(
      async (data) => {
        return axios.post(`reports/account-aging/send`, data).then((res) => res.data);
      },
      {
        onSuccess: (res) => {
          notification.success({
            message: `Account Aging has been sent`,
            placement: "topLeft",
          });
          hide()
        },
        onError: (err) => {
          notification.error({
            message: `An Error Occurred Please Try Again Later`,
            placement: "topLeft",
          });
          hide()
  
          console.log(err.response.data.message);
        },
      }
    );
    const { data: dataClients, statusClients } = useQuery(
      ["clients"],
      async (key) =>
        axios
          .get("clients")
          .then((res) => res.data.data)
    );
  
  const csvReport = data.length > 0 && {
    data: data,
    headers: headers,
    filename: `accounts_aging.csv`,
  };

  console.log("newData", csvReport);
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
            Accounts Aging
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
        {statusAccount === "success" && data.length > 0 &&  <Popover
            placement="bottom"
            content={
              <MoreActionCSV myRef={myRef} csvReport={{ ...csvReport }} />
            }
            trigger="click"
          >
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>}
          <Popover
            placement="bottom"
            content={<SendEmailDefaultWithCsv  csv={{ ...csvReport }} hide={hide} dataClients={dataClients} user={newUser} mutation={mutation}/>}
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
            <h1 tw="text-blueDefault">Accounts Aging</h1>
            <div tw="my-3 flex flex-col">
              <span tw="text-sm text-gray-600">
                {user?.data?.company_name || newUser?.data?.company_name}
              </span>
              <span tw="text-sm text-gray-600 capitalize">
                Amounts {filterOutstanding?.group_by}
              </span>
              <span tw="text-sm text-gray-600">
                As of {moment(filterOutstanding.as_of).format("MMMM DD, YYYY")}
              </span>
            </div>
            {statusAccount === "loading" && (
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
            {statusAccount === "success" && (
              <div tw="overflow-x-scroll  md:w-full ">
                <table tw="overflow-x-scroll">
                  <thead>
                    <tr>
                      <th tw="text-left py-4 ">Client</th>
                      {/* {Object?.keys(dataAccount?.side_data)?.map((item, i) => (
                     <th key={i} tw="py-4 ">
                       {item}
                     </th>
                   ))} */}
                      <th tw="py-4">0-30 Days</th>
                      <th tw="py-4">31-60 Days</th>
                      <th tw="py-4">61-90 Days</th>
                      <th tw="py-4">90+ Days</th>

                      <th tw="py-4  ">Total</th>
                    </tr>
                  </thead>
                  {dataAccount?.length > 0 &&
                    dataAccount?.map((item, i) => (
                      <tbody key={i}>
                        <tr
                          tw="text-right text-sm"
                          style={{ display: "table-row" }}
                        >
                          <th tw="pt-12 text-left ">
                            <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                              {item?.client?.company_name[0]}
                            </span>
                            <span tw="text-primary">
                              {" "}
                              {item?.client?.company_name &&
                                truncate(item?.client?.company_name, 20)}
                            </span>
                          </th>
                          <td tw="py-5  text-primary">
                            {item?.account_aging["0_30"] &&
                              numberWithDot(item?.account_aging["0_30"])}
                          </td>

                          <td tw="py-5  text-primary">
                            {item?.account_aging["31-60"] &&
                              numberWithDot(item?.account_aging["31-60"])}
                          </td>
                          <td tw="py-5  text-primary">
                            {item?.account_aging["61-90"] &&
                              numberWithDot(item?.account_aging["61-90"])}
                          </td>
                          <td tw="py-5  text-primary">
                            {item?.account_aging["90"] &&
                              numberWithDot(item?.account_aging["90"])}
                          </td>

                          <td tw="py-5 ">
                            {item?.account_aging["total"] &&
                              numberWithDot(item?.account_aging["total"])}
                          </td>
                        </tr>
                      </tbody>
                    ))}

                  <tfoot>
                    <tr className="double">
                      <td tw=" text-left font-semibold">Total</td>

                      <td tw="py-5  text-primary">
                        {" "}
                        {filterOutstanding.currency === "USD" ? "$" : "£"}
                        {dataAccount?.length > 0 &&
                          getTotalGlobal(
                            dataAccount?.map((item) => {
                              const splitAmount =
                                item?.account_aging["0_30"].split(".");
                              return compareData(splitAmount[0]);
                            })
                          )}
                      </td>
                      <td tw="py-5  text-primary">
                        {" "}
                        {filterOutstanding.currency === "USD" ? "$" : "£"}
                        {dataAccount?.length > 0 &&
                          getTotalGlobal(
                            dataAccount?.map((item) => {
                              const splitAmount =
                                item?.account_aging["31_60"].split(".");
                              return compareData(splitAmount[0]);
                            })
                          )}
                      </td>
                      <td tw="py-5  text-primary">
                        {" "}
                        {filterOutstanding.currency === "USD" ? "$" : "£"}
                        {dataAccount?.length > 0 &&
                          getTotalGlobal(
                            dataAccount?.map((item) => {
                              const splitAmount =
                                item?.account_aging["61_90"].split(".");
                              return compareData(splitAmount[0]);
                            })
                          )}
                      </td>
                      <td tw="py-5  text-primary">
                        {" "}
                        {filterOutstanding.currency === "USD" ? "$" : "£"}
                        {dataAccount?.length > 0 &&
                          getTotalGlobal(
                            dataAccount?.map((item) => {
                              const splitAmount =
                                item?.account_aging["90"].split(".");
                              return compareData(splitAmount[0]);
                            })
                          )}
                      </td>

                      <td tw="pt-5  flex flex-col items-end ">
                        <span tw="font-semibold ">
                          {" "}
                          {filterOutstanding.currency === "USD" ? "$" : "£"}
                          {dataAccount?.length > 0 &&
                            getTotalGlobal(
                              dataAccount?.map((item) => {
                                const splitAmount =
                                  item?.account_aging["total"].split(".");
                                return compareData(splitAmount[0]);
                              })
                            )}
                        </span>
                        <span tw="text-gray-600 text-right">
                          {filterOutstanding.currency}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </CardReporting>
        </div>
        <Filter Filtering={FilterAccountAging} setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}

export function compareData(splitAmount) {
  let newData = "";
  if (splitAmount === "") {
    newData = 0;
  } else {
    newData = parseInt(splitAmount);
  }
  return newData;
}

export function getTotalData(outstanding) {
  const sum = outstanding.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return sum
}