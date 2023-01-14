import { Checkbox, Table, Tooltip } from "antd";
import React, { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import tw from "twin.macro";

import { useHistory } from "react-router-dom";
import PaginationFooter from "../../components/layout/PaginationFooter";

export default function InvoicesDeleted() {
  const history = useHistory();

  const [checked, setChecked] = useState([]);
  const handleCheck = (v) => {
    const newChecked = [...checked];
    const findById = newChecked.find((x) => x === v);
    if (findById) {
      const findIndex = checked.indexOf(v);
      newChecked.splice(findIndex, 1);
    } else {
      newChecked.push(v);
    }
    setChecked(newChecked);
  };

  const data = [];
  const handleCheckAll = () => {
    const all = data?.map((item) => item.key);
    if (data?.length === checked.length) {
      setChecked([]);
    } else {
      setChecked(all);
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={data.length !== 0 && data?.length === checked.length}
          disabled={data.length === 0}
          className="font-normal"
          onChange={handleCheckAll}
        />
      ),
      dataIndex: "checkbox",
      key: "checkbox",
      width: "5%",
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

  return (
    <>
      <div tw="w-full md:w-[98%] md:mb-5">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div tw="flex items-center">
            <span
              tw="text-xl cursor-pointer font-bold text-primary"
              onClick={() => history.push("/clients")}
            >
              All Clients
            </span>
            <RightOutlined tw=" ml-2" />
            <span tw="text-xl font-bold text-black ml-2">Deleted</span>
          </div>
        </div>
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            className="ant-border-space"
          />
        </div>
        <div tw="flex justify-between mt-5">
          <div>
            <span tw="text-sm text-black font-bold">
              1-{data.length - 1} of {data.length - 1}{" "}
            </span>
          </div>
{/* 
          <div>
            <PaginationFooter />
          </div> */}
        </div>
      </div>
    </>
  );
}
