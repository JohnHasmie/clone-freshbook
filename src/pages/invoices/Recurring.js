import {
  CalendarOutlined,
  CaretDownOutlined,
  EditOutlined,
  PlusOutlined,
  RestOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Checkbox, Divider, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CardInvoice from "../../components/CardInvoice/index";
import TableCustom from "../../components/Button copy";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import InvoiceTabs from "./InvoicesTabs";
import tw from "twin.macro";

export default function Recurring() {
  const { Title } = Typography;
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState("sent");
  const history = useHistory();

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
      width: "5%",
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
          <div tw="hidden md:block">
            <Title level={4}>Recently Active</Title>
            <div tw="flex">
              <div
                onClick={() => history.push("invoices/new")}
                tw="cursor-pointer border border-gray-200 hover:bg-blue-50 border-dashed flex w-44 rounded-md  mr-5 justify-center items-center"
              >
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
          <div tw="md:mt-20">
            <InvoiceTabs />
            <div tw="grid md:flex justify-between mb-6">
              <div tw="flex items-center ">
                <Title level={3}>All Recurring Templates </Title>
                <PlusOutlined tw="ml-2 text-white bg-success text-xl  px-2 rounded-md font-bold pt-0.5 pb-0 cursor-pointer -mt-5 " />
              </div>
              <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch prefix={<SearchOutlined />} />
                <label
                  htmlFor="date"
                  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center px-2 cursor-pointer"
                >
                  <input
                    type="date"
                    htmlFor="date"
                    name="date"
                    id="date"
                    tw="absolute"
                  />
                  <CalendarOutlined />
                  <CaretDownOutlined tw="ml-1" />
                </label>
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
