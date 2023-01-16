// import {
//   CalendarOutlined,
//   CaretDownOutlined,
//   CloseOutlined,
//   DownOutlined,
//   EditOutlined,
//   HddOutlined,
//   PlusCircleFilled,
//   PlusOutlined,
//   RestOutlined,
//   RightOutlined,
//   SearchOutlined,
// } from "@ant-design/icons";
// import { Button, Checkbox, Divider, Menu, Popover, Tooltip, Typography } from "antd";
// import React, { useState } from "react";
// import { Link, useHistory } from "react-router-dom";
// import CardInvoice from "../../components/CardInvoice/index";
// import TableCustom from "../../components/Table";
// import InputAdvanceSearch from "../../components/InputAdvancedSearch";
// import InvoiceTabs from "./InvoicesTabs";
// import tw from "twin.macro";
// import PaginationFooter from "../../components/layout/PaginationFooter";

// export default function Recurring() {
//   const { Title } = Typography;
//   const [checked, setChecked] = useState([]);
//   const [status, setStatus] = useState("sent");
//   const history = useHistory();
//   const [isToggle, setIsToggle] = useState(true);
//   const [filter, setFilter] = useState({
//     limit: 10,
//     page: 1,
//   });
//   const [isHover, setIsHover] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHover(true);
//   };
//   const handleMouseLeave = () => {
//     setIsHover(false);
//   };

//   const handleCheck = (v) => {
//     const newChecked = [...checked];
//     const findById = newChecked.find((x) => x === v);
//     if (findById) {
//       const findIndex = checked.indexOf(v);
//       newChecked.splice(findIndex, 1);
//     } else {
//       newChecked.push(v);
//     }
//     setChecked(newChecked);
//   };

//   const data = [
//     {
//       key: "1",
//       checkbox: (
//         <Checkbox
//           className="font-normal"
//           value={"1"}
//           checked={checked.includes("1")}
//           onChange={(e) => handleCheck(e.target.value)}
//         />
//       ),
//       client: <div>Sutton Rowland Inc</div>,
//       last_issued: <span tw="text-primary text-xs">28/11/2022</span>,

//       frequency_duration: (
//         <div>
//           <h3 tw="text-sm">Every month</h3>
//           <p tw="text-primary text-xs">Infinite</p>
//         </div>
//       ),
//       amount: (
// <div tw="text-right relative">
//   <div
//     className="isVisible"
//     tw="absolute bottom-16 right-6 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
//   >
//     <div tw="hover:bg-gray-100 ">
//       <Tooltip placement="top" title="edit">
//         <EditOutlined tw="px-2 py-1  " onClick={()=>history.push(`/recurring-template/1/edit`)} />
//       </Tooltip>
//     </div>
//     <div tw="hover:bg-gray-100  ">
//       <Tooltip placement="top" title="delete">
//         <RestOutlined tw="px-2 py-1" />
//       </Tooltip>
//     </div>
//   </div>
//   <h3>$6,000.000 USD</h3>
//   <span tw="bg-green-400 rounded p-1">{status}</span>
// </div>
//       ),
//     },
//   ];

//   const handleCheckAll = () => {
//     const all = data?.map((item) => item.key);
//     if (data?.length === checked.length) {
//       setChecked([]);
//     } else {
//       setChecked(all);
//     }
//   };
//   const columns = [
//     {
//       title: (
//         <Checkbox
//           className="font-normal"
//           checked={data.length !== 0 && data?.length === checked.length}  disabled={data.length === 0}
//           onChange={handleCheckAll}

//         />
//       ),
//       dataIndex: "checkbox",
//       key: "checkbox",
//       width: "5%",
//     },
//     {
//       title: "Client",
//       dataIndex: "client",
//       key: "client",
//     },
//     {
//       title: "Last Issued",
//       dataIndex: "last_issued",
//       key: "last_issued",
//     },

//     {
//       title: "Frequency /Duration",
//       key: "frequency_duration",
//       dataIndex: "frequency_duration",
//     },

