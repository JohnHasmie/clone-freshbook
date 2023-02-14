import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  notification,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState, useRef, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction, { MoreActionCSV } from "../../components/Reports/MoreAction";
import SendEmail, {
  SendEmailDefault,
  SendEmailDefaultWithCsv,
} from "../../components/Reports/SendEmail";
import ButtonCustom from "../../components/Button/index";
import { bell, toggler } from "../../components/Icons";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import AppContext from "../../components/context/AppContext";
import { numberWithDot } from "../../components/Utils";
import moment from "moment";
const dateFormat = "DD/MM/YYYY";

export default function InvoiceDetail() {
  const { Title } = Typography;
  const [clicked, setClicked] = useState(false);
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const { user } = useContext(AppContext);
  const [newUser, setNewUser] = useState(
    JSON.parse(localStorage.getItem("newUser")) || { data: "" }
  );
  const { clientId } = useParams();

  const myRef = useRef();

  const hide = () => {
    setClicked(false);
  };
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    client_id: "",
    currency: "USD",
    start_date: moment().startOf("year").format("MM/DD/YYYY"),
    end_date: moment().endOf("year").format("MM/DD/YYYY"),
  });

  useEffect(() => {
    clientId && setFilter({ ...filter, client_id: clientId });
  }, [clientId]);

  let history = useHistory();
  const [open, setOpen] = useState(false);
  const { data: dataInvoices, status } = useQuery(
    ["invoices-listing", filter],
    async (key) =>
      axios
        .get("invoices", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  const { data: dataClients, statusClients } = useQuery(
    ["clients"],
    async (key) => axios.get("clients").then((res) => res.data.data)
  );

  const onFinish = (values) => {
    setFilter({
      start_at: values.start_date._d,
      finish_at: values.end_date._d,
      currency: values.currency,
      client_id: values.client_id,
      status: values.status,
      date_type: values.date_type,
    });
    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterInvoiceDetail = (
    <div>
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <p
          tw="text-base text-primary cursor-pointer"
          onClick={() =>
            setFilter({
              limit: 10,
              page: 1,
              client_id: "",
              currency: "USD",
              start_date: moment().startOf("year").format("MM/DD/YYYY"),
              end_date: moment().endOf("year").format("MM/DD/YYYY"),
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
            name: ["start_date"],
            value: filter.start_date
              ? moment(new Date(filter.start_date), dateFormat)
              : "",
          },
          {
            name: ["end_date"],
            value: filter.end_date
              ? moment(new Date(filter.end_date), dateFormat)
              : "",
          },
          {
            name: ["client_id"],
            value: filter?.client_id,
          },
          {
            name: ["status"],
            value: filter?.status,
          },
          {
            name: ["date_type"],
            value: filter?.date_type,
          },
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
                 },        {
                   value: "last-year",
                   label: "Last Year",
                 },
               
                ]}
              />
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <Form.Item name="start_date">
              <DatePicker tw="w-full rounded-md" format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="end_date">
              <DatePicker tw="w-full rounded-md" format={dateFormat} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="date_type">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="issued_at">Issue Date</Radio>
                  <Radio value="paid_at">Paid Date</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Clients" name="client_id">
              <Select
                options={dataClients?.data?.map((item) => ({
                  value: item?.id,
                  label: item?.company_name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Invoice Status" name="status">
              <Select
                options={[
                  {
                    value: "outstanding",
                    label: "Outstanding",
                  },
                  {
                    value: "paid",
                    label: "Paid",
                  },
                  {
                    value: "auto-paid",
                    label: "Auto Paid",
                  },
                  {
                    value: "partially-paid",
                    label: "Partially Paid",
                  },
                  {
                    value: "sent",
                    label: "Sent",
                  },
                  {
                    value: "viewed",
                    label: "Viewed",
                  },
                  {
                    value: "disputed",
                    label: "Disputed",
                  },
                  {
                    value: "draft",
                    label: "Draft",
                  },
                ]}
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

  const mutation = useMutation(
    async (data) => {
      return axios
        .post(`invoices/detail/${dataInvoices?.data[0]?.id}/send`, data)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        notification.success({
          message: `Invoice Detail has been sent`,
          placement: "topLeft",
        });
        hide();
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        hide();

        console.log(err.response.data.message);
      },
    }
  );
  useEffect(() => {
    if (user) {
      localStorage.setItem("newUser", JSON.stringify(user));
      setFilter({ ...filter, currency: user?.data?.base_currency });
    }
    if (newUser) {
      setFilter({ ...filter, currency: newUser?.data?.base_currency });
    }
  }, [user || newUser]);
  const csvReport = {
    data: [],
    headers: [],
    filename: `invoice_detail.csv`,
  };

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
            Invoice Detail
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover
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
          </Popover>
          <Popover
            placement="bottom"
            content={
              <SendEmailDefaultWithCsv
                csv={{ ...csvReport }}
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
            <h1 tw="text-blueDefault">Invoice Detail</h1>
            <div tw="my-3 flex flex-col">
              <span tw="text-sm text-gray-600">
                {user?.data?.company_name || newUser?.data?.company_name}
              </span>
              {status === "success" && (
                <span tw="text-sm text-gray-600">
                  Total Invoiced:{" "}
                  {getTotal(
                    dataInvoices?.data?.map((item) => {
                      const splitAmount = item?.total?.split(".");
                      return parseInt(splitAmount[0]);
                    })
                  )}{" "}
                  ({filter.currency})
                </span>
              )}
              <span tw="text-sm text-gray-600">
                For {moment(new Date(filter.start_date)).format("MMM DD, YYYY")}{" "}
                - {moment(new Date(filter.end_date)).format("MMM DD, YYYY")}
              </span>
            </div>
            <div tw="overflow-x-auto ">
              {status === "success" && (
                <table>
                  <thead className="theadCustom">
                    <tr>
                      <th tw="pt-12 text-left py-4 ">
                        <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                          {dataInvoices?.data[0]?.client?.company_name[0]}
                        </span>
                        <span tw="text-primary ml-1">
                          {" "}
                          {dataInvoices?.data[0]?.client?.company_name}
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr tw="border-b border-gray-300">
                      <th tw="pt-12 pb-2 text-left ">
                        <span>Summary</span>
                      </th>
                    </tr>
                    <tr tw="border-b border-dotted">
                      <th tw="text-left pl-3 py-2">Total Invoice</th>
                      <td tw="text-right">
                        {" "}
                        {getTotal(
                          dataInvoices?.data?.map((item) => {
                            const splitAmount = item?.total?.split(".");
                            return parseInt(splitAmount[0]);
                          })
                        )}{" "}
                      </td>
                    </tr>
                    <tr tw="border-b border-dotted">
                      <th tw="pl-3 text-left py-2">Amount Paid</th>
                      <td tw="text-right">0,00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="double">
                      <td tw=" text-left font-semibold">Amount Due</td>

                      <td tw="pt-3  flex flex-col items-end ">
                        <span tw="font-semibold ">0,00</span>
                        <span tw="text-gray-600 text-right uppercase">
                          {filter.currency}
                        </span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              )}

              {status === "success" &&
                dataInvoices?.data?.map((item, i) => (
                  <table tw="mt-10" key={i}>
                    <tbody>
                      <tr>
                        <th tw="text-left">Invoice #: {item.code}</th>
                      </tr>
                      <tr tw="border-b border-gray-300">
                        <th tw=" text-left ">
                          <span>
                            Issued:{" "}
                            {moment(new Date(item.issued_at)).format(
                              "MMM DD, YYYY"
                            )}
                          </span>
                        </th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>

                        <th tw=" text-right ">
                          <span>Status: {item.status}</span>
                        </th>
                      </tr>
                      <tr tw="border-b border-gray-300 text-right font-bold">
                        <th tw="text-left  py-2">Description</th>
                        <th>Rate</th>
                        <th>Quantity</th>
                        <th>Tax 1</th>
                        <th>Tax 2</th>
                        <th>Line Total</th>
                      </tr>
                      <tr tw="border-b  border-gray-300 text-right">
                        <th tw="pl-3 text-left py-2">Frontend Development</th>
                        <td>
                          {filter?.currency == "GBP" ? "£" : "$"} 6,000.00
                        </td>
                        <td>1</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>
                          {filter?.currency == "GBP" ? "£" : "$"} 6,000.00
                        </td>
                      </tr>
                      <tr tw="text-right">
                        <th></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td tw="py-2">Subtotal</td>
                        <td>6,000.00</td>
                      </tr>
                      <tr tw="border-b  border-gray-300 text-right">
                        <th></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td tw="py-2">Tax</td>
                        <td>0.00</td>
                      </tr>
                      <tr tw="text-right font-bold">
                        <th></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td tw="py-2">Invoice Total</td>
                        <td>6,000.00</td>
                      </tr>
                      <tr tw="text-right">
                        <th></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td tw="py-2">Amount Paid</td>
                        <td>0.00</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="double">
                        <th tw="invisible"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td tw=" text-right font-semibold">Amount Due</td>

                        <td tw="pt-3  flex flex-col items-end ">
                          <span tw="font-semibold ">
                            {filter?.currency == "GBP" ? "£" : "$"} 6,000.00
                          </span>
                          <span tw="text-gray-600 text-right">
                            {filter?.currency}
                          </span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                ))}
            </div>
          </CardReporting>
        </div>
        <Filter Filtering={FilterInvoiceDetail} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
export function getTotal(outstanding) {
  const sum = outstanding.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return numberWithDot(sum) + ".00";
}
