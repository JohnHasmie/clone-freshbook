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
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction from "../../components/Reports/MoreAction";
import SendEmail from '../../components/Reports/SendEmail';

export default function InvoiceDetail() {
  const { Title } = Typography;
  let history = useHistory();
  const [open, setOpen] = useState(false)

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterInvoiceDetail = (
    <div>
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <p tw="text-base text-primary">Reset All</p>
      </div>
      <span tw="text-black ">AS OF</span>
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
          </Col>
          <Col span={24}>
            <Form.Item  name="group">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="issue">Issue Date</Radio>
                  <Radio value="paid">Paid Date</Radio>
                </Space>
              </Radio.Group>
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
            <Form.Item label="Invoice Status" name="invoice-status">
              <Select
                defaultValue="All"
           
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
            <Button tw="text-lg px-8" onClick={()=>setOpen(false)}>Close</Button>
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
      <div
        onClick={() => history.goBack()}
        tw="flex w-10 items-center mt-5 text-primary cursor-pointer"
      >
        <LeftOutlined />
        <span tw="ml-1">Reports</span>
      </div>
      <div tw="flex justify-between items-center my-2">
        <Title level={2}>Invoice Detail</Title>
        <div tw="flex ">
          <Popover placement="bottom" content={MoreAction} trigger="click">
            <ButtonMore>
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>
          <Popover placement="bottom" content={SendEmail} trigger="click">
            <Button tw=" ml-2 bg-success text-white px-4 h-auto flex items-center ">
              <span tw="text-lg">Send...</span>
            </Button>
          </Popover>
        </div>
      </div>
      <div tw="grid grid-cols-12 gap-10">
        <CardReporting tw="col-span-9 mb-10">
          <h1 tw="text-blueDefault">Invoice Detail</h1>
          <div tw="my-3 flex flex-col">
            <span tw="text-sm text-gray-600">Oasis Land</span>
            <span tw="text-sm text-gray-600">Total Invoiced: 0.00 (USD)</span>
            <span tw="text-sm text-gray-600">
              For Jan 1, 2022 - Dec 31, 2022
            </span>
          </div>
          <div tw="overflow-x-auto ">
            <table>
              <thead className="theadCustom">
                <tr>
                  <th tw="pt-12 text-left py-4 ">
                    <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                      C
                    </span>
                    <span tw="text-primary ml-1">Company Name</span>
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
                  <td tw="text-right">6,00.000</td>
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
                    <span tw="font-semibold ">$6,000.00</span>
                    <span tw="text-gray-600 text-right">USD</span>
                  </td>
                </tr>
              </tfoot>
            </table>

            <table tw="mt-10">
              <tbody>
                <tr>
                  <th tw="text-left">Invoice #: 00148</th>
                </tr>
                <tr tw="border-b border-gray-300">
                  <th tw=" text-left ">
                    <span>Issued: Oct 25, 2022</span>
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>

                  <th tw=" text-right ">
                    <span>Status: Sent</span>
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
                  <td>$6,000.00</td>
                  <td>1</td>
                  <td>0.00</td>
                  <td>0.00</td>
                  <td>$6,000.00</td>
                </tr>
                <tr tw="text-right">
                  <th ></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td tw="py-2">Subtotal</td>
                  <td>6,000.00</td>
                </tr>
                <tr tw="border-b  border-gray-300 text-right">
                  <th ></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td tw="py-2">Tax</td>
                  <td>0.00</td>
                </tr>
                <tr tw="text-right font-bold">
                  <th ></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td tw="py-2">Invoice Total</td>
                  <td>6,000.00</td>
                </tr>
                <tr tw="text-right">
                  <th ></th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td tw="py-2">Amount Paid</td>
                  <td>0.00</td>
                </tr>
                
              </tbody>
              <tfoot>
                <tr className="double">
                <th tw='invisible'></th>
                  <td ></td>
                  <td ></td>
                  <td ></td>
                  <td tw=" text-right font-semibold">Amount Due</td>

                  <td tw="pt-3  flex flex-col items-end ">
                    <span tw="font-semibold ">$6,000.00</span>
                    <span tw="text-gray-600 text-right">USD</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardReporting>
        <Filter Filtering={FilterInvoiceDetail} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
