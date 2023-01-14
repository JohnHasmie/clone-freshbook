import { Menu, Modal, notification, Popover, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Button } from "antd";
import InputSearch from "../../components/InputSearch";
import {
  DownOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  HddOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot } from "../../components/Utils";
import { Link, NavLink, useHistory } from "react-router-dom";
import tw from "twin.macro";
import EditItem from "./EditItem";
import { ModalConfirm } from "../../components/ModalConfirm.style";
import TableCustom from '../../components/Table/index';

const Items = () => {
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [clickedRow, setClickedRow] = useState(false);

  const [clickedId, setClickedId] = useState("");
  const [clientId, setClientId] = useState("");

  const [marginResponsive, setMarginResponsive] = useState("");

  const [searchField, setSearchField] = useState("");
  const history = useHistory();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isType, setIsType] = useState('');

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    const dataArchive={
      ids:selectedRowKeys,
      client_id:clientId,
      status:"archive"
    }
    if(isType === "delete"){
    mutation.mutate(selectedRowKeys[0]);}else{
      mutationArchive.mutate(dataArchive)
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Name / Description",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div>
          <span>{record.name}</span> <p>{record.desc}</p>{" "}
        </div>
      ),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Current Stock",
      dataIndex: "current",
      key: "current",
      render: (text, record) => (
        <>
          <Popover
            placement="bottom"
            content={
              <EditItem
                query="items-by-client"
                id={record.key}
                hide={hideClickRow}
                data={record}
                clientId={record.client_id}
              />
            }
            trigger="click"
            visible={clickedRow && clickedId === record.key}
            onVisibleChange={() => handleClickRowChange(record.key, record.i)}
          >
            <span>{text}</span>
          </Popover>
        </>
      ),
      sorter: (a, b) => a.current - b.current,
    },

    {
      title: "Rate",
      key: "rate",
      dataIndex: "rate",
      render: (text, record) => (
        <div>
         {numberWithDot(record.rate)}
        </div>
      ),
      sorter: (a, b) => a.rate.length - b.rate.length,
    },
  ];

  const { data: dataItems, status } = useQuery(
    ["items-by-client", filter],
    async (key) =>
      axios
        .get("items", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );

  const filteredData =
    status === "success" &&
    dataItems?.data?.data.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchField.toLowerCase()) ||
        item.description.toLowerCase().includes(searchField.toLowerCase()) ||
        String(item.rate).toLowerCase().includes(searchField.toLowerCase())
      );
    });
  const data =
    status === "success" &&
    filteredData?.map((item, i) => ({
      key: item.id,
      i: i,
      name: item.name,
      desc: item.description,
      current: item.qty,
      rate: item.rate,
      client_id:item.client_id
    }));
   // function for archive, waiting from backend
   const mutationArchive = useMutation(
    async (data) => {
      return axios.put(`items/status`,data).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("items-by-client");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `The selected items has been archived`,
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
      return axios.delete(`items/${clientId}/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("items-by-client");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `The selected items has been deleted`,
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
  const handleModal = (type) => {
    if(type === "delete"){
      setIsType('delete')}else{
        setIsType('archive')
      }
    showModal();
    hide();
  };

  const onSelectChange = (newSelectedRowKeys, x, y) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setClientId(x[0].client_id)
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleClickChange = (open) => {
    setClicked(open);
  };

  const handleClickRowChange = (id, index) => {
    if (clickedRow === false) {
      setClickedRow(true);
      setClickedId(id);
      setMarginResponsive("400px")
    } else {
      setClickedRow(false);
      setClickedId("");
      setMarginResponsive("")
    }
  };
  const hideClickRow = () => {
    setClickedRow(false);
  };
  const hide = () => {
    setClicked(false);
  };
  const hasSelected = selectedRowKeys.length > 0;
  const bulkList = (
    <div tw="border border-[#7f8c9f]">
      <Menu>
        <Menu.Item onClick={()=>handleModal("archive")}>
          <div>
            <HddOutlined />
            <span>Archive</span>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div onClick={()=>handleModal("delete")}>
            <RestOutlined />
            <span>Delete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );



  return (
    <>
      <div tw="w-full md:w-[98%]" style={{ marginBottom: marginResponsive }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div tw="flex items-center">
            <span tw="text-xl font-bold text-black">
              Items
              <Tooltip
                placement="top"
                title="Items can be added to invoice to bill your clients"
              >
                <ExclamationCircleOutlined tw="mx-1 text-xs align-top" />
              </Tooltip>
            </span>
            {hasSelected && (
              <>
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
          <InputSearch
            onChange={(e) => setSearchField(e.target.value)}
            placeholder="Search"
            prefix={<SearchOutlined />}
          />
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
            onRow={(record, rowIndex) => {
              return {
           
                onDoubleClick: (event) => {
                  setClickedRow(!clickedRow);
                  setClickedId(record.key);
                  setMarginResponsive("400px")
                
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
              1-{filteredData.length} of {filteredData.length}{" "}
            </span>
          </div>
          <div tw="flex flex-col items-center">
            <button
              onClick={() => history.push("/items/archived")}
              tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
            >
              View Archived Items
            </button>
            <p tw="text-xs text-gray-500">
              or{" "}
              <Link tw="underline text-gray-500" to="/items/deleted">
                deleted
              </Link>
            </p>
          </div>
          <div tw="invisible">hide</div>
        </div>
      </div>
    </>
  );
};
export default Items;
