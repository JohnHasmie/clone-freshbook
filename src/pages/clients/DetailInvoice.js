import {
  Button,
  Checkbox,
  Menu,
  Popover,
  Table,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";

import { Link, useHistory, useParams } from "react-router-dom";
import ClientInfo from "../../components/ClientsComponent/ClientInfo";
import ClientTabs from "../../components/ClientsComponent/ClientTabs";
import {
  AppstoreAddOutlined,
  CopyOutlined,
  DollarCircleOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  HddOutlined,
  PieChartOutlined,
  PlusOutlined,
  RestOutlined,
  RightOutlined,
  SnippetsOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import CardReport from "../../components/CardReport";
import tw from "twin.macro";
import TableCustom from "../../components/Button copy";

export default function DetailInvoice() {
  const { Title } = Typography;
  const [checked, setChecked] = useState([]);
  const history=useHistory()
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
  const bulkList = (
    <div tw="border border-[#7f8c9f]">
      <Menu>
        <Menu.Item>
          <div>
            <HddOutlined />
            <span>Archive</span>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div>
            <RestOutlined />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

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
          <span>Ahmad</span>
          <p tw="text-gray-400 text-xs">0989</p>
        </div>
      ),
      description: <span tw="text-primary text-xs">Recurring</span>,

      issued_due_date: (
        <div>
          <span>28/11/2022</span>
          <p tw="text-gray-400 text-sm">Due in 1 Month</p>
        </div>
      ),
      amount_status: (
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
              <Tooltip placement="top" title="add payment">
                <DollarOutlined tw="px-2 py-1 " />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100   ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs px-2 py-1" />
              </Tooltip>
            </div>
          </div>
          <h3 tw="text-base">Rp 0.00 IDR</h3>
          <span tw="bg-gray-300 text-xs rounded p-1">Draft</span>
        </div>
      ),
    },
    {
      key: "2",
      checkbox: (
        <Checkbox
          className="font-normal"
          value={2}
          checked={checked.includes("2")}
          onChange={(e) => handleCheck(e.target.value)}
        />
      ),
      client_invoice_number: (
        <div>
          <span>Sutton Rowland Inc</span>
          <p tw="text-gray-400 text-xs">0999</p>
        </div>
      ),
      description: <span></span>,

      issued_due_date: (
        <div>
          <span>28/11/2022</span>
          <p tw="text-gray-400 text-sm">Due in 1 month</p>
        </div>
      ),
      amount_status: (
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
              <Tooltip placement="top" title="add payment">
                <DollarOutlined tw="px-2 py-1 " />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100   ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs px-2 py-1" />
              </Tooltip>
            </div>
          </div>
          <h3 tw="text-base">Rp 600.00 IDR</h3>
          <span tw="bg-orange-400 text-xs rounded p-1">Paid</span>
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
      width: "5%",
    },
    {
      title: "Client/Invoice Number",
      dataIndex: "client_invoice_number",
      key: "client_invoice_number",
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
    },

    {
      title: "Issued Date /Due Date",
      key: "issued_due_date",
      dataIndex: "issued_due_date",
      width: "20%",
    },
    {
      title: "Amount /Status",
      key: "amount_status",
      dataIndex: "amount_status",
      width: "20%",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <ClientInfo />
        <div tw="max-w-screen-xl mr-5 mb-10 mt-20">
          <ClientTabs />

          <div tw="flex items-end ">
            <span tw="text-xl font-bold text-black">
              Invoices for Sutton Rowland Inc{" "}
            </span>
            {checked.length > 0 ? (
              <>
                <RightOutlined tw=" ml-2" />
                <span tw="text-xl font-bold text-black ml-2">Selected</span>
                <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
                  {checked.length}
                </span>
                <Popover placement="bottom" content={bulkList} trigger="click">
                  <div className="flex items-center justify-center">
                    <Button>
                      <span tw="mr-2">Bulk Actions</span>
                      <DownOutlined />
                    </Button>
                  </div>
                </Popover>
              </>
            ) : (
              <PlusOutlined  onClick={() => history.push("/invoices/new")} tw="ml-2 text-white bg-success text-xl flex items-center rounded-md font-bold py-1.5 px-2 cursor-pointer " />
            )}
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
              <span tw="text-sm text-black font-bold">
                1-{data?.length} of {data?.length}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
