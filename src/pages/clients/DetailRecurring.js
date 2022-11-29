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

export default function DetailRecurring() {
  const { Title } = Typography;
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
      client: <span>John Doe</span>,
      last_issued: <span tw="text-primary">28/11/2022</span>,

      frequency: (
        <div>
          <span>Every Month</span>
          <p tw="text-gray-400 text-sm">Infinite</p>
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
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="delete">
                <RestOutlined tw="px-2 py-1" />
              </Tooltip>
            </div>
        
          </div>
          <h3>Rp 0.00 IDR</h3>
          <span tw="bg-green-400 rounded p-1">Auto-Sent</span>
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
      client: <span>John Doe Ahmadi</span>,
      last_issued: <span>ahmadi@gmail.com</span>,

      frequency: (
        <div>
          <span>0888</span>
          <p tw="text-gray-400 text-sm">0999</p>
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
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="delete">
                <RestOutlined tw="px-2 py-1" />
              </Tooltip>
            </div>
        
          </div>
          <h3>Rp 600.00 IDR</h3>
          <span tw="bg-green-400 rounded p-1">Paid</span>
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
    console.log(checked, "All");
  };
  const columns = [
    {
      title: (
        <Checkbox
          checked={data?.length === checked.length}
          className="font-normal"
          onChange={handleCheckAll}
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
      width: "30%",
    },
    {
      title: "Last Issued",
      dataIndex: "last_issued",
      key: "last_issued",
      width: "30%",
    },

    {
      title: "Frequency /Duration",
      key: "frequency",
      dataIndex: "frequency",
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
          <div tw="flex items-center ">
            <span tw="text-xl font-bold text-black">
              Recurring Templates for Sutton Rowland Inc{" "}
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
              <PlusOutlined tw="ml-2 text-white bg-success text-xl  px-2 rounded-md font-bold pt-0.5 pb-0 cursor-pointer " />
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
