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
import _ from "lodash";

import {
  Button,
  Form,
  Menu,
  notification,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useRef, useEffect, useState } from "react";
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

export default function ClientsOverdue() {
  const { Title } = Typography;
  const history = useHistory();
  const [isAdvance, setIsAdvance] = useState(false);
  const [isToggle, setIsToggle] = useState(true);
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    status: "published",
    company_name: "",
    email: "",
    keyword: "",
    contact_name: "",
    type: "all",
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
  const [isClientId, setIsClientId] = useState("");
  const [filterOverdue, setFilterOverdue] = useState({
    currency: "USD",
  });
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

    if (type.client && selectedRowKeys.length < 2) {
      setClientName(type.client);
    }

    setIsModalOpen(true);
    setClicked(false);
  };
  const handleModalTooltip = (e, id, client, type) => {
    e.stopPropagation();
    setClientName(client);
    setIsClientId(id);
    if (type === "delete") {
      setIsType("delete");
    } else {
      setIsType("archive");
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
          mutationArchive.mutate({ ids: [isClientId], status: "archive" });
        } else {
          mutationArchive.mutate({ ids: selectedRowKeys, status: "archive" });
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

  const { data: dataOverdue, status: statusOverdue } = useQuery(
    ["overdue-listing", filterOverdue],
    async (key) =>
      axios
        .get(`clients/outstanding-income`, {
          params: key.queryKey[1],
        })
        .then((res) => res.data?.data)
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
        setIsClientId("");
        notification.success({
          message: `${
            clientName
              ? clientName
              : `The selected ${selectedRowKeys.length} clients`
          } has been succesfully deleted`,
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
          } has been succesfully deleted`,
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
      return axios.put(`clients/status`, data).then((res) => res.data);
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
          } has been succesfully archived`,
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
      return item?.company_name
        .toLowerCase()
        .includes(searchField.company_name.toLowerCase());
    });

  const data =
    status === "success" &&
    dataClients?.data?.map((item) => ({
      key: item?.id,
      company_name: item?.company_name,
      first_name: item?.first_name,
      last_name: item?.last_name,
      note: "-",
      credit: "",
      total_outstanding: "2000",
    }));
  // const data =
  // statusOverdue === "success" &&
  // dataOverdue?.outstanding_invoices?.invoices?.map((item) => ({
  //   key: item?.id,
  //   company_name: item?.client?.company_name,
  //   first_name: item?.client?.first_name,
  //   last_name: item?.client?.last_name,
  //   note: "-",
  //   credit: "",
  //   total_outstanding: item?.total,
  // }));
  const defaultFooter = () => (
    <div tw="text-right text-base">
      Total Overdue: {filterOverdue.currency === "USD" ? "$" : "£"}
      {data &&
        getTotal(
          data?.map((x) => {
            const splitAmount = x.total_outstanding.split(".");
            return parseInt(splitAmount[0]);
          })
        )}
      .00
    </div>
  );

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
                <EditOutlined
                  tw="p-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/clients/${record.key}/edit`);
                  }}
                />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
              <Tooltip placement="top" title="archive">
                <HddOutlined
                  tw="p-2"
                  onClick={(e) =>
                    handleModalTooltip(
                      e,
                      record.key,
                      record.company_name,
                      "archive"
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
          <span>{`${
            filterOverdue.currency === "USD" ? "$" : "£"
          } ${numberWithDot(record.total_outstanding)}`}</span>
        </div>
      ),
      sorter: (a, b) => a.total_outstanding.length - b.total_outstanding.length,
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const setSearchValue = useRef(
    _.debounce((value) => {
      setFilter({
        ...filter,
        company_name: value,
      });
    }, 1000)
  );
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

          <div tw="mt-20">
            <div tw="grid md:flex  mb-4">
              <div tw="flex items-center">
                {hasSelected ? (
                  <>
                    <span
                      onClick={() => history.push("/clients")}
                      tw="text-xl font-bold text-primary cursor-pointer"
                    >
                      All Clients
                    </span>

                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">
                      {" "}
                      Clients with Overdue Invoices
                    </span>
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
                      onClick={() => history.push("/clients")}
                      tw="text-xl font-bold text-primary"
                    >
                      All Clients
                    </span>
                    <RightOutlined tw=" ml-2" />

                    <span tw="text-xl font-bold text-black ml-2">
                      {" "}
                      Clients with Overdue Invoices
                    </span>
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
                  onClick={() => history.push("/clients/archived")}
                  tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
                >
                  View Archived Clients
                </button>
                <p tw="text-xs text-gray-500">
                  or{" "}
                  <Link tw="underline text-gray-500" to="/clients/deleted">
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
  return `${numberWithDot(sum)}`;
}