//     {
//       title: "Amount / Status",
//       key: "amount",
//       dataIndex: "amount",
//     },
//   ];
//   const bulkList = (
//     <div tw="w-36">
//       <Menu>
//         <Menu.Item>
//           <div>
//             <EditOutlined />
//             <span>Edit</span>
//           </div>
//         </Menu.Item>

//         <Menu.Item>
//           <div>
//             <HddOutlined />
//             <span>Archive</span>
//           </div>
//         </Menu.Item>
//         <Menu.Item>
//           <div>
//             <RestOutlined />
//             <span>Delete</span>
//           </div>
//         </Menu.Item>
//       </Menu>
//     </div>
//   );
//   return (
//     <>
//       <div className="layout-content">
//         <div tw="max-w-screen-lg">
//           {isToggle ? (
//             <div tw="hidden md:block">
//               <div
//                 tw=" flex justify-between"
//                 onMouseEnter={handleMouseEnter}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 <Title level={4}>Recently Active</Title>
//                 <span
//                   tw=" font-bold text-lg cursor-pointer"
//                   onClick={() => setIsToggle(false)}
//                   style={{ visibility: isHover ? "visible" : "hidden" }}
//                 >
//                   Remove <CloseOutlined tw="ml-1" />
//                 </span>
//               </div>
//               <div tw="flex" style={{ opacity: isHover ? "0.5" : "1" }}>
//                 <div
//                   onClick={() => history.push("/invoices/new")}
//                   tw="cursor-pointer border border-gray-200 hover:bg-blue-50 border-dashed flex w-44 rounded-md  mr-5 justify-center items-center"
//                 >
//                   <div tw="flex flex-col">
//                     <PlusOutlined tw="text-xl text-green-400" />
//                     <span tw="text-base  font-bold">New Invoice</span>
//                   </div>
//                 </div>
//                 <Link to={`/invoices/1/invoice-detail`}>
//                   <CardInvoice
//                     title="Default size card"
//                     size="small"
//                     tw="w-44"
//                     actions={[<span tw="font-bold text-center">Sent</span>]}
//                   >
//                     <span tw="text-xs text-gray-600 mb-2">00148</span>
//                     <div tw="flex flex-col mb-10 ">
//                       <span tw="font-bold text-gray-600">Company Name</span>
//                       <span tw="text-xs text-gray-600">25/10/2022</span>
//                     </div>
//                     <Divider />
//                     <span tw="flex justify-end text-sm text-right">$6,000</span>
//                   </CardInvoice>
//                 </Link>
//               </div>
//             </div>
//           ) : (
//             <div tw=" hidden opacity-0 hover:opacity-100  md:block relative ">
//               <div tw="inline-block">
//                 <Tooltip placement="top" title="Show recent cards">
//                   <PlusCircleFilled
//                     tw="text-2xl z-30 text-gray-400"
//                     onClick={() => setIsToggle(true)}
//                   />
//                 </Tooltip>
//                 <hr tw="bg-gray-400 absolute top-1 z-0 left-5 w-full translate-y-2/4	 " />
//               </div>
//             </div>
//           )}
//           <div tw="md:mt-20">
//             <InvoiceTabs />
//             <div tw="grid md:flex justify-between mb-6">
//               <div tw="flex items-center ">
//                 <span tw="text-xl font-bold text-black">
//                   All Recurring Templates
//                 </span>
//                 {checked.length > 0 ? (
//                   <>
//                     <RightOutlined tw=" ml-2" />
//                     <span tw="text-xl font-bold text-black ml-2">Selected</span>
//                     <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
//                       {checked.length}
//                     </span>
//                     <Popover
//                       placement="bottom"
//                       content={bulkList}
//                       trigger="click"
//                     >
//                       <div className="flex items-center justify-center">
//                         <Button>
//                           <span tw="mr-2">Bulk Actions</span>
//                           <DownOutlined />
//                         </Button>
//                       </div>
//                     </Popover>
//                   </>
//                 ) : (
//                   <PlusOutlined
//                     onClick={() => history.push("/recurring-template/new")}
//                     tw="ml-2 text-white bg-success text-xl px-2 py-1.5 flex items-center rounded-md font-bold cursor-pointer"
//                   />
//                 )}
//               </div>
//               <div tw="flex relative cursor-pointer">
//                 <InputAdvanceSearch prefix={<SearchOutlined />} />
//                 <label
//                   htmlFor="date"
//                   tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center px-2 cursor-pointer"
//                 >
//                   <input
//                     type="date"
//                     htmlFor="date"
//                     name="date"
//                     id="date"
//                     tw="hidden"
//                   />
//                   <CalendarOutlined />
//                   <CaretDownOutlined tw="ml-1" />
//                 </label>
//               </div>
//             </div>

