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
import ButtonCustom from "../../components/Button/index";
import { bell, toggler } from "../../components/Icons";

export default function AccountTrialBalance() {
  const [open, setOpen] = useState(false);

  const { Title } = Typography;
  let history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterAccountTrialBalance = (
    <div>
      <div tw="flex justify-between mb-5">
        <span tw="text-2xl font-bold">Filters</span>

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
            <Form.Item label="DATE RANGE" name="time">
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
          <span tw="capitalize text-4xl font-bold">Trial Balance</span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover placement="bottom" content={MoreAction} trigger="click">
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>
          <Popover placement="bottom" content={SendEmail} trigger="click">
            <Button tw=" md:ml-2 bg-success text-white px-4  flex justify-center items-center ">
              <span tw="text-lg">Send...</span>
            </Button>
          </Popover>
        </div>
      </div>

      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5">
        <CardReporting tw="md:col-span-9 mb-10 mt-10 md:mt-2">
          <h1 tw="text-blueDefault">Trial Balance</h1>
          <div tw="grid">
            <span tw="text-xs">SJ Marketing</span>
            <span tw="text-xs">As of Nov 29, 2022</span>
          </div>

          <div tw="overflow-x-auto mt-10">
            <table>
              <thead>
                <tr>
                  <th tw="text-left py-4 ">Summary of Accounts</th>
                </tr>
              </thead>
              <tbody>
                <tr tw="text-left text-xs border-b  border-gray-200">
                  <th tw="py-1 font-bold">Sub Account / Parent Account</th>
                  <th tw="py-1 font-bold"> Type / Sub Type</th>
                  <th tw="py-1 font-bold">Number</th>
                  <th tw="py-1 font-bold"> Debit</th>
                  <th tw="py-1 font-bold text-right"> Credit</th>
                </tr>

                <tr tw="text-left text-xs border-b border-dotted   border-gray-200">
                  <td>
                    <div tw="grid">
                      <span tw="text-primary">Petty Cash</span>
                      <span>Cash</span>
                    </div>
                  </td>
                  <td>
                    <div tw="grid">
                      <span tw="font-bold">Asset</span>
                      <span>Cash & Bank</span>
                    </div>
                  </td>
                  <td>1000-1</td>
                  <td>Rp106,000.00</td>
                  <td tw="text-right">Rp0.00</td>
                </tr>

                <tr tw="text-left text-xs border-b border-dotted   border-gray-200">
                  <td>
                    <div tw="grid">
                      <span tw="text-primary">Accounts Receivable</span>
                      <span>Accounts Receivable</span>
                    </div>
                  </td>
                  <td>
                    <div tw="grid">
                      <span tw="font-bold">Asset</span>
                      <span>Current Asset</span>
                    </div>
                  </td>
                  <td>1000-1</td>
                  <td>Rp106,000.00</td>
                  <td tw="text-right">Rp0.00</td>
                </tr>
                <tr tw="text-left text-xs border-b border-dotted   border-gray-200">
                  <td>
                    <div tw="grid">
                      <span tw="text-primary">Discounts</span>
                      <span>Revenue</span>
                    </div>
                  </td>
                  <td>
                    <div tw="grid">
                      <span tw="font-bold">Income</span>
                      <span>Income</span>
                    </div>
                  </td>
                  <td>1000-1</td>
                  <td>Rp106,000.00</td>
                  <td tw="text-right">Rp0.00</td>
                </tr>
                <tr tw="text-left text-xs border-b border-dotted   border-gray-200">
                  <td>
                    <div tw="grid">
                      <span tw="text-primary">Sales</span>
                      <span>Revenue</span>
                    </div>
                  </td>
                  <td>
                    <div tw="grid">
                      <span tw="font-bold">Income</span>
                      <span>Income</span>
                    </div>
                  </td>
                  <td>1000-1</td>
                  <td>Rp106,000.00</td>
                  <td tw="text-right">Rp0.00</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="double">
                  <th tw="text-left text-xs text-primary pt-3 ">
                    Total Assets
                  </th>
                  <td tw="invisible">hide</td>
                  <td tw="invisible">hide</td>
                  <td tw="text-left pt-3">
                    <div tw="grid">
                      <span tw="font-bold">Rp106,000.00</span>
                      <span tw="font-light text-xs">IDR</span>
                    </div>
                  </td>
                  <td tw="text-right pt-3">
                    <div tw="grid">
                      <span tw="font-bold">Rp106,000.00</span>
                      <span tw="font-light text-xs">IDR</span>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardReporting>
        <Filter
          Filtering={FilterAccountTrialBalance}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
}
