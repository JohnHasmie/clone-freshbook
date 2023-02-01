// import {Checkbox, Table, Tooltip } from "antd";
// import React, { useState } from "react";
// import {

//   RightOutlined,
// } from "@ant-design/icons";
// import tw from "twin.macro";

// import {  useHistory } from "react-router-dom";
// import PaginationFooter from "../../components/layout/PaginationFooter";

// export default function ClientsDeleted() {
//   const history = useHistory();

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

//   const data = [
//     {
//       key: "1",
//       checkbox: "",
//       organization: "",
//       internal: "",

//       credit: item.total_credit,
//       outstanding:"",
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
//           checked={data.length !== 0 && data?.length === checked.length}  disabled={data.length === 0}
//           className="font-normal"
//           onChange={handleCheckAll}
//         />
//       ),
//       dataIndex: "checkbox",
//       key: "checkbox",
//     },
//     {
//       title: "Organization/Primary Contact",
//       dataIndex: "organization",
//       key: "organization",
//       width: "30%",
//     },
//     {
//       title: "Internal Note",
//       dataIndex: "internal",
//       key: "internal",
//       width: "30%",
//     },

//     {
//       title: "Credit",
//       key: "credit",
//       dataIndex: "credit",
//     },

//     {
//       title: "Total Outstanding",
//       key: "outstanding",
//       dataIndex: "outstanding",
//       width: "20%",
//     },
//   ];

//   return (
//     <>
//       <div tw="w-full md:w-[98%] md:mb-5">
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "24px",
//           }}
//         >
//           <div tw="flex items-center">
//             <span
//               tw="text-xl cursor-pointer font-bold text-primary"
//               onClick={() => history.push("/clients")}
//             >
//               All Clients
//             </span>
//             <RightOutlined tw=" ml-2" />
//             <span tw="text-xl font-bold text-black ml-2">Deleted</span>

//           </div>

//         </div>
//         <div className="table-responsive">
//           <Table
//             columns={columns}
//             dataSource={data}
//             pagination={false}
//             className="ant-border-space"
//           />
//         </div>
//         <div tw="flex justify-between mt-5">
//               <div>
//                 <span tw="text-sm text-black font-bold">1-{data.length-1} of {data.length-1} </span>
//               </div>

//               <div ><PaginationFooter/></div>
//             </div>

//       </div>
//     </>
//   );
// }

