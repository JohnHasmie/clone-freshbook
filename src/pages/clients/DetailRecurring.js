// import {
//   Button,
//   Checkbox,
//   Menu,
//   Popover,
//   Table,
//   Tooltip,
//   Typography,
// } from "antd";
// import React, { useState } from "react";

// import { Link, useHistory, useParams } from "react-router-dom";
// import ClientInfo from "../../components/ClientsComponent/ClientInfo";
// import ClientTabs from "../../components/ClientsComponent/ClientTabs";
// import {
//   AppstoreAddOutlined,
//   CopyOutlined,
//   DollarCircleOutlined,
//   DollarOutlined,
//   DownOutlined,
//   EditOutlined,
//   EllipsisOutlined,
//   FieldTimeOutlined,
//   FileDoneOutlined,
//   HddOutlined,
//   PieChartOutlined,
//   PlusOutlined,
//   RestOutlined,
//   RightOutlined,
//   SnippetsOutlined,
//   SyncOutlined,
// } from "@ant-design/icons";
// import CardReport from "../../components/CardReport";
// import tw from "twin.macro";
// import TableCustom from "../../components/Table";

// export default function DetailRecurring() {
//   const { Title } = Typography;
//   const history=useHistory()

//   const [checked, setChecked] = useState([]);
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
//   const bulkList = (
//     <div /* tw="border border-[#7f8c9f]" */>
//       <Menu>
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

  // const data = [
  //   {
  //     key: "1",
  //     checkbox: (
  //       <Checkbox
  //         className="font-normal"
  //         value={"1"}
  //         checked={checked.includes("1")}
  //         onChange={(e) => handleCheck(e.target.value)}
  //       />
  //     ),
  //     client: <span>John Doe</span>,
  //     last_issued: <span tw="text-primary">28/11/2022</span>,

  //     frequency: (
  //       <div>
  //         <span>Every Month</span>
  //         <p tw="text-gray-400 text-sm">Infinite</p>
  //       </div>
  //     ),
  //     amount_status: (
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
  //           <div tw="hover:bg-gray-100 ">
  //             <Tooltip placement="top" title="delete">
  //               <RestOutlined tw="px-2 py-1" />
  //             </Tooltip>
  //           </div>
        
  //         </div>
  //         <h3>Rp 0.00 IDR</h3>
  //         <span tw="bg-green-400 rounded p-1">Auto-Sent</span>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "2",
  //     checkbox: (
  //       <Checkbox
  //         className="font-normal"
  //         value={2}
  //         checked={checked.includes("2")}
  //         onChange={(e) => handleCheck(e.target.value)}
  //       />
  //     ),
  //     client: <span>John Doe Ahmadi</span>,
  //     last_issued: <span>ahmadi@gmail.com</span>,

  //     frequency: (
  //       <div>
  //         <span>0888</span>
  //         <p tw="text-gray-400 text-sm">0999</p>
  //       </div>
  //     ),
  //     amount_status: (
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
  //           <div tw="hover:bg-gray-100 ">
  //             <Tooltip placement="top" title="delete">
  //               <RestOutlined tw="px-2 py-1" />
  //             </Tooltip>
  //           </div>
        
  //         </div>
  //         <h3>Rp 600.00 IDR</h3>
  //         <span tw="bg-green-400 rounded p-1">Paid</span>
  //       </div>
  //     ),
  //   },
  // ];

//   const handleCheckAll = () => {
//     const all = data?.map((item) => item.key);
//     if (data?.length === checked.length) {
//       setChecked([]);
//     } else {
//       setChecked(all);
//     }
//   };
  // const columns = [
  //   {
  //     title: (
  //       <Checkbox
  //         checked={data.length !== 0 && data?.length === checked.length}  disabled={data.length === 0}
  //         className="font-normal"
  //         onChange={handleCheckAll}
  //       />
  //     ),
  //     dataIndex: "checkbox",
  //     key: "checkbox",
  //     width: "5%",
  //   },
  //   {
  //     title: "Client",
  //     dataIndex: "client",
  //     key: "client",
  //     width: "30%",
  //   },
  //   {
  //     title: "Last Issued",
  //     dataIndex: "last_issued",
  //     key: "last_issued",
  //     width: "30%",
  //   },

  //   {
  //     title: "Frequency /Duration",
  //     key: "frequency",
  //     dataIndex: "frequency",
  //     width: "20%",
  //   },
  //   {
  //     title: "Amount /Status",
  //     key: "amount_status",
  //     dataIndex: "amount_status",
  //     width: "20%",
  //   },
  // ];

//   return (
//     <>
//       <div className="layout-content">
//         <ClientInfo />
//         <div tw="max-w-screen-xl mr-5 mb-10 mt-20">
//           <ClientTabs />
//           <div tw="flex items-end ">
//             <span tw="text-xl font-bold text-black">
//               Recurring Templates for Sutton Rowland Inc{" "}
//             </span>
//             {checked.length > 0 ? (
//               <>
//                 <RightOutlined tw=" ml-2" />
//                 <span tw="text-xl font-bold text-black ml-2">Selected</span>
//                 <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
//                   {checked.length}
//                 </span>
//                 <Popover placement="bottom" content={bulkList} trigger="click">
//                   <div className="flex items-center justify-center">
//                     <Button>
//                       <span tw="mr-2">Bulk Actions</span>
//                       <DownOutlined />
//                     </Button>
//                   </div>
//                 </Popover>
//               </>
//             ) : (
//               <PlusOutlined onClick={() => history.push("/recurring-template/new")} tw="ml-2 text-white bg-success text-xl flex items-center rounded-md font-bold py-1.5 px-2 cursor-pointer " />
//             )}
//           </div>
//           <div className="table-responsive">
//             <TableCustom
//               columns={columns}
//               dataSource={data}
//               pagination={false}
//               className="ant-border-space"
//             />
//           </div>
//           <div tw="flex justify-between mt-5">
//             <div>
//               <span tw="text-sm text-black font-bold">
//                 1-{data?.length} of {data?.length}{" "}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





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
import { numberWithDot } from "../../components/Utils";

