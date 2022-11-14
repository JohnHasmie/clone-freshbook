import { Avatar, Checkbox,  Table } from "antd";
import React, { useState } from "react";
import { Typography } from "antd";
import Search from "antd/lib/transfer/search";
import { SearchOutlined } from "@ant-design/icons";
import InputSearch from "../../components/InputSearch";




const { Title } = Typography;

export default function Service() {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Billable",
      dataIndex: "billable",
      key: "billable",
    },

    {
      title: "Always Add to Projects",
      key: "always",
      dataIndex: "always",
    },
    {
      title: "Rate/Taxes",
      key: "rate",
      dataIndex: "rate",
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
      // name: <span >General</span>,
      name: <span>General</span>,

      billable: <span>Yes</span>,

      always: <span>No</span>,
      rate: <span>$0.00</span>,
    },

    {
      key: "2",
      checkbox: (
        <Checkbox
          className="font-normal"
          checked={checked}
          onChange={(e) => console.log(e.target.value)}
        />
      ),
      name: <span>Meetings</span>,
      billable: <span>Yes</span>,

      always: <span>No</span>,
      rate: <span>$0.00</span>,
    },
    {
      key: "3",
      checkbox: (
        <Checkbox
          className="font-normal"
          checked={checked}
          onChange={(e) => console.log(e.target.value)}
        />
      ),
      name: <span>Research</span>,
      billable: <span>Yes</span>,

      always: <span>No</span>,
      rate: <span>$0.00</span>,
    },
  ];
  const onSearch = (value) => console.log(value);
  return (
    <>
      <div style={{ width: "98%", marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <Title level={5}>Services</Title>
         <InputSearch
             prefix={<SearchOutlined />}
         />
       
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
    </>
  );
}
