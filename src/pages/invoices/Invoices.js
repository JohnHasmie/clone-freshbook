import {
  CopyOutlined,
  DollarOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Col,
  Divider,
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

export default function Invoices() {
  const { Title, Text } = Typography;
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState("sent");

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
    },
    {
      title: "Client/Invoice Number",
      dataIndex: "client_invoice_number",
      key: "client_invoice_number",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Issued Date/Due Date",
      key: "date",
      dataIndex: "date",
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
      client_invoice_number: (
        <div>
          <h3>Company Name</h3>
          <p>00148</p>
        </div>
      ),
      description: <span tw="flex items-start">PSD to HTML</span>,

      date: (
        <div>
          <h3>25/10/2022</h3>
          <p>Due in 4 days</p>
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
            <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
              <Tooltip placement="top" title="duplicate">
                <CopyOutlined tw="px-2 py-1" />
              </Tooltip>
            </div>

            {status === "paid" ? (
              <div tw="hover:bg-gray-100   border-r border-gray-200 ">
                <Tooltip placement="top" title="archive">
                  <HddOutlined tw="px-2 py-1 " />
                </Tooltip>
              </div>
            ) : (
              <div tw="hover:bg-gray-100   border-r border-gray-200 ">
                <Tooltip placement="top" title="add payment">
                  <DollarOutlined tw="px-2 py-1 " />
                </Tooltip>
              </div>
            )}
            <div tw="hover:bg-gray-100   ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs px-2 py-1" />
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
          <div tw="grid grid-cols-3 gap-4 justify-items-center content-center">
            <div>
              <div>
                <span tw="text-4xl font-bold text-blue-700">$0 </span>
                <span tw="text-sm font-bold text-blue-700 ">USD</span>
              </div>

              <p tw="text-secondary">overdue</p>
            </div>
            <div>
              <div>
                <span tw="text-4xl font-bold text-blue-700">$0 </span>
                <span tw="text-sm font-bold text-blue-700 ">USD</span>
              </div>
              <p>total outstanding</p>
            </div>
            <div>
              <div>
                <span tw="text-4xl font-bold text-blue-700">$0 </span>
                <span tw="text-sm font-bold text-blue-700 ">USD</span>
              </div>
              <p>in draft</p>
            </div>
          </div>
          <div tw="mt-20">
            <Title level={4}>Recently Active</Title>
            <div tw="flex">
              <div tw="border border-gray-200 hover:bg-blue-50 border-dashed flex w-44 rounded-md  mr-5 justify-center items-center">
                <div tw="flex flex-col">
                  <PlusOutlined tw="text-xl text-green-400" />
                  <span tw="text-base  font-bold">New Invoice</span>
                </div>
              </div>
              <Link to={`invoices/1/invoice-detail`}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <div tw="flex items-center ">
                <Title level={3}>All Invoices </Title>
                <PlusOutlined tw="ml-2 text-white bg-success text-xl  px-2 rounded-md font-bold pt-0.5 pb-0 cursor-pointer -mt-5 " />
              </div>
              <InputSearch prefix={<SearchOutlined />} />
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
