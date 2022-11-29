import {
  CalendarOutlined,
  CaretDownOutlined,
  CopyOutlined,
  DollarOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  RestOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Row,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";
import CardClient from "../../components/CardClient";
import InputSearch from "../../components/InputSearch";
import Photo from "../../assets/images/mask-group.svg";
import CardInvoice from "../../components/CardInvoice/index";
import TableCustom from "../../components/Button copy";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import FormAdvanceSearch, {
  FormAdvanceSearchClient,
  FormAdvanceSearchInvoice,
} from "../clients/FormAdvanceSearch";
import InvoiceTabs from "./InvoicesTabs";

export default function Recurring() {
  const { Title, Text } = Typography;
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState("sent");
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: (
        <Checkbox
          className="font-normal"
          onChange={() => setChecked(!checked)}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width:"5%"
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Last Issued",
      dataIndex: "last_issued",
      key: "last_issued",
    },

    {
      title: "Frequency /Duration",
      key: "frequency_duration",
      dataIndex: "frequency_duration",
    },

    {
      title: "Amount / Status",
      key: "amount",
      dataIndex: "amount",
    },
  ];

  const data = [
    {
      key: "1",
      checkbox: (
        <Checkbox
          className="font-normal"
          checked={checked}
          onChange={(e) => console.log(e.target.value)}
        />
      ),
      client: <div>Sutton Rowland Inc</div>,
      last_issued: <span tw="text-primary text-xs">28/11/2022</span>,

      frequency_duration: (
        <div>
          <h3 tw="text-sm">Every month</h3>
          <p tw="text-primary text-xs">Infinite</p>
        </div>
      ),
      amount: (
        <div tw="text-right relative">
          <div
            className="isVisible"
            tw="absolute bottom-16 right-6 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
          >
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="edit">
                <EditOutlined tw="px-2 py-1  " />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100  ">
              <Tooltip placement="top" title="delete">
                <RestOutlined tw="px-2 py-1" />
              </Tooltip>
            </div>
          
          </div>
          <h3>$6,000.000 USD</h3>
          <span tw="bg-green-400 rounded p-1">{status}</span>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg">
          <div>
            <Title level={4}>Recently Active</Title>
            <div tw="flex">
              <div tw="border border-gray-200 hover:bg-blue-50 border-dashed flex w-44 rounded-md  mr-5 justify-center items-center">
                <div tw="flex flex-col">
                  <PlusOutlined tw="text-xl text-green-400" />
                  <span tw="text-base  font-bold">New Invoice</span>
                </div>
              </div>
              <Link to={`/invoices/1/invoice-detail`}>
                <CardInvoice
                  title="Default size card"
                  size="small"
                  tw="w-44"
                  actions={[<span tw="font-bold text-center">Sent</span>]}
                >
                  <span tw="text-xs text-gray-600 mb-2">00148</span>
                  <div tw="flex flex-col mb-10 ">
                    <span tw="font-bold text-gray-600">Company Name</span>
                    <span tw="text-xs text-gray-600">25/10/2022</span>
                  </div>
                  <Divider />
                  <span tw="flex justify-end text-sm text-right">$6,000</span>
                </CardInvoice>
              </Link>
            </div>
          </div>
          <div tw="mt-20">
            <InvoiceTabs />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <div tw="flex items-center ">
                <Title level={3}>All Recurring Templates </Title>
                <PlusOutlined tw="ml-2 text-white bg-success text-xl  px-2 rounded-md font-bold pt-0.5 pb-0 cursor-pointer -mt-5 " />
              </div>
              <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch prefix={<SearchOutlined />} />
                <div tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center px-2">
                  <CalendarOutlined />
                  <CaretDownOutlined tw="ml-1" />
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <TableCustom
                columns={columns}
                dataSource={data}
                pagination={true}
                className="ant-border-space"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
