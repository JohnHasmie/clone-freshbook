import {
  Button,
  Checkbox,
  Menu,
  Modal,
  Popover,
  
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";


import ClientInfo from "../../components/ClientsComponent/ClientInfo";
import ClientTabs from "../../components/ClientsComponent/ClientTabs";
import {
 
  DownOutlined,
  EditOutlined,
 
  HddOutlined,

  PlusOutlined,
  RestOutlined,
  RightOutlined,

} from "@ant-design/icons";

import tw from "twin.macro";
import TableCustom from "../../components/Table";
import FormAddContact from "./FormAddContact";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import AppContext from "../../components/context/AppContext";

export default function Detail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {clientId}=useParams()
  const {  globalDetailClient } = useContext(AppContext);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      name: <span>John Doe</span>,
      email: <span tw="text-primary">28/11/2022</span>,

      phone_number: (
        <div tw="text-right relative">
          <div
            className="isVisible"
            tw="absolute bottom-14 right-0 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
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
          <h3 tw="text-sm">089669235896</h3>
          <span tw="text-gray-400 text-xs ">08123456789</span>
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
      name: <span>John Doe Ahmadi</span>,
      email: <span>ahmadi@gmail.com</span>,

      phone_number: (
        <div tw="text-right relative">
          <div
            className="isVisible"
            tw="absolute bottom-14 right-0 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
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
          <h3 tw="text-sm">089669235896</h3>
          <span tw="text-gray-400 text-xs">08123456789</span>
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
    },

    {
      title: <div tw="text-right">Phone Number 1 /Phone Number 2</div>,
      key: "phone_number",
      dataIndex: "phone_number",
      width: "20%",
    },
  ];

  return (
    <>
      <div className="layout-content">
        <ClientInfo clientId={clientId} />
        <div tw="max-w-screen-xl mr-5 mb-10 mt-20"  >
            <ClientTabs />
          <div tw="flex items-end " >
            <span tw="text-xl font-bold text-black">
              Contacts for {globalDetailClient?.company_name}
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
              <PlusOutlined
                onClick={showModal}
                tw="ml-2 text-white bg-success text-xl flex items-center rounded-md font-bold py-1.5 px-2 cursor-pointer "
              />
            )}
          </div>

          <Modal
            footer={null}
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
          >
            <FormAddContact handleOk={handleOk} />
          </Modal>
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

