import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Popover, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction from "../../components/Reports/MoreAction";
import SendEmail from "../../components/Reports/SendEmail";
import { bell, toggler } from '../../components/Icons';
import ButtonCustom from '../../components/Button/index';

export default function AccountStatement() {
  const [open, setOpen] = useState(false);

  const { Title } = Typography;
  let history = useHistory();
  const [clicked, setClicked] = useState(false);
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterAccountStatement = (
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
            <Button tw="text-lg px-8" onClick={() => setOpen(false)}>Close</Button>
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
            <span tw="capitalize text-4xl font-bold">Account Statement</span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover placement="bottom" content={<MoreAction myRef={"print"}excelRefetch={"for download"}/>} trigger="click">
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
          <h1 tw="text-blueDefault">Account Statement</h1>
          <p>For Jan 1, 2022 - Dec 31, 2022</p>
          <div tw="flex justify-between items-end">
            <div>
              <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                C
              </span>
              <span> Company Name</span>
            </div>
            <div tw="my-3 flex flex-col text-right">
              <span tw="text-sm text-gray-600">Oasis Land</span>
              <span tw="text-sm text-gray-600">Wates Wetan 03/05</span>
              <span tw="text-sm text-gray-600">Wonogiri</span>
            </div>
          </div>
          <div tw="overflow-x-auto ">
            <table>
              <thead>
                <tr>
                  <th tw="text-left py-4 ">Summary</th>
                </tr>
              </thead>
              <tbody>
                <tr tw="text-left text-sm font-bold  border-b-4 border-double ">
                  <th tw="py-2">Balance Forward</th>

                  <td tw="text-right">0.00</td>
                </tr>
                <tr tw="text-left text-sm border-b border-dotted border-gray-200">
                  <th tw="py-2">Invoiced</th>

                  <td tw="text-right">0.00 </td>
                </tr>
                <tr tw="text-left text-sm border-b border-dotted  border-gray-200">
                  <th tw="py-2">Paid</th>

                  <td tw="text-right">0.00 </td>
                </tr>
                <tr tw="text-left text-sm border-b border-dotted  border-gray-200">
                  <th tw="py-2">Credit Balance</th>

                  <td tw="text-right">0.00 </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="double" tw="font-bold  ">
                  <th tw="text-left text-sm ">Account Balance</th>

                  <td tw="flex flex-col text-right text-sm">
                    <span>0.00</span>
                    <span tw="text-gray-400">USD</span>
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
                <tr tw="text-left text-sm border-b border-dotted border-gray-200">
                <td tw="py-2">Oct, 25 2022</td>
                  <td>Invoice</td>
                  <td>00148</td>
                  <td>Nov 24, 2022</td>
                  <td>6,000.00</td>
                  <td>-</td>
                </tr>
            
              </tbody>
           
            </table>
          </div>
        </CardReporting>
        <Filter Filtering={FilterAccountStatement} setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}
