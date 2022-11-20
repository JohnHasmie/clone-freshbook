import { Checkbox, Table, Typography } from "antd";
import React from "react";
import tw from "twin.macro";

import { useHistory, useParams } from "react-router-dom";
import ClientInfo from "../../components/ClientsComponent/ClientInfo";
import ClientTabs from "../../components/ClientsComponent/ClientTabs";
import { PlusOutlined } from "@ant-design/icons";

export default function Detail() {
const {id}=useParams()

  const { Title } = Typography;

  const columns = [
    {
      title: (
        <Checkbox
          className="font-normal"
          /* onChange={() => setChecked(!checked)} */
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },

    {
      title: "Phone Number 1 /Phone Number 2",
      key: "phone",
      dataIndex: "phone",
      width: "20%",
    },
  ];

  const data = [
    {
      key: "1",
      checkbox: (
        <Checkbox
          className="font-normal"
          /* checked={checked} */
          onChange={(e) => console.log(e.target.value)}
        />
      ),
      name: <span>John Doe</span>,
      email: <span>johndoe@gmail.com</span>,

      phone: (
        <div>
          <span>0888</span>
          <p tw="text-gray-400 text-sm">0999</p>
        </div>
      ),
    },
  ];
  console.log(id,"id")
  return (
    <>
      <div className="layout-content">
        <ClientInfo />
        <div tw="max-w-screen-xl mr-5 mb-10 mt-20">
          <ClientTabs />
          <div tw="flex items-center ">
            <Title level={3}>Contacts for Company Name </Title>
            <PlusOutlined tw='ml-2 text-white bg-success text-xl  px-2 rounded-md font-bold pt-0.5 pb-0 cursor-pointer -mt-5 '/>
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
    </>
  );
}
