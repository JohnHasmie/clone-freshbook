import {
  CaretDownOutlined,
  CloseOutlined,
  DownOutlined,
  EditOutlined,
  HddOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusCircleFilled,
  PlusOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Menu,
  notification,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardClient from "../../components/CardClient";
import Photo from "../../assets/images/mask-group.svg";
import AllClientTabs from "../../components/ClientsComponent/AllClientTabs";
import TableCustom from "../../components/Table/index";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import FormAdvanceSearch from "./FormAdvanceSearch";
import TabHome from "./TabHome";
import PaginationFooter from "../../components/layout/PaginationFooter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot, truncate } from "../../components/Utils";
import { ModalConfirm } from "../../components/ModalConfirm.style";



export default function Clients() {
  const { Title } = Typography;
  const history = useHistory();
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();
  const [isToggle, setIsToggle] = useState(true);
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
  });
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
  const [keywordSearch, setKeywordSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");

  const queryClient = useQueryClient();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [isType, setIsType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [clientName, setClientName] = useState("");

  const onChange = (e) => {
    setSearchField({ ...searchField, [e.target.name]: e.target.value });
  };
  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
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
    if (type.client) {
      setClientName(type.client);
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
        mutationArchive.mutate(selectedRowKeys[0]);
        break;
      case "delete":
        mutation.mutate(selectedRowKeys[0]);
        break;
      default:
        setIsType("");
        break;
    }

    setIsModalOpen(false);
  };

  const handleClickChange = (open) => {
    setClicked(open);
  };

  const { data: dataClients, status } = useQuery(
    ["clients", filter],
    async (key) =>
      axios
        .get("clients", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );

  

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

  const mutationArchive = useMutation(
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
          }has been succesfully archived`,
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

  const filteredData =
    status === "success" &&
    dataClients?.data.filter((item) => {
      return (
        item.company_name
          .toLowerCase()
          .includes(searchField.company_name.toLowerCase()) ||
        item.first_name
          .toLowerCase()
          .includes(
            searchField.name
              ? searchField.name.toLocaleLowerCase()
              : searchField?.company_name.toLowerCase()
          ) ||
        item?.email.toLowerCase().includes(searchField.email.toLowerCase()) ||
        localFilter(item, keywordSearch, typeSearch)
      );
    });

  const data =
    status === "success" &&
    filteredData?.map((item) => ({
      key: item.id,
      company_name: item.company_name,
      first_name: item.first_name,
      last_name: item.last_name,
      note: "-",
      credit: "",
      total_outstanding: 2000,
    }));
const defaultFooter = () => (<div tw="text-right text-base">Total Outstanding: {data && getTotal(data?.map(x=>x.total_outstanding))} </div>);


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
        <div tw="z-50">
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
              <Tooltip placement="top" title="archive">
                <HddOutlined
                  tw="p-2"
                  onClick={() =>
                    handleModal({ key: "archive", client: record.company_name })
                  }
                />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100 ">
              <Tooltip placement="top" title="delete">
                <RestOutlined
                  tw="p-2"
                  onClick={() =>
                    handleModal({ key: "delete", client: record.company_name })
                  }
                />
              </Tooltip>
            </div>
          </div>
          <span>{`Rp. ${numberWithDot(record.total_outstanding)} IDR`}</span>
        </div>
      ),
      sorter: (a, b) => a.total_outstanding.length - b.total_outstanding.length,
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
  const bulkList = (
    <div tw="w-36">
      <Menu>
        <Menu.Item key="edit" onClick={()=>history.push(`clients/${selectedRowKeys[0]}/edit`)} disabled={selectedRowKeys.length > 1}>
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
  useEffect(() => {
    if (selectedRowKeys.length < 2) {
      const getName = data && data?.filter((x) => x.key === selectedRowKeys[0]);
      setClientName(getName[0]?.company_name);
    } else {
      setClientName("");
    }
  }, [selectedRowKeys]);
  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg mb-20">
          <TabHome />
          {isToggle ? (
            <div tw=" hidden md:block mt-20">
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
              <div tw="flex gap-5" style={{ opacity: isHover ? "0.5" : "1" }}>
                {dataClients?.data.length < 4 && (
                  <div
                    style={{
                      width: 250,
                    }}
                    onClick={() => history.push("/clients/new")}
                    tw="cursor-pointer border-2 border-dashed border-grayDefault flex w-72 rounded-md  justify-center items-center"
                  >
                    <div tw="flex flex-col">
                      <PlusOutlined tw="text-3xl text-green-400" />
                      <span tw="text-lg  font-bold">New Client</span>
                    </div>
                  </div>
                )}
                {dataClients?.data
                  ?.sort((a, b) => b.id - a.id)
                  .map((item, i) => (
                    <Link to={`/clients/${item.id}/client-detail`} key={i}>
                      <CardClient
                        title="Default size card"
                        size="small"
                        style={{
                          width: 240,
                          display: `${i > 3 && "none"}`,
                        }}
                      >
                        <div tw="flex ">
                          <img
                            src={item.avatar}
                            alt="profile-client"
                            tw="w-14 h-14 rounded-full mr-3"
                          />
                          <div tw="flex flex-col ">
                            <h3 tw="font-bold">
                              {truncate(
                                item.first_name + " " + item.last_name,
                                15
                              )}{" "}
                            </h3>
                            <p tw="text-sm">
                              {truncate(item.company_name, 18)}
                            </p>
                          </div>
                        </div>
                        <div>
                          <MailOutlined tw="mr-1" />
                          <span>{item.email}</span>
                        </div>
                        <div>
                          <PhoneOutlined tw="mr-1" />
                          <span>{item.phone}</span>
                        </div>
                      </CardClient>
                    </Link>
                  ))}
              </div>
            </div>
          ) : (
            <div tw="  hidden opacity-0 hover:opacity-100  md:block relative mt-20">
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
          <div tw="mt-20">
            <AllClientTabs />
            <div tw="grid md:flex justify-between mb-4">
              <div tw="flex items-center">
                {hasSelected ? (
                  <>
                    <span
                      onClick={() => setSelectedRowKeys([])}
                      tw="text-xl font-bold text-primary cursor-pointer"
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
                ) : (
                  <span tw="text-xl font-bold text-black">All Clients</span>
                )}
              </div>
              <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch
                  onChange={onChange}
                  name="company_name"
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                />
                <div
                  onClick={() => setIsAdvance(!isAdvance)}
                  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center w-36"
                >
                  <UnorderedListOutlined />
                  <span tw="text-xs ml-2">Advanced Search </span>
                  <CaretDownOutlined tw="ml-1" />
                </div>
              </div>
            </div>
            {isAdvance ? (
              <div tw="bg-gray-100 border-y-2 border-gray-400 p-3 mb-4">
                <FormAdvanceSearch
                  form={form}
                  setIsAdvance={setIsAdvance}
                  searchProps={[searchField, setSearchField]}
                  typeSearchProps={[typeSearch, setTypeSearch]}
                  dataClients={dataClients}
                  keywordSearchProps={[keywordSearch, setKeywordSearch]}
                />
              </div>
            ) : (
              <></>
            )}
            <ModalConfirm
              title="Confirm"
              visible={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={500}
              closable={false}
            >
              <span tw="text-lg">
                {clientName
                  ? `Are you sure you want to ${isType} ${clientName}?`
                  : `Are you sure you want to ${isType} ${selectedRowKeys.length} clients?`}
              </span>
            </ModalConfirm>
            <div className="table-responsive">
              <TableCustom
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(`/clients/${record.key}/client-detail`);
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
                <span tw="text-sm text-black font-bold">
                  1-{data.length} of {data.length}{" "}
                </span>
              </div>
              <div tw="flex flex-col items-center">
                <button
                  onClick={() => history.push("clients/archived")}
                  tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
                >
                  View Archived Clients
                </button>
                <p tw="text-xs text-gray-500">
                  or{" "}
                  <Link tw="underline text-gray-500" to="clients/deleted">
                    deleted
                  </Link>
                </p>
              </div>
              <div>
                <span tw="text-gray-500">Items per page: </span>
                <PaginationFooter filterProps={[filter, setFilter]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function localFilter(item, keywordSearch, typeSearch) {
  switch (typeSearch) {
    case "phone":
      item?.phone.toLowerCase().includes(keywordSearch.toLowerCase());
      break;
    case "address":
      item?.address.toLowerCase().includes(keywordSearch.toLowerCase());
      break;
    case "all":
      item?.address.toLowerCase().includes(keywordSearch.toLowerCase()) ||
        item?.phone.toLowerCase().includes(keywordSearch.toLowerCase());
      break;
    default:
      item?.phone.toLowerCase().includes(keywordSearch.toLowerCase());
      break;
  }
}
export function getTotal(outstanding) {
  const sum = outstanding.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return `Rp. ${numberWithDot(sum)} IDR`
}