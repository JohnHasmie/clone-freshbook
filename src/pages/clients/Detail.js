import { Button, Menu, Modal, notification, Popover, Tooltip } from "antd";
import React, { useContext, useState } from "react";

import ClientInfo from "../../components/ClientsComponent/ClientInfo";
import ClientTabs from "../../components/ClientsComponent/ClientTabs";
import {
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  RestOutlined,
  RightOutlined,
} from "@ant-design/icons";

import tw from "twin.macro";
import TableCustom from "../../components/Table";
import FormAddContact from "./FormAddContact";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import AppContext from "../../components/context/AppContext";
import { ModalConfirm } from "../../components/ModalConfirm.style";

export default function Detail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [contactId, setContactId] = useState('');
  const [contactForm, setContactForm] = useState('');



  const { clientId } = useParams();
  const { globalDetailClient } = useContext(AppContext);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const queryClient = useQueryClient();

  const showModal = (e,record) => {
    e.stopPropagation();
    setContactForm(record)
    setIsModalOpen(true);
    setClicked(false);
  };
  const handleOk = (type) => {
    if(type === "confirm"){
      if(contactId){

        mutation.mutate(contactId)
      }else{
        mutation.mutate(selectedRowKeys[0])

      }
      setIsModalConfirm(false)
    }else{
    setIsModalOpen(false);}
  };

  const handleCancel = (type) => {
    if(type === "confirm"){
      setIsModalConfirm(false)
    }else{
    setIsModalOpen(false);}
  };
  const { data: dataContacts, status } = useQuery(
    ["contacts-listing"],
    async (key) =>
      axios
        .get(`contacts/${clientId}`, {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  const handleModal = (e,key) => {
    e.stopPropagation()
    setContactId(key)
    setIsModalConfirm(true);
    setClicked(false);
  };

  const bulkList = (
    <div /* tw="border border-[#7f8c9f]" */>
      <Menu>
        <Menu.Item key="delete" onClick={()=>handleModal("")}>
          <div>
            <RestOutlined />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

  const mutation = useMutation(
    async (data) => {
      return axios.delete(`contacts/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("contacts-listing");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `Secondary contact(s) has been deleted`,
          placement: "topLeft",
        });
      },
      onError: (error) => {
        switch (error?.response?.status) {
          case 422:
            notification.error({
              message: `Invalid input`,
              placement: "topLeft",
            });
            break;
            case 500:
              notification.error({
                message: `Internal Server Error`,
                placement: "topLeft",
              });
              break;
        
          default:
            notification.error({
              message: `An Error Occurred Please Try Again Later`,
              placement: "topLeft",
            });
            break;
        }
      },
    }
  );

  const data =
    status === "success" &&
    dataContacts?.clients?.data?.map((item) => ({
      key: item.id,

      name: item.first_name + " " + item.last_name,
      first_name:item.first_name,
      last_name:item.last_name,
      email: item.email,

      phone_number_1: item.phone_1,
      phone_number_2: item.phone_2,
    }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      width: "30%",
    },

    {
      title: "Phone Number 1 / Phone Number 2",
      key: "phone_number",
      dataIndex: "phone_number",
      render: (text, record) => (
        <div>
          <div
            className="isVisible"
            tw="absolute bottom-14 right-0 flex invisible rounded-full bg-white shadow-sm border border-gray-200"
          >
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="edit" onClick={(e)=>showModal(e,record)} >
                <EditOutlined tw="p-2" />
              </Tooltip>
            </div>

            <div tw="hover:bg-gray-100 border-l border-gray-200">
              <Tooltip placement="top" title="delete">
                <RestOutlined tw="p-2" onClick={(e)=>handleModal(e,record.key)} />
              </Tooltip>
            </div>
          </div>
          <span>{record.phone_number_1}</span>{" "}
          <p tw="text-xs">{record.phone_number_2}</p>{" "}
        </div>
      ),
      sorter: (a, b) => a.phone_number_1.length - b.phone_number_1.length,
      align: "right",
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleClickChange = (open) => {
    setClicked(open);
  };

  return (
    <>
      <div className="layout-content">
        <ClientInfo clientId={clientId} />
        <div tw="max-w-screen-xl mr-5 mb-10 mt-20">
          <ClientTabs />
          <div tw="flex items-center ">
            {hasSelected ? (
              <>
                <span
                  tw="text-xl font-bold text-primary cursor-pointer"
                  onClick={() => setSelectedRowKeys([])}
                >
                  Contacts for {globalDetailClient?.company_name}
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
                  Contacts for {globalDetailClient?.company_name}
                </span>
                <PlusOutlined
                  onClick={showModal}
                  tw="ml-2 text-white bg-success text-xl flex items-center rounded-md font-bold py-1.5 px-2 cursor-pointer "
                />
              </>
            )}
          </div>

          <Modal
            footer={null}
            visible={isModalOpen}
            onOk={()=>handleOk('modal')}
            onCancel={()=>handleCancel('modal')}
            width={800}
          >
            <FormAddContact clientId={clientId} handleOk={handleOk} data={contactForm} />
          </Modal>
          <ModalConfirm
              title="Confirm"
              visible={isModalConfirm}
              onOk={()=>handleOk('confirm')}
              onCancel={()=>handleCancel('confirm')}
              width={500}
              closable={false}
            >
              <span tw="text-lg">
              Deleting contacts cannot be undone. Are you sure you want to delete {selectedRowKeys.length > 1 ? "these contacts" :"this contact" } ?
              </span>
            </ModalConfirm>
          <div className="table-responsive">
            <TableCustom
              onRow={(record, rowIndex) => {
                return {
                  onClick: (e) => showModal(e,record),
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
                1-{data?.length} of {data?.length}{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
