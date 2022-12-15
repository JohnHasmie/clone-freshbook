import {
  CaretDownOutlined,
  CloseOutlined,
  CopyOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  MailOutlined,
  PlusCircleFilled,
  PlusOutlined,
  PrinterOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
  SendOutlined,
  UnorderedListOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Menu,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";

import CardInvoice from "../../components/CardInvoice/index";
import TableCustom from "../../components/Table";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import { FormAdvanceSearchInvoice } from "../clients/FormAdvanceSearch";
import InvoiceTabs from "./InvoicesTabs";
import TabHome from "../clients/TabHome";
import PaginationFooter from "../../components/layout/PaginationFooter";

export default function Invoices() {
  const { Title, Text } = Typography;
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();
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

  const [isToggle, setIsToggle] = useState(true);


  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
     setIsHover(true);
  };
  const handleMouseLeave = () => {
     setIsHover(false);
  };

  const dummyData = [
    {
      key: "1",
      client_invoice_number_title: "Company Name",
      client_invoice_number: "00148",
      description: "PSD to HTML",
      date: "25/10/2022",
      date_difference: "Due in 4 days",
      amount: "6,000.000",
      status: "sent",
    },
    {
      key: "2",
      client_invoice_number_title: "Company Test",
      client_invoice_number: "00148",
      description: "PSD to HTML",
      date: "25/10/2022",
      date_difference: "Due in 4 days",
      amount: "6,000.000",
      status: "paid",
    },
  ];
  const data = dummyData.map(item=>(
    {
      key: "1",
      checkbox: (
        <Checkbox
          className="font-normal"
          value={"1"}
          checked={checked.includes("1")}
          onChange={(e) => handleCheck(e.target.value)}
        />
      ),
      client_invoice_number: (
        <div>
          <h3>{item.client_invoice_number_title}</h3>
          <p>{item.client_invoice_number}</p>
        </div>
      ),
      description: <span tw="flex items-start">{item.description}</span>,

      date: (
        <div>
          <h3>{item.date}</h3>
          <p>{item.date_difference}</p>
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

            {item.status === "paid" ? (
              <div tw="hover:bg-gray-100   border-r border-gray-200 ">
                <Tooltip placement="top" title="archive">
                  <HddOutlined tw="px-2 py-1 " />
                </Tooltip>
              </div>
            ) : (
              <div tw="hover:bg-gray-100   border-r border-gray-200 ">
                <Tooltip placement="top" title="add payment">
                  <DollarOutlined tw="px-2 py-1 " />
                </Tooltip>
              </div>
            )}
            <div tw="hover:bg-gray-100   ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs px-2 py-1" />
              </Tooltip>
            </div>
          </div>
          <h3>${item.amount} USD</h3>
          <span tw="bg-green-400 rounded p-1">{item.status}</span>
        </div>
      ),
    }
  ))
  // [
  //   {
  //     key: "1",
  //     checkbox: (
  //       <Checkbox
  //         className="font-normal"
  //         value={1}
  //         checked={checked.includes("1")}
  //         onChange={(e) => handleCheck(e.target.value)}
  //       />
  //     ),
  //     client_invoice_number: (
  //       <div>
  //         <h3>Company Name</h3>
  //         <p>00148</p>
  //       </div>
  //     ),
  //     description: <span tw="flex items-start">PSD to HTML</span>,

  //     date: (
  //       <div>
  //         <h3>25/10/2022</h3>
  //         <p>Due in 4 days</p>
  //       </div>
  //     ),
  //     amount: (
  //       <div tw="text-right relative">
  //         <div
  //           className="isVisible"
  //           tw="absolute bottom-16 right-6 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
  //         >
  //           <div tw="hover:bg-gray-100 ">
  //             <Tooltip placement="top" title="edit">
  //               <EditOutlined tw="px-2 py-1  " />
  //             </Tooltip>
  //           </div>
  //           <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
  //             <Tooltip placement="top" title="duplicate">
  //               <CopyOutlined tw="px-2 py-1" />
  //             </Tooltip>
  //           </div>

  //           {status === "paid" ? (
  //             <div tw="hover:bg-gray-100   border-r border-gray-200 ">
  //               <Tooltip placement="top" title="archive">
  //                 <HddOutlined tw="px-2 py-1 " />
  //               </Tooltip>
  //             </div>
  //           ) : (
  //             <div tw="hover:bg-gray-100   border-r border-gray-200 ">
  //               <Tooltip placement="top" title="add payment">
  //                 <DollarOutlined tw="px-2 py-1 " />
  //               </Tooltip>
  //             </div>
  //           )}
  //           <div tw="hover:bg-gray-100   ">
  //             <Tooltip placement="top" title="More">
  //               <EllipsisOutlined tw="text-xs px-2 py-1" />
  //             </Tooltip>
  //           </div>
  //         </div>
  //         <h3>$6,000.000 USD</h3>
  //         <span tw="bg-green-400 rounded p-1">{status}</span>
  //       </div>
  //     ),
  //   },
  // ];

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
      width:"5%"
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

  const bulkList = (
    <div tw="w-36">
      <Menu>
        <Menu.Item>
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div>
            <CopyOutlined />
            <span>Duplicate</span>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div>
            <PrinterOutlined />
            <span>Print</span>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div>
            <MailOutlined />
            <span>Send By Email</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div>
            <SendOutlined />
            <span>Mark as Sent</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div>
            <DollarOutlined />
            <span>Add a Payment</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div>
            <VerticalAlignBottomOutlined />
            <span>Download PDF</span>
          </div>
        </Menu.Item>
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

  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg">
          <TabHome />
          {isToggle?<div tw="hidden md:block mt-20">

             <div tw=" flex justify-between"  onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
            <Title level={4}>Recently Active</Title>
            <span tw=" font-bold text-lg cursor-pointer" onClick={()=>setIsToggle(false)} style={{ visibility: isHover ? 'visible' : 'hidden',}}>Remove <CloseOutlined tw="ml-1" /></span>
          </div>
            <div tw="flex" style={{opacity:isHover?'0.5':'1'}}>
              <div
                onClick={() => history.push("/invoices/new")}
                tw="cursor-pointer border border-gray-200 hover:bg-blue-50 border-dashed flex w-44 rounded-md  mr-5 justify-center items-center"
              >
                <div tw="flex flex-col">
                  <PlusOutlined tw="text-xl text-green-400" />
                  <span tw="text-base  font-bold">New Invoice</span>
                </div>
              </div>
              <Link to={`/invoices/1/invoice-detail`}>
                <CardInvoice
                 
                  size="small"
                  tw="w-44"
                  actions={[<span tw="font-bold text-center">Sent</span>]}
                >
                  <span tw="text-xs text-gray-600 mb-2">00148</span>
                  <div tw="flex flex-col mb-10 ">
                    <span tw="font-bold text-gray-600">Company Name</span>
                    <span tw="text-xs text-gray-600">25/10/2022</span>
                  </div>
                  <Divider />
                  <span tw="flex justify-end text-sm text-right">$6,000</span>
                </CardInvoice>
              </Link>
            </div>
          </div>:
          <div tw=" hidden opacity-0 hover:opacity-100  md:block relative mt-20">
          <div tw="inline-block">
          <Tooltip placement="top" title="Show recent cards">
            <PlusCircleFilled tw="text-2xl z-30 text-gray-400"  onClick={()=>setIsToggle(true)} />
            </Tooltip>
            <hr tw="bg-gray-400 absolute top-1 z-0 left-5 w-full translate-y-2/4	 "/>
          </div> 
         </div>
        }
          <div tw="md:mt-20">
            <InvoiceTabs />
            <div tw="grid md:flex justify-between mb-6">
              <div tw="flex items-center ">
                <span tw="text-xl font-bold text-black">All Invoices </span>
                {checked.length > 0 ? (
                  <>
                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Selected</span>
                    <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
                      {checked.length}
                    </span>
                    <Popover
                      placement="bottom"
                      content={bulkList}
                      trigger="click"
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
                  <PlusOutlined
                    onClick={() => history.push("/invoices/new")}
                    tw="ml-2 text-white bg-success text-xl px-2 py-1.5 flex items-center rounded-md font-bold cursor-pointer"
                  />
                )}
              </div>
              <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch prefix={<SearchOutlined />} />
                <div
                  onClick={() => setIsAdvance(!isAdvance)}
                  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center px-1"
                >
                  <UnorderedListOutlined />
                  <span tw="text-xs ml-2">Advanced Search </span>
                  <CaretDownOutlined tw="ml-1" />
                </div>
              </div>
            </div>
            {isAdvance ? (
              <div tw="bg-gray-100 border-y-2 border-gray-400 p-3 mb-4">
                <FormAdvanceSearchInvoice
                  form={form}
                  setIsAdvance={setIsAdvance}
                />
              </div>
            ) : (
              <></>
            )}
            <div className="table-responsive">
              <TableCustom
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-border-space"
              />
            </div>
            <div tw="flex justify-between my-5">
              <div>
                <span tw="text-sm text-black font-bold">
                  1-{data.length} of {data.length}{" "}
                </span>
              </div>
              <div tw="flex flex-col items-center">
                <button
                  onClick={() => history.push("/invoices/archived")}
                  tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
                >
                  View Archived Invoice
                </button>
                <p tw="text-xs text-gray-500">
                  or{" "}
                  <Link tw="underline text-gray-500" to="/invoices/deleted">
                    deleted
                  </Link>
                </p>
              </div>
              <div>
                <span tw="text-gray-500">Items per page:</span>
                <PaginationFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
