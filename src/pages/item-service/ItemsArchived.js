import { Checkbox, Menu, notification, Popover, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { Button } from "antd";
import Search from "antd/lib/transfer/search";
import InputSearch from "../../components/InputSearch";
import { DownOutlined, HddOutlined, RestOutlined, RightOutlined, SearchOutlined, UndoOutlined } from "@ant-design/icons";
import tw from "twin.macro";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot } from "../../components/Utils";
import { Link, useHistory } from "react-router-dom";
import PaginationFooter from "../../components/layout/PaginationFooter";
import EditItem from "./EditItem";
import { ModalConfirm } from "../../components/ModalConfirm.style";

const { Title } = Typography;

export default function ItemsArchived() {
  const history = useHistory();

  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    show:"archive"
  });
  const queryClient = useQueryClient();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [clickedRow, setClickedRow] = useState(false);
  const [isType, setIsType] = useState('');
  const [clientId, setClientId] = useState("");

  
  const [clickedId, setClickedId] = useState("");
  const [checkIndex, setCheckIndex] = useState(0);
  const [marginResponsive, setMarginResponsive] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModal = (type) => {
    if(type === "delete"){
      setIsType('delete')}else{
        setIsType('unarchive')
      }
    showModal();
    hide();
  };

  const onSelectChange = (newSelectedRowKeys, x, y) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log(x,"x");
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
      setCheckIndex(index);
    } else {
      setClickedRow(false);
      setClickedId("");
      setCheckIndex("");
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
        <Menu.Item>
          <div  onClick={()=>handleModal("unarchive")}>
          <UndoOutlined />
            <span>Unarchive</span>
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
  const handleOk = () => {
    const dataArchive={
      ids:selectedRowKeys,
      client_id:clientId,
      status:"published"
    }
    if(isType === "delete"){
    mutation.mutate(selectedRowKeys[0]);}else{
      mutationUnarchive.mutate(dataArchive)
    }
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { data: dataItems, status } = useQuery(
    ["items-archived", filter],
    async (key) =>
      axios
        .get("items", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );

  // function for get items archived, waiting data from backend
  const data =
    status === "success" &&
    dataItems?.data?.data?.map((item, i) => ({
      key: item.id,
      i: i,
      name: item.name,
      desc: item.description,
      current: item.qty,
      rate: item.rate,
      client_id:item.client_id
    }));

    // function for unarchive, waiting from backend
    const mutationUnarchive = useMutation(
      async (data) => {
        return axios.put(`items/status`,data).then((res) => res.data);
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            queryClient.invalidateQueries("items-archived");
          }, 500);
          setSelectedRowKeys([]);
          notification.success({
            message: `The selected items has been unarchived`,
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
          queryClient.invalidateQueries("items-archived");
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
                query="items-archived"
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
  // useEffect(() => {
  //   if (dataItems?.data?.data.length < 3 && clickedRow) {
  //     setMarginResponsive("400px");
  //   } else if (checkIndex === dataItems?.data?.data.length - 1) {
  //     setMarginResponsive("400px");
  //   } else {
  //     if (!clickedRow) {
  //       setMarginResponsive("");
  //     }
  //   }
  // }, [dataItems?.data?.data, checkIndex, clickedRow]);


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
            <span
              tw="text-xl cursor-pointer font-bold text-primary"
              onClick={() => history.push("/items")}
            >
              Items
            </span>
            <RightOutlined tw=" ml-2" />
            <span tw="text-xl font-bold text-black ml-2">Archived</span>
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
        </div>
        <ModalConfirm
          title="Confirm"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={500}
          closable={false}
        >
          <span tw="text-lg">{isType === "delete" ? "Are you sure you want to delete this?" : "This is archived. Would you like to unarchive it?"}</span>
        </ModalConfirm>
        <div className="table-responsive">
          <Table
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
              1-{data.length} of {data.length}{" "}
            </span>
          </div>

          {/* <div>
            <PaginationFooter />
          </div> */}
        </div>
      </div>
    </>
  );
}