export default function DetailRecurring() {
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
      <Menu.Item key="edit" /* onClick={()=>history.push(`clients/${selectedRowKeys[0]}/edit`)} */ disabled={selectedRowKeys.length > 1}>
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>
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
     
          invoice_number:"0989",
          client:"Abc Inc",
          last_issued:"28/11/2022",
          frequency:"Every Month",
          duration: "Infinit",
          amount:2000,
          status:"auto-sent"
    
        
        }
      ];


      const columns = [
      
        {
          title: "Client",
          dataIndex: "client",
          key: "client",
          sorter: (a, b) => a.client.length - b.client.length,
          
        },
        {
          title: "Last Issued",
          dataIndex: "last_issued",
          key: "last_issued",
          sorter: (a, b) => a.last_issued.length - b.last_issued.length,
          
        },
    
        {
          title: "Frequency / Duration",
          key: "frequency",
          dataIndex: "frequency",
          render: (text, record) => (
            <div>
              <span>{record.frequency}</span>{" "}
              <p tw="text-xs">
                {record.duration} 
              </p>{" "}
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
                <div tw="hover:bg-gray-100 hover:rounded-l-full  border-r border-gray-200 ">
                  <Tooltip placement="top" title="edit">
                    <EditOutlined tw="p-2  " />
                  </Tooltip>
                </div>             
              
                <div tw="hover:bg-gray-100  hover:rounded-r-full ">
                  <Tooltip placement="top" title="Delete">
                    <RestOutlined tw="text-xs p-2" />
                  </Tooltip>
                </div>
              </div>
              <span>Rp. {numberWithDot(record.amount)} IDR</span>{" "}
              <span tw="bg-green-100 text-xs rounded p-1 ml-auto ">{record.status} </span>
             
            </div>
          ),
          sorter: (a, b) => a.amount - b.amount,
          align:'right'
        },
      ];
  // const columns = [
   
  //   {
  //     title: "Client / Invoice Number",
  //     dataIndex: "invoice_number",
  //     key: "invoice_number",
  //     render: (text, record) => (
  //       <div>
  //         <span>{record.company_name}</span>{" "}
  //         <p tw="text-xs">
  //           {record.invoice_number} 
  //         </p>{" "}
  //       </div>
  //     ),
  //     sorter: (a, b) => a.company_name.length - b.company_name.length,
  //   },
  //   {
  //     title: "Description",
  //     dataIndex: "description",
  //     key: "description",
  //     sorter: (a, b) => a.description.length - b.description.length,

  //   },

  //   {
  //     title: "Issued Date /Due Date",
  //     key: "issued_due_date",
  //     dataIndex: "issued_due_date",
  //     render: (text, record) => (
  //       <div>
  //         <span>{record.date}</span>{" "}
  //         <p tw="text-xs">
  //           {record.due_date} 
  //         </p>{" "}
  //       </div>
  //     ),
  //     sorter: (a, b) => a.date.length - b.date.length,
  //   },
  //   {
  //     title: "Amount /Status",
  //     key: "amount",
  //     dataIndex: "amount",
  //     render: (text, record) => (
  //       <div tw="grid">
  //            <div
  //           className="isVisible"
  //           tw="absolute bottom-16 right-6 flex invisible rounded-full bg-white shadow-sm border border-gray-200  "
  //         >
  //           <div tw="hover:bg-gray-100 hover:rounded-l-full ">
  //             <Tooltip placement="top" title="edit">
  //               <EditOutlined tw="p-2  " />
  //             </Tooltip>
  //           </div>

  //           <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
  //             <Tooltip placement="top" title="duplicate">
  //               <CopyOutlined tw="p-2" />
  //             </Tooltip>
  //           </div>
  //           <div tw="hover:bg-gray-100   border-r border-gray-200 ">
  //             <Tooltip placement="top" title="add payment">
  //               <DollarOutlined tw="p-2 " />
  //             </Tooltip>
  //           </div>
  //           <div tw="hover:bg-gray-100  hover:rounded-r-full ">
  //             <Tooltip placement="top" title="More">
  //               <EllipsisOutlined tw="text-xs p-2" />
  //             </Tooltip>
  //           </div>
  //         </div>
  //         <span>{record.amount}</span>{" "}
  //         <span tw="bg-orange-400 text-xs rounded p-1 ml-auto ">{record.status} </span>
         
  //       </div>
  //     ),
  //     sorter: (a, b) => a.amount - b.amount,
  //     align:'right'
  //   },
  // ];

 
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
                  Recurring Templates for {globalDetailClient?.company_name}
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
                  Recurring Templates for {globalDetailClient?.company_name}
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
