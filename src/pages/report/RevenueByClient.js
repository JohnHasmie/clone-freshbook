import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  LeftOutlined,
} from "@ant-design/icons";
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
import SendEmail from "../../components/Reports/SendEmail";

const dummyList = [
  { name: "Company Name", total: 6000 },
  { name: "Abc Company", total: 50000 },
];

export default function RevenueByClient() {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const [sortState, setSortState] = useState("none");

  const sortMethods = {
    none: { method: (a, b) => null },
    true: { method: (a, b) => (a.name > b.name ? 1 : -1) },
    false: { method: (a, b) => (a.name > b.name ? -1 : 1) },
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
                defaultValue="this-year"
                options={[
                  {
                    value: "this-month",
                    label: "This Month",
                  },
                  {
                    value: "this-year",
                    label: "This Year",
                  },
                  {
                    value: "last-year",
                    label: "Last Year",
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
                defaultValue="All Clients"
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
            <Form.Item label="type" name="type">
              <Select
                defaultValue="billed"
                options={[
                  {
                    value: "billed",
                    label: "Total Billed",
                  },
                  {
                    value: "collecte",
                    label: "Total Collected",
                  },
                  {
                    value: "outstanding",
                    label: "Total Outstanding",
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
  console.log(sortState, "Sortt");
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
        <Title level={2}>Revenue by Client</Title>
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
          <h1 tw="text-blueDefault">Revenue by Client</h1>
          <div tw="my-3 flex flex-col">
            <span tw="text-sm text-gray-600">Oasis Land</span>
            <span tw="text-sm text-gray-600">Total Billed (USD)</span>
            <span tw="text-sm text-gray-600">As of November 17,2022</span>
          </div>
          <div tw="overflow-x-auto ">
            <table>
              <thead>
                <tr>
                  <th
                    tw="text-left py-4 cursor-pointer"
                    onClick={() => setSortState(!sortState)}
                  >
                    Primary Contact/ Organization{" "}
                    {sortState ? <CaretUpOutlined /> : <CaretDownOutlined />}
                  </th>

                  <th tw="py-4 ">Total</th>
                </tr>
              </thead>
              <tbody>
                {dummyList.sort(sortMethods[sortState].method).map((item,i) => (
                  <tr key={i} tw="text-right text-sm" style={{ display: "table-row" }}>
                    <th tw="pt-5 text-left ">
                      <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                        C
                      </span>
                      <span tw="text-primary">{item.name}</span>
                    </th>
                    <td tw="py-2  text-primary">{item.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot tw='mt-2'>
                <tr className="double">
                  <td tw=" text-left font-semibold">Total</td>

                  <td tw="pt-3  flex flex-col items-end ">
                    <span tw="font-semibold ">$6,000.00</span>
                    <span tw="text-gray-600 text-right">USD</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
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
