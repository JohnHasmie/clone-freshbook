import {
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Card, Checkbox, Col, Row, Table, Tabs, Typography } from "antd";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";
import CardClient from "../../components/CardClient";
import InputSearch from "../../components/InputSearch";
import Photo from "../../assets/images/mask-group.svg";


export default function Clients() {
  const { Title, Text } = Typography;
  const [checked, setChecked] = useState(false);
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
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      width: "30%",
    },
    {
      title: "Internal Note",
      dataIndex: "internal",
      key: "internal",
      width: "30%",
    },

    {
      title: "Credit",
      key: "credit",
      dataIndex: "credit",
    },

    {
      title: "Total Outstanding",
      key: "outstanding",
      dataIndex: "outstanding",
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
      organization: (
        <div>
          <h3>Company Name</h3>
          <p>First Client</p>
        </div>
      ),
      internal: <span></span>,

      credit: <span></span>,
      outstanding: <span tw="font-bold">$20,000,000.00</span>,
    },

    {
      key: "1",
      checkbox: (
        <Checkbox
          className="font-normal"
          checked={checked}
          onChange={(e) => console.log(e.target.value)}
        />
      ),
      organization: (
        <div>
          <h3>Open Trolley</h3>
          <p>Mazmur Andreas</p>
        </div>
      ),
      internal: <span></span>,

      credit: <span></span>,
      outstanding: <span tw="font-bold">$20,000,000.00</span>,
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
              <div tw="border border-dashed flex w-72 rounded-md  mr-5 justify-center items-center">
              <div tw="flex flex-col">
                <PlusOutlined tw="text-3xl text-green-400" />
                  <span tw="text-lg text-2xl font-bold">New Client</span>
              </div>
              </div>
              <CardClient
                title="Default size card"
                size="small"
                style={{
                  width: 300,
                }}
              >
                <div tw="flex justify-around">
                  <img src={Photo} tw="w-14 h-14"/>
                  <div tw="grid">
                    <h3 tw="font-bold text-lg">Card content</h3>
                    <p tw="text-sm">Company Name</p>
                  </div>
                </div>
                <div>
                  <MailOutlined tw="mr-1" />
                  <span>kywu@mailinator.com</span>
                </div>
                <div>
                  <PhoneOutlined tw="mr-1" />
                  <span>+6289669235897</span>
                </div>
              </CardClient>
              
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
              <Title level={5}>All Clients</Title>
              <InputSearch prefix={<SearchOutlined />} />
            </div>
            <div className="table-responsive">
              <Table
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


