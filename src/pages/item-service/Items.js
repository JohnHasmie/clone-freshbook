import { Avatar, Checkbox, Table } from "antd";
import React, { useState } from "react";
import { Typography } from "antd";
import { Button } from "antd";
import Search from "antd/lib/transfer/search";
import InputSearch from "../../components/InputSearch";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Items() {
  const [checked, setChecked] = useState(false);
  console.log(checked, "check");
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
      title: "Current Stock",
      dataIndex: "current",
      key: "current",
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
      name: <span>Front End Development for Open Trolley</span>,
      current: <span>-</span>,

      rate: <span>$20,000,000.00</span>,
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
      name: <span>Front End Development for Open Trolley</span>,
      current: <span>-</span>,

      rate: <span>$20,000,000.00</span>,
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
      name: <span>Front End Development for Open Trolley</span>,
      current: <span>-</span>,

      rate: <span>$20,000,000.00</span>,
    },
  ];
  const onSearch = (value) => console.log(value);
  return (
    <>
      <div style={{ width: "98%", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between",marginBottom:'24px' }}>
          <Title level={3}>Items</Title>
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
