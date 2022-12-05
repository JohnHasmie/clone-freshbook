import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import { bell, toggler } from "../../components/Icons";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction from "../../components/Reports/MoreAction";
import SendEmail from "../../components/Reports/SendEmail";
import ButtonCustom from "../../components/Button/index";

export default function PaymentsCollected() {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  let history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterRevenueByClient = (
    <div>
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <p tw="text-base text-primary">Reset All</p>
      </div>
      <span tw="text-black ">DATE RANGE</span>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="time">
              <Select
                defaultValue="this-month"
                options={[
                  {
                    value: "this-month",
                    label: "This Month",
                  },
                  {
                    value: "last-month",
                    label: "Last Month",
                  },
                  {
                    value: "this-calendar-year",
                    label: "This Calendar Year",
                  },
                  {
                    value: "this-quarter",
                    label: "This Quarter",
                  },
                  {
                    value: "last-quarter",
                    label: "Last Quarter",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Clients" name="clients">
              <Select
                placeholder="All Clients"
                mode="multiple"
                options={[
                  {
                    value: "andre",
                    label: "Andre",
                  },
                  {
                    value: "company-name",
                    label: "Company Name",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Payment Method" name="payment-method">
              <Select
                placeholder="All Method of Payment"
                mode="multiple"
                options={[
                  {
                    value: "2checkout",
                    label: "2 Checkout",
                  },
                  {
                    value: "ach",
                    label: "ACH",
                  },
                  {
                    value: "bank-transfer",
                    label: "Bank Transfer",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Payment for" name="payment-for">
              <Select
                defaultValue="all"
                options={[
                  {
                    value: "all",
                    label: "All Types",
                  },
                  {
                    value: "invoices",
                    label: "ACH",
                  },
                  {
                    value: "bank-transfer",
                    label: "Bank Transfer",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Currency" name="currency">
              <Select
                defaultValue="usd"
                options={[
                  {
                    value: "usd",
                    label: "USD - US dollar",
                  },
                  {
                    value: "idr",
                    label: "IDR - Rupiah",
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
            <Button tw="text-lg text-white bg-success px-8">Apply</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
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
          <span tw="capitalize text-4xl font-bold">Payments Collected</span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover placement="bottom" content={MoreAction} trigger="click">
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>
          <Popover placement="bottom" content={<SendEmail hide={hide}/>} trigger="click" visible={clicked}  onVisibleChange={handleClickChange}>
            <Button tw=" md:ml-2 bg-success text-white px-4  flex justify-center items-center ">
              <span tw="text-lg">Send...</span>
            </Button>
          </Popover>
        </div>
      </div>

      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5">
        <CardReporting tw="md:col-span-9 mb-10 mt-10 md:mt-2">
          <h1 tw="text-blueDefault">Payments Collected</h1>
          <div tw="my-3 flex flex-col">
            <span tw="text-sm text-gray-600">Oasis Land</span>
            <span tw="text-sm text-gray-600">Total Billed (USD)</span>
            <span tw="text-sm text-gray-600">As of November 17,2022</span>
          </div>
          {isEmpty ? (
            <div tw="flex justify-center text-gray-600">
              No payments found. Please adjust the range.
            </div>
          ) : (
            <>
              <div tw="overflow-x-auto ">
                <table>
                  <thead>
                    <tr>
                      <th tw="text-left py-4 ">
                        <span tw="rounded-full border border-orange-500 p-1 py-1.5  mr-0.5 ">
                          MR
                        </span>{" "}
                        Sutton Rowland Inc
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
                          <span>Total Payments Collected (IDR)</span>
                          <span tw="font-thin text-gray-400">
                            (*Payments applied from credit do not count towards
                            total)
                          </span>
                        </div>
                      </th>

                      <td tw="text-right ">
                        Rp60,000.00{" "}
                        <span tw="font-thin text-gray-400">IDR</span>{" "}
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
                      <th tw="pb-1 pt-5">Description</th>
                      <th tw="pb-1 pt-5">Payment for</th>
                      <th tw="pb-1 pt-5 text-right">Amount</th>
                    </tr>
                    <tr tw="text-left text-sm border-b border-dotted  border-gray-200">
                      <td tw="pb-1 pt-2">03/12/2022</td>
                      <td tw="pb-1 pt-2 text-primary font-bold">
                        Sutton Rowland Inc
                      </td>
                      <td tw="pb-1 pt-2">Transfer</td>
                      <td tw="pb-1 pt-2"></td>
                      <td tw="pb-1 pt-2">
                        <div tw="grid text-primary">
                          <span>Invoice</span>
                          <span>000007</span>
                        </div>
                      </td>
                      <td tw="pb-1 pt-2 text-right">
                        <div tw="grid ">
                          <span>Rp.30,000.00</span>
                          <span tw="text-gray-400">IDR</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
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
        <Filter
          Filtering={FilterRevenueByClient}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
}