//             <div className="table-responsive">
//               <TableCustom
//                 columns={columns}
//                 dataSource={data}
//                 pagination={false}
//                 className="ant-border-space"
//               />
//             </div>
//             <div tw="flex justify-between my-5">
//               <div>
//                 <span tw="text-sm text-black font-bold">
//                   1-{data.length} of {data.length}{" "}
//                 </span>
//               </div>
//               <div tw="flex flex-col items-center">
//                 <button
//                   onClick={() => history.push("/invoices/archived")}
//                   tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
//                 >
//                   View Archived Recurring Templates
//                 </button>
//                 <p tw="text-xs text-gray-500">
//                   or{" "}
//                   <Link tw="underline text-gray-500" to="/invoices/deleted">
//                     deleted
//                   </Link>
//                 </p>
//               </div>
//               <div tw="invisible">
//                 <span tw="text-gray-500">Items per page:</span>
//                 <PaginationFooter filterProps={[filter,setFilter]} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import {
  CalendarOutlined,
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
  notification,
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot, translateBg } from "../../components/Utils";
import moment from "moment";
import ListCardInvoice from "./ListCardInvoice";
import { ModalConfirm } from "../../components/ModalConfirm.style";
import FilterDate from "./FilterDate";

export default function Invoices() {
  const { Title } = Typography;
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();
  const history = useHistory();
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    type:"recurring",
    mode:"published",
    start_date: "",
    end_date: "",
    date_type: "last_invoice",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isType, setIsType] = useState("");
  const [isInvoiceId, setIsInvoiceId] = useState("");
  const queryClient = useQueryClient();

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

    setIsModalOpen(true);
    setClicked(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    switch (isType) {
      case "archive":
        if (selectedRowKeys.length === 0) {
          mutationArchive.mutate({ ids: [isInvoiceId], mode: "archive" });
        } else {
          mutationArchive.mutate({ ids: selectedRowKeys, mode: "archive" });
        }
        break;
      case "delete":
        if (isInvoiceId) {
          mutation.mutate(isInvoiceId);
        } else {
          mutation.mutate(selectedRowKeys[0]);
        }
        break;
      default:
        setIsType("");
        break;
    }

    setIsModalOpen(false);
  };
  const mutationArchive = useMutation(
    async (data) => {
      return axios.put(`invoices/view`, data).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("recurring-listing");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `The selected ${
            selectedRowKeys.length > 1 ? selectedRowKeys.length : ""
          } invoices
          has been succesfully archived`,
          placement: "topLeft",
        });
      },
      onError: () => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );
  const mutation = useMutation(
    async (data) => {
      return axios.delete(`invoices/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("recurring-listing");
        }, 500);
        setSelectedRowKeys([]);
        setIsInvoiceId("");
        notification.success({
          message: `The selected ${
            selectedRowKeys.length > 1 && selectedRowKeys.length
          } invoices
          has been succesfully deleted`,
          placement: "topLeft",
        });
      },
      onError: () => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );
  const [searchField, setSearchField] = useState({
    company_name: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    total_outstanding: "",
    credit_number: "",
    credit_amount: "",
  });

  const [isToggle, setIsToggle] = useState(true);
  const handleClickChange = (open) => {
    setClicked(open);
  };

  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const { data: dataInvoices, status } = useQuery(
    ["recurring-listing", filter],
    async (key) =>
      axios
        .get("invoices", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  const filteredData =
    status === "success" &&
    dataInvoices?.data.filter((item) => {
      return item?.client?.company_name
        .toLowerCase()
        .includes(searchField?.company_name.toLowerCase());
    });

  const data =
    status === "success" &&
    filteredData
      ?.filter((item) => item.recurring !== null)
      ?.map((item) => ({
        key: item.id,
        client: item.client.company_name,
        invoice_number: item.code,
        issued_at: item.issued_at,
        due_date: item.due_date,
        description: item.notes,
        amount: item.total,
        status: item.status,
        frequency: item.recurring.type,
        duration: item.recurring.delivery_option,
      }));

  const columns = [
    {
      title: "Client",
      dataIndex: "client",
      key: "client",

      sorter: (a, b) => a.client.length - b.client.length,
    },
    {
      title: "Last Issued",
      key: "issued_at",
      dataIndex: "issued_at",
      render: (text, record) => (
        <span tw="text-primary">
          {moment(record.issued_at).format("MM/DD/YYYY")}
        </span>
      ),
      sorter: (a, b) => a.issued_at.length - b.issued_at.length,
    },

    {
      title: "Frequency / Duration",
      key: "frequency_duration",
      dataIndex: "frequency_duration",
      render: (text, record) => (
        <div>
          <span>{record.frequency}</span> <p tw="text-xs">{record.duration}</p>{" "}
        </div>
      ),
      sorter: (a, b) => a.frequency.length - b.frequency.length,
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
            <div tw="hover:bg-gray-100 hover:rounded-l-full border-gray-200 ">
              <Tooltip placement="top" title="edit">
                <EditOutlined
                  tw="p-2"
                  onClick={(e) => {
                    handleAction(e, "edit", record);
                  }}
                />
              </Tooltip>
            </div>

            <div tw="hover:bg-gray-100  border-l hover:rounded-r-full  border-gray-200">
              <Tooltip placement="top" title="delete">
                <RestOutlined
                  tw="p-2"
                  onClick={(e) => {
                    handleAction(e, "delete", record);
                  }}
                />
              </Tooltip>
            </div>
          </div>
          <span>{numberWithDot(record.amount)}</span>{" "}
          <span
            tw="text-xs rounded p-1 ml-auto"
            style={{ background: translateBg(record.status) }}
          >
            {record.status}{" "}
          </span>
        </div>
      ),
      sorter: (a, b) => a.amount - b.amount,
      align: "right",
    },
  ];
  const handleAction = (e, type, record) => {
    e.stopPropagation();
    switch (type) {
      case "edit":
        history.push(`/invoices/${record.key}/edit`);
        break;
      case "duplicate":
        history.push(`/invoices/${record.key}/edit`);
        break;
      case "payment":
        history.push(`/invoices/${record.key}/edit`);
        break;
        case "delete":
          setIsInvoiceId(record.key)
          handleModal({ key: "undelete" })

          break;

      default:
        history.push(`/invoices`);

        break;
    }
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const hide = () => {
    setClicked(false);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const bulkList = (
    <div tw="w-36">
      <Menu>
        <Menu.Item
          key="edit"
          onClick={() => history.push(`clients/${selectedRowKeys[0]}/edit`)}
          disabled={selectedRowKeys.length > 1}
        >
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>

        <Menu.Item onClick={handleModal} key="archive">
          <div>
            <HddOutlined />
            <span>Archive</span>
          </div>
        </Menu.Item>
        <Menu.Item onClick={handleModal} key="delete">
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
          {isToggle ? (
            <div tw="hidden md:block ">
              <div
                tw=" flex justify-between"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Title level={4}>Recently Active</Title>
                <span
                  tw=" font-bold text-lg cursor-pointer"
                  onClick={() => setIsToggle(false)}
                  style={{ visibility: isHover ? "visible" : "hidden" }}
                >
                  Remove <CloseOutlined tw="ml-1" />
                </span>
              </div>
              <div tw="flex" style={{ opacity: isHover ? "0.5" : "1" }}>
                {dataInvoices?.data.length < 4 && (
                  <div
                    onClick={() => history.push("/recurring-template/new")}
                    tw="cursor-pointer border border-gray-200 hover:bg-blue-50 border-dashed flex w-44 rounded-md  mr-5 justify-center items-center"
                  >
                    <div tw="flex flex-col items-center">
                      <PlusOutlined tw="text-xl text-green-400" />
                      <span tw="text-base text-center  font-bold">
                        New Recurring Template
                      </span>
                    </div>
                  </div>
                )}
                <ListCardInvoice invoiceProps={[dataInvoices, status]} />
              </div>
            </div>
          ) : (
            <div tw=" hidden opacity-0 hover:opacity-100  md:block relative mt-20">
              <div tw="inline-block">
                <Tooltip placement="top" title="Show recent cards">
                  <PlusCircleFilled
                    tw="text-2xl z-30 text-gray-400"
                    onClick={() => setIsToggle(true)}
                  />
                </Tooltip>
                <hr tw="bg-gray-400 absolute top-1 z-0 left-5 w-full translate-y-2/4	 " />
              </div>
            </div>
          )}
          <div tw="md:mt-20">
            <InvoiceTabs />
            <div tw="grid md:flex justify-between mb-6">
              <div tw="flex items-center">
                {hasSelected ? (
                  <>
                    <span
                      onClick={() => setSelectedRowKeys([])}
                      tw="text-xl font-bold text-primary cursor-pointer"
                    >
                      Recurring
                    </span>

                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Selected</span>
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
                    <span tw="text-xl font-bold text-black">
                      All Recurring Templates
                    </span>
                    <PlusOutlined
                      onClick={() => history.push("/recurring-template/new")}
                      tw="ml-2 text-white bg-success text-xl flex items-center rounded-md font-bold py-1.5 px-2 cursor-pointer "
                    />
                  </>
                )}
              </div>
              <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch onChange={(e)=>setSearchField({...searchField,company_name:e.target.value})} prefix={<SearchOutlined />} />
                <div
                  onClick={() => setIsAdvance(!isAdvance)}
                  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center px-1"
                >
                     <Popover
              placement="bottomLeft"
              content={<FilterDate hide={hide} filterProps={[filter,setFilter]} />}
              trigger="click"
              visible={clicked}
              onVisibleChange={handleClickChange}
            >
                  <CalendarOutlined/>
                  <CaretDownOutlined tw="ml-1" />
                  </Popover>
                </div>
              </div>
            </div>
            {/* {isAdvance ? (
              <div tw="bg-gray-100 border-y-2 border-gray-400 p-3 mb-4">
                <FormAdvanceSearchInvoice
                  form={form}
                  setIsAdvance={setIsAdvance}
                />
              </div>
            ) : (
              <></>
            )} */}
            <ModalConfirm
              title="Confirm"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={500}
              closable={false}
            >
              <span tw="text-lg">
                {isType === "archive"
                  ? `Are you sure you want to archive ${
                      selectedRowKeys.length < 2
                        ? "this"
                        : selectedRowKeys.length
                    } recurring template? Archived templates are still active - they just don't appear in your regular list.`
                  : `Are you sure you want to delete ${
                      selectedRowKeys.length < 2
                        ? "this"
                        : selectedRowKeys.length
                    } recurring template?`}
              </span>
            </ModalConfirm>
            <div className="table-responsive">
              <TableCustom
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(`/invoices/${record.key}/invoice-detail/recurring-template`);
                    },
                  };
                }}
                rowSelection={rowSelection}
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
                  onClick={() => history.push("/invoices/recurring-templates/archived")}
                  tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
                >
                  View Archived Recurring Templates
                </button>
                <p tw="text-xs text-gray-500">
                  or{" "}
                  <Link tw="underline text-gray-500" to="/invoices/recurring-templates/deleted">
                    deleted
                  </Link>
                </p>
              </div>
              <div>
                <span tw="text-gray-500">Items per page:</span>
                <PaginationFooter filterProps={[filter, setFilter]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

