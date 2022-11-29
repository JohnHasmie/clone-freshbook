import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Popover,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction from "../../components/Reports/MoreAction";
import SendEmail from "../../components/Reports/SendEmail";

export default function AccountBalance() {
  const [open, setOpen] = useState(false);

  const { Title } = Typography;
  let history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterAccountBalance = (
    <div>
      <div tw="flex justify-between mb-5">
        <span tw="text-2xl font-bold">Filters</span>
        {/* <div tw="grid">
            <span tw="text-xs text-primary uppercase">Balance date</span>
        </div> */}
        <span tw="text-xs text-primary">Reset All</span>
      </div>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="BALANCE DATE" name="time">
              <Select
                defaultValue="today"
                options={[
                  {
                    value: "today",
                    label: "Today",
                  },
                  {
                    value: "end_last_month",
                    label: "End of Last Month",
                  },
                  {
                    value: "end_last_quarter",
                    label: "End of Last Quarter",
                  },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="date">
              <Input type="text" placeholder="29/11/2022" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="date">
              <Checkbox>Compare Dates</Checkbox>
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
      <div
        onClick={() => history.goBack()}
        tw="flex w-10 items-center mt-5 text-primary cursor-pointer"
      >
        <LeftOutlined />
        <span tw="ml-1">Reports</span>
      </div>
      <div tw="flex justify-between items-center my-2">
        <Title level={2}>Balance Sheet</Title>

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
      <div tw="grid grid-cols-12 gap-5">
        <CardReporting tw="col-span-9 mb-10">
          <h1 tw="text-blueDefault">Account Statement</h1>
          <div tw="grid">
            <span tw="text-xs">SJ Marketing</span>
            <span tw="text-xs">As of Nov 29, 2022</span>
          </div>

          <div tw="overflow-x-auto pl-10 ">
            <table>
              <thead>
                <tr>
                  <th tw="text-left py-2 ">Summary</th>
                  <th tw="text-right py-2 "> 29/11/2022</th>
                </tr>
              </thead>
              <tbody>
                <tr tw="text-left text-sm border-b  border-gray-200">
                  <th tw="py-2 font-bold">Cash & Bank</th>
                </tr>

                <tr tw="text-left text-sm border-b   border-gray-200">
                  <th>Cash</th>

                  <td tw="text-right"> Rp106,000.00 </td>
                </tr>
                <tr tw="text-left text-sm border-b   border-gray-200">
                  <th tw="font-bold">Total Cash & Bank</th>

                  <td tw="text-right grid">
                    {" "}
                    <span tw="font-bold">Rp106,000.00</span>
                    <span tw="font-light text-xs">IDR</span>
                  </td>
                </tr>

                <tr tw="text-left text-sm border-b  border-gray-200">
                  <th tw="pt-10 pb-2 font-bold">Current Asset</th>
                </tr>

                <tr tw="text-left text-sm border-b   border-gray-200">
                  <th>Account Receivable</th>

                  <td tw="text-right"> Rp106,000.00 </td>
                </tr>
                <tr tw="text-left text-sm border-b   border-gray-200">
                  <th tw="font-bold">Total Current Asset</th>

                  <td tw="text-right grid">
                    {" "}
                    <span tw="font-bold">Rp106,000.00</span>
                    <span tw="font-light text-xs">IDR</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="double">
                  <th tw="text-left text-sm pt-3 ">Total Assets</th>

                  <td tw="text-right grid pt-3">
                    {" "}
                    <span tw="font-bold">Rp106,000.00</span>
                    <span tw="font-light text-xs">IDR</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div tw="overflow-x-auto pl-10 mt-10 ">
            <table>
              <thead>
                <tr>
                  <th tw="text-left py-2 ">Liabilities + Equity</th>
                  <th tw="text-right py-2 "> 29/11/2022</th>
                </tr>
              </thead>
              <tbody>
                <tr tw="text-left text-sm border-b  border-gray-200">
                  <th tw="py-2 font-bold">Equity</th>
                </tr>

                <tr tw="text-left text-sm border-b   border-gray-200">
                  <th>Net Income</th>

                  <td tw="text-right"> Rp106,000.00 </td>
                </tr>
                <tr tw="text-left text-sm border-b   border-gray-200">
                  <th tw="font-bold">Total Equity</th>

                  <td tw="text-right grid">
                    {" "}
                    <span tw="font-bold">Rp106,000.00</span>
                    <span tw="font-light text-xs">IDR</span>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="double">
                  <th tw="text-left text-sm pt-3 ">
                    Total Liabilities + Equity
                  </th>

                  <td tw="text-right grid pt-3">
                    {" "}
                    <span tw="font-bold">Rp106,000.00</span>
                    <span tw="font-light text-xs">IDR</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardReporting>
        <Filter
          Filtering={FilterAccountBalance}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
}
