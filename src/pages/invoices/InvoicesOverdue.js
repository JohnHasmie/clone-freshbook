import {
  CopyOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  RestOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Checkbox, Tooltip } from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";

import TableCustom from "../../components/Table/index";

import TabHome from "../clients/TabHome";


export default function InvoicesOverdue() {
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
  const data = [
    {
      key: "1",
      checkbox: (
        <Checkbox
          className="font-normal"
          value={1}
          checked={checked.includes("1")}
          onChange={(e) => handleCheck(e.target.value)}
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

          
              <div tw="hover:bg-gray-100   border-r border-gray-200 ">
                <Tooltip placement="top" title="archive">
                  <HddOutlined tw="px-2 py-1 " />
                </Tooltip>
              </div>
         
            <div tw="hover:bg-gray-100   ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs px-2 py-1" />
              </Tooltip>
            </div>
          </div>
          <h3>$6,000.000 USD</h3>
          <span tw="bg-green-400 rounded p-1">paid</span>
        </div>
      ),
    },
  ];

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
          checked={data.length !== 0 && data?.length === checked.length}  disabled={data.length === 0}
          className="font-normal"
          onChange={handleCheckAll}
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

  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg mb-20">
          <TabHome />

          <div tw="mt-20">
            <div tw="flex items-center mb-4">
              <span
                onClick={() => history.push("/clients")}
                tw="cursor-pointer text-xl font-bold text-black text-primary"
              >
                All Clients
              </span>
              <RightOutlined tw=" ml-2" />
              <span tw="text-xl font-bold text-black ml-2">
                Clients with Overdue Invoices
              </span>
            </div>

            <div className="table-responsive">
              <TableCustom
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-border-space"
              />
            </div>
            <div tw="flex justify-between mt-5">
              <div>
                <span tw="text-sm text-black font-bold">1-4 of 4 </span>
              </div>
              <div tw="flex flex-col items-center">
                <button
                  onClick={() => history.push("clients/archived")}
                  tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-200 "
                >
                  View Archived Service
                </button>
                <p tw="text-xs text-gray-500">
                  or{" "}
                  <Link tw="underline text-gray-500" to="clients/deleted">
                    deleted
                  </Link>
                </p>
              </div>
              <div tw="invisible">hide</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
