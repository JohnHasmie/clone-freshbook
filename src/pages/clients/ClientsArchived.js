import {Button, Checkbox, Menu, notification, Popover, Table, Tooltip } from "antd";
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

import {  useHistory } from "react-router-dom";
import PaginationFooter from "../../components/layout/PaginationFooter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot } from "../../components/Utils";
import TableCustom from "../../components/Table";
import { ModalConfirm } from "../../components/ModalConfirm.style";


export default function ClientsArchived() {
  const history = useHistory();
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    status:"archive"
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isType, setIsType] = useState('');
  const [clientName, setClientName] = useState("");
  const [isClientId, setIsClientId] = useState("");


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
  const handleModalTooltip = (e, id, client, type) => {
    e.stopPropagation();
    setClientName(client);
    setIsClientId(id);
    if (type === "delete") {
      setIsType("delete");
    } else {
      setIsType("unarchive");
    }
    setIsModalOpen(true);
    setClicked(false);
  };

  const handleOk = () => {
    switch (isType) {
      case "unarchive":
        if (selectedRowKeys.length === 0) {
          mutationUnarchive.mutate({ ids: [isClientId], status: "published" });
        } else {
          mutationUnarchive.mutate({ ids: selectedRowKeys, status: "published" });
        }
        break;
      case "delete":
        if (isClientId) {
          mutation.mutate(isClientId);
        } else {
          if (selectedRowKeys.length > 1) {
            console.log({ ids: selectedRowKeys });
            mutationDeleteBatch.mutate({ data: { ids: selectedRowKeys } });
          } else {
            mutation.mutate(selectedRowKeys[0]);
          }
        }
        break;
      default:
        setIsType("");
        break;
    }

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleModal = (type) => {
    setIsType("unarchive");
    switch (type.key) {
      case "unarchive":
        setIsType("unarchive");
        break;
      case "delete":
        setIsType("delete");
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
      total_outstanding:     item.total_outstanding,
      
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
          <div
            className="isVisible"
            tw="absolute bottom-14 right-0 flex invisible rounded-full bg-white shadow-sm border border-gray-200"
          >
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="edit">
                <EditOutlined tw="p-2" onClick={(e)=>{
                  e.stopPropagation()
                  history.push(`/clients/${record.key}/edit`)}}/>
                
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
              <Tooltip placement="top" title="unarchive">
                <UndoOutlined
                  tw="p-2"
                  onClick={(e) =>
                    handleModalTooltip(
                      e,
                      record.key,
                      record.company_name,
                      "unarchive"
                    )
                  }
                />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="delete">
                <RestOutlined
                  tw="p-2"
                  onClick={(e) =>
                    handleModalTooltip(
                      e,
                      record.key,
                      record.company_name,
                      "delete"
                    )
                  }
                />
              </Tooltip>
            </div>
          </div>
          <span>{record.total_outstanding}</span>
        </div>
      ),
      sorter: (a, b) => a.total_outstanding.length - b.total_outstanding.length,
    },
  ];
  const bulkList = (
    <div /* tw="border border-[#7f8c9f]" */>
      
      <Menu>
      <Menu.Item key="edit" onClick={()=>history.push(`clients/${selectedRowKeys[0]}/edit`)} disabled={selectedRowKeys.length > 1}>
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>
        <Menu.Item key="unarchive" onClick={handleModal}>
          <div  >
          <UndoOutlined />
            <span>Unarchive</span>
          </div>
        </Menu.Item>

        <Menu.Item key="delete" onClick={handleModal}>
          <div>
            <RestOutlined />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

  const hasSelected = selectedRowKeys.length > 0;

  const mutation = useMutation(
    async (data) => {
      return axios.delete(`clients/${data}`).then((res) => res.data);
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
          }has been succesfully deleted`,
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

  const mutationDeleteBatch = useMutation(
    async (data) => {
      return axios.delete(`clients/batch`, data).then((res) => res.data);
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
          }has been succesfully deleted`,
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

  const mutationUnarchive = useMutation(
    async (data) => {
      return axios.put(`clients/status`,data).then((res) => res.data);
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
          }has been succesfully unarchived`,
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
            <span tw="text-xl font-bold text-black ml-2">Archived</span>
            </>
          ):
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
            }
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
            {localConfirm(clientName,isType,selectedRowKeys)}
               
              </span>
        </ModalConfirm>
        <div className="table-responsive">
              <TableCustom
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: (event) => {
                  history.push(`/clients/${record.key}/client-detail`);
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
                <span tw="text-sm text-black font-bold">1-{data.length-1} of {data.length-1} </span>
              </div>
           
              <div >
              <span tw="text-gray-500">Items per page: </span>
                
                <PaginationFooter filterProps={[filter,setFilter]}/></div>
            </div>
      
      </div>
    </>
  );
}
export function localConfirm(clientName,isType,selectedRowKeys) {
  let text=""
  if(clientName){
    switch (isType) {
      case "delete":
        text=`Are you sure you want to delete ${clientName}?`
        break;
      case "unarchive":
        text=`${clientName} is archived. Would you like to unarchive them?`
        break;
    
      default:
        text=""
        break;
    }

  }else{
    switch (isType) {
      case "delete":
        text=`Are you sure you want to delete ${selectedRowKeys.length} clients?`
        break;
      case "unarchive":
        text=`${selectedRowKeys.length} is archived. Would you like to unarchive them?`
        break;
    
      default:
        text=""
        break;
    }
  }
 return text
}