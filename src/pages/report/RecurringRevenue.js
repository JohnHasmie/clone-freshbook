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

export default function RecurringRevenue() {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);

  let history = useHistory();
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterRecurringRevenue = (
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
                defaultValue="last"
                options={[
                  {
                    value: "last",
                    label: "Last 12 Month",
                  },
                  {
                    value: "next",
                    label: "Next 12 Month",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Clients" name="clients">
              <Select
                defaultValue="andre"
                options={[
                  {
                    value: "andre",
                    label: "Andre Pauline",
                  },
                  {
                    value: "company",
                    label: "Company Name",
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
      <div
        onClick={() => history.goBack()}
        tw="flex items-center w-10 mt-5 text-primary cursor-pointer"
      >
        <LeftOutlined />
        <span tw="ml-1">Reports</span>
      </div>
      <div tw="flex justify-between items-center my-2">
        <Title level={2}>Recurring Revenue Annual</Title>
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
          <h1 tw="text-blueDefault">Recurring Revenue Annual</h1>
          <div tw="my-3 flex flex-col">
            <span tw="text-sm text-gray-600">Oasis Land</span>
            <span tw="text-sm text-gray-600">
              Recurring Revenue Annual - Billed (USD)
            </span>
            <span tw="text-sm text-gray-600">
              For Dec 1, 2021 - Nov 30, 2022
            </span>
          </div>
          <div tw="overflow-x-auto ">
            <table style={{ minWidth: "1000px" }}>
              <thead>
                <tr>
                  <th tw="text-left py-4 ">All Client</th>
                </tr>
              </thead>
              <tbody tw="overflow-scroll">
                <tr tw="text-left text-xs font-bold  border-b border-gray-200">
                  <th tw="py-1">Revenue Stream</th>
                  <td>Jan</td>
                  <td>Feb</td>
                  <td>Mar</td>
                  <td>Apr</td>
                  <td>May</td>
                  <td>Jun</td>
                  <td>Jul</td>
                  <td>Aug</td>
                  <td>Sept</td>
                  <td>Oct</td>
                  <td>Dec</td>
                  <td>Nov</td>
                </tr>
                <tr tw="text-left text-xs border-b border-dotted border-gray-200">
                  <th tw="py-1">Recurring</th>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$6,000.00 </td>
                  <td>$6,000.00 </td>
                  <td>$6,000.00 </td>
                </tr>
                <tr tw="text-left text-xs border-b border-dotted  border-gray-200">
                  <th tw="py-1">Non-Recurring Invoices</th>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00 </td>
                  <td>$0.00 </td>
                  <td>$0.00 </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="double" tw="font-bold">
                  <th tw="text-left text-xs">Total</th>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00 </td>
                  <td tw="text-left text-xs">$0.00 </td>
                  <td tw="text-left text-xs">$0.00 </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div tw="overflow-x-auto mt-10 ">
            <table style={{ minWidth: "1000px" }}>
              <thead>
                <tr>
                  <th tw="text-left py-4 ">
                    <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                      C
                    </span>
                    Company Name
                  </th>
                </tr>
              </thead>
              <tbody tw="overflow-scroll">
                <tr tw="text-left text-xs font-bold  border-b border-gray-200">
                  <th tw="py-1">Revenue Stream</th>
                  <td>Jan</td>
                  <td>Feb</td>
                  <td>Mar</td>
                  <td>Apr</td>
                  <td>May</td>
                  <td>Jun</td>
                  <td>Jul</td>
                  <td>Aug</td>
                  <td>Sept</td>
                  <td>Oct</td>
                  <td>Dec</td>
                  <td>Nov</td>
                </tr>
                <tr tw="text-left text-xs border-b border-dotted border-gray-200">
                  <th tw="py-1">Recurring</th>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$6,000.00 </td>
                  <td>$6,000.00 </td>
                  <td>$6,000.00 </td>
                </tr>
                <tr tw="text-left text-xs border-b border-dotted  border-gray-200">
                  <th tw="py-1">Non-Recurring Invoices</th>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00</td>
                  <td>$0.00 </td>
                  <td>$0.00 </td>
                  <td>$0.00 </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="double" tw="font-bold">
                  <th tw="text-left text-xs">Total</th>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00</td>
                  <td tw="text-left text-xs">$0.00 </td>
                  <td tw="text-left text-xs">$0.00 </td>
                  <td tw="text-left text-xs">$0.00 </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardReporting>
        <Filter Filtering={FilterRecurringRevenue} setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}