import {
  Button,
  Checkbox,
  Menu,
  notification,
  Popover,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  DownOutlined,
  EditOutlined,
  HddOutlined,
  RestOutlined,
  RightOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import tw from "twin.macro";

import { useHistory } from "react-router-dom";
import PaginationFooter from "../../components/layout/PaginationFooter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot } from "../../components/Utils";
import TableCustom from "../../components/Table";
import { ModalConfirm } from "../../components/ModalConfirm.style";
import TableDeleted from "../../components/TableDeleted";

export default function ClientsDeleted() {
  const history = useHistory();
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    show:"deleted"
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isType, setIsType] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientId, setClientId] = useState("");



  const { data: dataClients, status } = useQuery(
    ["clients", filter],
    async (key) =>
      axios
        .get("clients", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  const [clicked, setClicked] = useState(false);
  const queryClient = useQueryClient();

  const handleClickChange = (open) => {
    setClicked(open);
  };

  const handleOk = () => {
    if (isType === "undelete") {
      if(selectedRowKeys.length > 0){
      mutation.mutate(selectedRowKeys[0])}else{
        mutation.mutate(clientId)
      }
    } 
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleModal = (type) => {
    setIsType("undelete");
    switch (type.key) {
      case "undelete":
        setIsType("undelete");
        break;

      default:
        setIsType("");
        break;
    }
    if (type.client) {
      setClientName(type.client);
    }

    setIsModalOpen(true);
    setClicked(false);
  };
  const data =
    status === "success" &&
    dataClients?.data?.map((item) => ({
      key: item.id,
      company_name: item.company_name,
      first_name: item.first_name,
      last_name: item.last_name,
      note: item.note,
      credit: item.total_credit,
      total_outstanding: item.total_outstanding,
    }));

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    if (selectedRowKeys.length < 2) {
      const getName = data && data?.filter((x) => x.key === selectedRowKeys[0]);
      setClientName(getName[0]?.company_name);
    } else {
      setClientName("");
    }
  }, [selectedRowKeys]);
  const columns = [
    {
      title: "Organization / Primary Contact",
      dataIndex: "organization",
      key: "organization",
      render: (text, record) => (
        <div>
          <span>{record.company_name}</span>{" "}
          <p>
            {record.first_name} {record.last_name}
          </p>{" "}
        </div>
      ),
      sorter: (a, b) => a.company_name.length - b.company_name.length,
    },
    {
      title: "Internal Note",
      dataIndex: "note",
      key: "note",

      sorter: (a, b) => a.note - b.note,
    },

    {
      title: "Credit",
      key: "credit",
      dataIndex: "credit",
      sorter: (a, b) => a.credit - b.credit,
    },

    {
      title: "Total Outstanding",
      key: "total_outstanding",
      dataIndex: "total_outstanding",
      align: "right",
      render: (text, record) => (
        <div>
          <span>{record.total_outstanding}</span>
        </div>
      ),
      sorter: (a, b) => a.total_outstanding.length - b.total_outstanding.length,
    },
  ];
  const bulkList = (
    <div>
      <Menu>
        <Menu.Item key="undelete" onClick={handleModal}>
          <div>
            <RestOutlined />
            <span>Undelete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

  const hasSelected = selectedRowKeys.length > 0;

  const mutation = useMutation(
    async (data) => {
      return axios.post(`clients/restore/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("clients");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `${
            clientName
              ? clientName
              : `The selected ${selectedRowKeys.length} clients`
          }has been succesfully undeleted`,
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
            {!hasSelected ? (
              <>
                <span
                  tw="text-xl cursor-pointer font-bold text-primary"
                  onClick={() => history.push("/clients")}
                >
                  All Clients
                </span>
                <RightOutlined tw=" ml-2" />
                <span tw="text-xl font-bold text-black ml-2">Deleted</span>
              </>
            ) : (
              <>
                <span
                  tw="text-xl cursor-pointer font-bold text-primary"
                  onClick={() => setSelectedRowKeys([])}
                >
                  Clients
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
            )}
          </div>
        </div>
        <ModalConfirm
          title="Confirm"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={500}
          closable={false}
        >
          <span tw="text-lg">
            {localConfirm(clientName, isType, selectedRowKeys)}
          </span>
        </ModalConfirm>
        <div className="table-responsive">
          <TableDeleted
            onRow={(record, rowIndex) => {
              return {
                onClick: (event) => {
                  setClientId(record.key)
                  handleModal({ key: "undelete", client: record.company_name })
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
        <div tw="flex justify-between mt-5">
          <div>
            <span tw="text-sm text-black font-bold">
              1-{data.length - 1} of {data.length - 1}{" "}
            </span>
          </div>

          <div>
          <span tw="text-gray-500">Items per page: </span>

            <PaginationFooter filterProps={[filter, setFilter]} />
          </div>
        </div>
      </div>
    </>
  );
}
export function localConfirm(clientName, isType, selectedRowKeys) {
  let text = "";
  if (clientName) {
    switch (isType) {
      case "undelete":
        text = `${clientName} is deleted and cant be viewed or edited. Would you like to undelete them?`;
        break;

      default:
        text = "";
        break;
    }
  } else {
    switch (isType) {
      case "undelete":
        text = `${selectedRowKeys.length} is deleted and cant be viewed or edited. Would you like to undelete them?`;
        break;

      default:
        text = "";
        break;
    }
  }
  return text;
}
