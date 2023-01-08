import { Button, Menu, Modal, Popover, Tooltip } from "antd";
import React, { useContext, useState } from "react";

import ClientInfo from "../../components/ClientsComponent/ClientInfo";
import ClientTabs from "../../components/ClientsComponent/ClientTabs";
import {
  CopyOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
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
import { useHistory, useParams } from "react-router-dom";
import AppContext from "../../components/context/AppContext";
import { ModalConfirm } from "../../components/ModalConfirm.style";

export default function DetailInvoice() {
  const [clicked, setClicked] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clientId } = useParams();
  const { globalDetailClient } = useContext(AppContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history=useHistory()
  const [isType, setIsType] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModal = (type) => {
    switch (type.key) {
      case "archive":
        setIsType("archive");
        break;
      case "delete":
        setIsType("delete");
        break;
      default:
        setIsType("");
        break;
    }
    showModal();
    hide()
  };
  const hide = () => {
    setClicked(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const bulkList = (
    <div /* tw="border border-[#7f8c9f]" */>
      <Menu>
      <Menu.Item onClick={handleModal} key="archive">
          <div>
            <HddOutlined  />
            <span>Archive</span>
          </div>
        </Menu.Item>
        <Menu.Item key="delete" onClick={handleModal}>
          <div>
            <RestOutlined  />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

 

  const data = [
        {
          key: "1",
     
          company_name:"Abc Inc",
          invoice_number:"0989",
          date:"28/11/2022",
          due_date:"Due in 1 Month",
          description: "Recurring",
          amount:0,
          status:"draft"
    
        
        }
      ];

  const columns = [
   
    {
      title: "Client / Invoice Number",
      dataIndex: "invoice_number",
      key: "invoice_number",
      render: (text, record) => (
        <div>
          <span>{record.company_name}</span>{" "}
          <p tw="text-xs">
            {record.invoice_number} 
          </p>{" "}
        </div>
      ),
      sorter: (a, b) => a.company_name.length - b.company_name.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length,

    },

    {
      title: "Issued Date /Due Date",
      key: "issued_due_date",
      dataIndex: "issued_due_date",
      render: (text, record) => (
        <div>
          <span>{record.date}</span>{" "}
          <p tw="text-xs">
            {record.due_date} 
          </p>{" "}
        </div>
      ),
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Amount /Status",
      key: "amount",
      dataIndex: "amount",
      render: (text, record) => (
        <div tw="grid">
             <div
            className="isVisible"
            tw="absolute bottom-16 right-6 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
          >
            <div tw="hover:bg-gray-100 hover:rounded-l-full ">
              <Tooltip placement="top" title="edit">
                <EditOutlined tw="p-2  " />
              </Tooltip>
            </div>

            <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
              <Tooltip placement="top" title="duplicate">
                <CopyOutlined tw="p-2" />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100   border-r border-gray-200 ">
              <Tooltip placement="top" title="add payment">
                <DollarOutlined tw="p-2 " />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100  hover:rounded-r-full ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs p-2" />
              </Tooltip>
            </div>
          </div>
          <span>{record.amount}</span>{" "}
          <span tw="bg-orange-400 text-xs rounded p-1 ml-auto ">{record.status} </span>
         
        </div>
      ),
      sorter: (a, b) => a.amount - b.amount,
      align:'right'
    },
  ];

 
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleClickChange = (open) => {
    setClicked(open);
  };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <>
      <div className="layout-content">
        <ClientInfo clientId={clientId} />
        <div tw="max-w-screen-xl mr-5 mb-10 mt-20">
          <ClientTabs />
          <div tw="flex items-center ">
            {hasSelected ? (
              <>
                <span tw="text-xl font-bold text-primary cursor-pointer" onClick={()=>setSelectedRowKeys([])}>
                  Invoices for {globalDetailClient?.company_name}
                </span>
                <RightOutlined tw=" ml-2" />
                <span tw="text-xl font-bold text-black ml-2">Selected</span>
                <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
                  {hasSelected}
                </span>
                <Popover
                  placement="bottom"
                  content={bulkList}
                  trigger="click"
                  visible={clicked}
                  onVisibleChange={handleClickChange}
                >
                  <div className="flex items-center justify-center">
                    <Button>
                      <span tw="mr-2">Bulk Actions</span>
                      <DownOutlined />
                    </Button>
                  </div>
                </Popover>
              </>
            ) : (
              <>
                <span tw="text-xl font-bold text-black">
                  Invoices for {globalDetailClient?.company_name}
                </span>
                <PlusOutlined
                  onClick={() => history.push("/invoices/new")}
                  tw="ml-2 text-white bg-success text-xl flex items-center rounded-md font-bold py-1.5 px-2 cursor-pointer "
                />
              </>
            )}
          </div>

          <ModalConfirm
          title="Confirm"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={500}
          closable={false}
        >
          <span tw="text-lg">{`Are you sure you want to ${selectedRowKeys.length > 1 ? selectedRowKeys.length : isType} this?` }</span>
        </ModalConfirm>
          <div className="table-responsive">
            <TableCustom
              // onRow={(record, rowIndex) => {
              //   return {
              //     onDoubleClick: (event) => showModal(),
              //   };
              // }}
              rowSelection={rowSelection}
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
