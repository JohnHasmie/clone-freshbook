import {
  CopyOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  MailOutlined,
  PrinterOutlined,
  RestOutlined,
  RightOutlined,
  SendOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Menu, Popover, Tooltip, Typography } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useState,useContext } from "react";
import { useQuery } from "react-query";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";
import AppContext from "../../components/context/AppContext";

import TableCustom from "../../components/Table/index";
import { getTotalGlobal, numberWithDot, translateBg } from "../../components/Utils";
import TabHome from "../clients/TabHome";


export default function InvoicesOutstanding() {
  const history = useHistory();
  const [checked, setChecked] = useState([]);
  const { globalOutstanding } = useContext(AppContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
  });
  const [clicked, setClicked] = useState(false);
  const handleClickChange = (open) => {
    setClicked(open);
  };


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
  const { data: dataInvoices, status } = useQuery(
    ["invoices-listing", filter],
    async (key) =>
      axios
        .get("invoices", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  
  const data =
    status === "success" &&
    dataInvoices?.data?.map((item) => ({
      key: item.id,
      company_name: item.client.company_name,
      invoice_number:item.code,
      date: item.issued_at ,
      due_date:item.due_date,
      description: item.notes,
      amount:item.total,
      status:item.status
    }));

  const handleCheckAll = () => {
    const all = data?.map((item) => item.key);
    if (data?.length === checked.length) {
      setChecked([]);
    } else {
      setChecked(all);
    }
  };
  const defaultFooter = () => (<div tw="text-right text-base">Grand Total: {data && getTotalGlobal(data?.map(x=>{
    const splitAmount=x.amount.split(".")
    return parseInt(splitAmount[0])
  }))} </div>);
  const handleAction=(e,type,record)=>{
    e.stopPropagation()
    switch (type) {
      case 'edit':
        history.push(`/invoices/${record.key}/edit`)
        break;
        case 'duplicate':
        history.push(`/invoices/${record.key}/edit`)
        break;
        case 'payment':
        history.push(`/invoices/${record.key}/edit`)
        break;
    
      default:
        history.push(`/invoices`)
    
        break;
    }
      }
      const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
      };
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };
      const hasSelected = selectedRowKeys.length > 0;
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
      width:'30%'

    },

    {
      title: "Issued Date / Due Date",
      key: "issued_due_date",
      dataIndex: "issued_due_date",
      render: (text, record) => (
        <div>
          <span>{moment(record.date).format("MM/DD/YYYY")}</span>{" "}
          <p tw="text-xs">
            {`Due ${moment(record.due_date).endOf('month').from(record.date)} `} 
          </p>{" "}
        </div>
      ),
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Amount / Status",
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
                <EditOutlined tw="p-2" onClick={(e)=>{
                  handleAction(e,'edit',record)}} />
              </Tooltip>
            </div>

            <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
              <Tooltip placement="top" title="duplicate">
                <CopyOutlined tw="p-2" onClick={(e)=>{
                  handleAction(e,'duplicate',record)}} />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100   border-r border-gray-200 ">
              <Tooltip placement="top" title="add payment">
                <DollarOutlined tw="p-2 "
                onClick={(e)=>{
                  handleAction(e,'payment',record)}}
                />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100  hover:rounded-r-full ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs p-2" />
              </Tooltip>
            </div>
          </div>
          <span>Rp{numberWithDot(record.amount)}</span>{" "}
          <span tw="text-xs rounded p-1 ml-auto" style={{background:translateBg(record.status)}}>{record.status} </span>
         
        </div>
      ),
      sorter: (a, b) => a.amount - b.amount,
      align:'right'
    },
  ];
  
  const bulkList = (
    <div tw="w-36">
      <Menu>
        <Menu.Item key="edit">
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>

        <Menu.Item key="duplicate">
          <div>
            <CopyOutlined />
            <span>Duplicate</span>
          </div>
        </Menu.Item>

        <Menu.Item key="print">
          <div>
            <PrinterOutlined />
            <span>Print</span>
          </div>
        </Menu.Item>

        <Menu.Item key="send-email">
          <div>
            <MailOutlined />
            <span>Send By Email</span>
          </div>
        </Menu.Item>
        <Menu.Item key="">
          <div>
            <SendOutlined />
            <span>Mark as Sent</span>
          </div>
        </Menu.Item>
        <Menu.Item key="mark-as-sent">
          <div>
            <DollarOutlined />
            <span>Add a Payment</span>
          </div>
        </Menu.Item>
        <Menu.Item key="download-pdf">
          <div>
            <VerticalAlignBottomOutlined />
            <span>Download PDF</span>
          </div>
        </Menu.Item>
        <Menu.Item key="archive">
          <div>
            <HddOutlined />
            <span>Archive</span>
          </div>
        </Menu.Item>
        <Menu.Item key="delete">
          <div>
            <RestOutlined />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );



  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg mb-20">
          <TabHome />
          <div tw="mt-20">
          <div tw="flex items-center">
                {hasSelected ? (
                  <>
                    <span
                      onClick={() => history.push(`/invoices`)}
                      tw="text-xl font-bold text-primary cursor-pointer"
                    >
                      All Invoices
                    </span>

                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Outstanding</span>
                    <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
                      {selectedRowKeys.length}
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
                  <span
                      onClick={() => history.push(`/invoices`)}
                      tw="text-xl font-bold text-primary cursor-pointer"
                    >
                      All Invoices
                    </span>

                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Outstanding</span>
               
                  </>
                )}
              </div>

            <div className="table-responsive">
            <TableCustom
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(`/invoices/${record.key}/invoice-detail`);
                    },
                  };
                }}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
                footer={defaultFooter}
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
