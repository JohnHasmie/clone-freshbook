import {
  CaretDownOutlined,
  CloseOutlined,
  DownOutlined,

  MailOutlined,
  PhoneOutlined,
  PlusCircleFilled,
  PlusOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
  UndoOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import _ from "lodash";

import {
  Button,
  Divider,
  Form,
  Menu,
  Modal,
  notification,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardClient from "../../components/CardClient";
import AllClientTabs from "../../components/ClientsComponent/AllClientTabs";
import TableCustom from "../../components/Table/index";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import FormAdvanceSearch, { FormAdvanceSearchEmail } from "./FormAdvanceSearch";
import TabHome from "./TabHome";
import PaginationFooter from "../../components/layout/PaginationFooter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot, truncate } from "../../components/Utils";
import { ModalConfirm } from "../../components/ModalConfirm.style";
import moment from "moment";
import { useRef } from "react";

export default function EmailDeleted() {
  const { Title } = Typography;
  const history = useHistory();
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();
  const [isToggle, setIsToggle] = useState(true);
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    status: "send",
    mode: "published",
  });
  const [filterEmail, setFilterEmail] = useState({
    limit: 10,
    show: "deleted",
    keyword: "",
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
  const setSearchValue = useRef(
    _.debounce((value) => {
      setFilterEmail({
        ...filterEmail,
        keyword: value,
      });
    }, 1000)
  );
  const [keywordSearch, setKeywordSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");

  const queryClient = useQueryClient();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [isType, setIsType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [isLogDetail, setIsLogDetail] = useState("");

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
  const handleCancel2 = () => {
    setIsLogDetail("");
    setIsModalDetail(false);
  };
  const handleOk = () => {
    switch (isType) {
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
  const { data: dataSentEmail, status: statuSentEmail } = useQuery(
    ["mail-log", filterEmail],
    async (key) =>
      axios
        .get("mail-log", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );

  const mutation = useMutation(
    async (data) => {
      return axios.get(`mail-log/restore/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("mail-log");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `The selected email has been undeleted`,
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

  const data =
    status === "success" &&
    dataSentEmail?.data?.map((item) => ({
      key: item.id,
      date: item.created_at,
      sender: item.sender.first_name + " " + item.sender.last_name,
      recipient: item.recipent.company_name,
      email_recipient: item.recipent.email,

      type: item.type,
      organization: item.recipent.first_name + " " + item.recipent.last_name,
      subject: item.subject,
      body: item.body,
    }));

  const columns = [
    {
      title: "Date Sent / Sender",
      dataIndex: "dateSent",
      key: "dateSent",
      render: (text, record) => (
        <div>
          <span>{moment(record.date).format("MM/DD/YYYY")}</span>{" "}
          <p>{record.sender}</p>{" "}
        </div>
      ),
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Recipient/ Organization",
      dataIndex: "recipient",
      key: "recipient",
      render: (text, record) => (
        <div>
          <span>{record.recipient}</span> <p>{record.organization}</p>{" "}
        </div>
      ),
      sorter: (a, b) => a.company_name.length - b.company_name.length,
    },

    {
      title: "Email Type",
      key: "type",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
    },

    {
      title: "Subject",
      key: "subject",
      dataIndex: "subject",
      sorter: (a, b) => a.subject.length - b.subject.length,
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
        <Menu.Item onClick={handleModal} key="delete" disabled={selectedRowKeys.length > 1}>
          <div>
            <UndoOutlined />
            <span>Undelete</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
  // useEffect(() => {
  //   if (selectedRowKeys.length < 2) {
  //     const getName = data && data?.filter((x) => x.key === selectedRowKeys[0]);
  //     setClientName(getName[0]?.company_name);
  //   } else {
  //     setClientName("");
  //   }
  // }, [selectedRowKeys]);
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
                      onClick={()=>history.push("/clients/sent-email")}
                      tw="text-xl font-bold text-primary cursor-pointer"
                    >
                      All Sent Emails
                    </span>

                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Deleted</span>
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
                  <span tw="text-xl font-bold text-primary" onClick={()=>history.push("/clients/sent-email")}>All Sent Emails</span>
                  <RightOutlined tw=" ml-2" />
                  <span tw="text-xl font-bold text-black ml-2">Deleted</span>
                  </>
                )}
              </div>

              {/* <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch
                  onKeyUp={(event) => {
                    setSearchValue.current(event.target.value);
                  }}
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
              </div> */}
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
              This email log is deleted and can't be viewed. Would you like to undelete it?
              </span>
            </ModalConfirm>
            <Modal
              visible={isModalDetail}
              // onOk={handleOk}
              onCancel={handleCancel2}
              // width={500}
              footer={null}
            >
              <div tw=" mt-5">
                <div>
                  <h1 tw="text-lg font-bold text-center">
                    Recurring Invoice email
                  </h1>
                </div>

                <div tw="grid grid-cols-4">
                  <div tw="text-right font-bold">
                    <div>To:</div>
                    <div>From:</div>
                    <div>Date:</div>
                    <div>Subject:</div>
                  </div>
                  <div tw="col-span-2 ml-2">
                    <div>{isLogDetail?.email_recipient}</div>
                    <div>{isLogDetail?.sender}</div>
                    <div>{moment(isLogDetail?.date)?.format("MM/DD/YYYY")}</div>
                    <div>{isLogDetail?.subject}</div>
                  </div>
                </div>
                <Divider />
                <div>{isLogDetail?.body}</div>
              </div>
            </Modal>
            <div className="table-responsive">
              <TableCustom
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setIsLogDetail(record);
                      setIsModalDetail(true);
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
                  1-{data?.length} of {data?.length}{" "}
                </span>
              </div>
              <div tw="flex flex-col items-center">
               
                <p tw="text-xs text-gray-500">
                  Emails sent more than 90 days ago are automatically purged
                </p>
              </div>
              <div tw="invisible">hide</div>
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
  return `Rp. ${numberWithDot(sum)} IDR`;
}
