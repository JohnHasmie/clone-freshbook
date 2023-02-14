

import {

  CopyOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
 
  PrinterOutlined,
  RestOutlined,
  RightOutlined,
 
  UndoOutlined,
  VerticalAlignBottomOutlined,
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
import React, { useState,useEffect,useContext } from "react";
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
import AppContext from "../../components/context/AppContext";

export default function RecurringArchived() {
  const { Title } = Typography;
  const [isAdvance, setIsAdvance] = useState(false);
  const [isType, setIsType] = useState("");
  const [isInvoiceId, setIsInvoiceId] = useState("");

  const [form] = Form.useForm();
  const history = useHistory();
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    mode: "archive",
    type:"recurring",
    show:"template"
    // status:"send"
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (user) {
      setFilter({ ...filter, currency: user?.data?.base_currency });
    }
  }, [user]);
  const handleModal = (type) => {
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
    const handleModalTooltip = (e, id, client, type) => {
      e.stopPropagation();
      // setClientName(client);
      setIsInvoiceId(id);
      if (type === "delete") {
        setIsType("delete");
      } else {
        setIsType("unarchive");
      }
      setIsModalOpen(true);
      setClicked(false);
    };

    setIsModalOpen(true);
    setClicked(false);
  };

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
  const queryClient = useQueryClient();

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
    dataInvoices?.data
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

  const defaultFooter = () => (
    <div tw="text-right text-base">
      Grand Total:{" "}{filter?.currency == "GBP" ? "£" : "$"}
      {data &&
        getTotal(
          data?.map((x) => {
            const splitAmount = x.amount.split(".");
            return parseInt(splitAmount[0]);
          })
        )}    
        {" "}
        {filter.currency}
    </div>
  );

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
          <span>{filter?.currency == "GBP" ? "£" : "$"} {numberWithDot(record.amount)}</span>{" "}
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

      default:
        history.push(`/invoices`);

        break;
    }
  };
  const handleOk = () => {
    switch (isType) {
      case "unarchive":
        if (selectedRowKeys.length === 0) {
          mutationUnarchive.mutate({ ids: [isInvoiceId], mode: "published" });
        } else {
          mutationUnarchive.mutate({ ids: selectedRowKeys, mode: "published" });
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
            selectedRowKeys.length > 1 ? selectedRowKeys.length :""
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
  const mutationUnarchive = useMutation(
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
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
        <Menu.Item
          key="edit"
          onClick={() => history.push(`/invoices/${selectedRowKeys[0]}/edit`)}
          disabled={selectedRowKeys.length > 1}
        >
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>



        <Menu.Item key="unarchive" onClick={handleModal}>
          <div>
            <UndoOutlined />
            <span>Unarchive</span>
          </div>
        </Menu.Item>
        <Menu.Item key="delete" onClick={handleModal}
          disabled={selectedRowKeys.length > 1}
        
        >
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
          
          <div >
            <div tw="grid md:flex justify-between mb-6">
              <div tw="flex items-center">
                {hasSelected ? (
                  <>
                    <span
                      onClick={() => {
                        history.push("/invoices/recurring-templates")
                        setSelectedRowKeys([])}}
                      tw="text-xl text-primary font-bold text-primary cursor-pointer"
                    >
                      All Recurring Templates
                    </span>

                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Archived</span>
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
                    <span tw="text-xl font-bold text-primary cursor-pointer" onClick={()=>history.push("/invoices/recurring-templates")}>All Recurring Templates</span>
                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Archived</span>
                  </>
                )}
              </div>
              {/* <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch prefix={<SearchOutlined />} />
                <div
                  onClick={() => setIsAdvance(!isAdvance)}
                  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center px-1"
                >
                  <UnorderedListOutlined />
                  <span tw="text-xs ml-2">Advanced Search </span>
                  <CaretDownOutlined tw="ml-1" />
                </div>
              </div> */}
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
              <span tw="text-lg">{isType == "unarchive" ?  `${
                selectedRowKeys.length > 1
                  ? selectedRowKeys.length + " invoice "
                  : "This invoice"
              } archived . Would you like to unarchive it?` : `Are you sure you want to ${isType} ${
                selectedRowKeys.length > 1
                  ? selectedRowKeys.length + " invoice "
                  : "this"
              } ?`}</span>
            </ModalConfirm>
            <div className="table-responsive">
              <TableCustom
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(`/invoices/${record.key}/invoice-detail`);
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
            <div tw="flex justify-between my-5">
              <div>
                <span tw="text-sm text-black font-bold">
                  1-{data.length} of {data.length}{" "}
                </span>
              </div>
                {/* <div tw="flex flex-col items-center">
                  <button
                    onClick={() => history.push("/invoices/archived")}
                    tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-400 "
                  >
                    View Archived Invoice
                  </button>
                  <p tw="text-xs text-gray-500">
                    or{" "}
                    <Link tw="underline text-gray-500" to="/invoices/deleted">
                      deleted
                    </Link>
                  </p>
                </div> */}
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
export function getTotal(outstanding) {
  const sum = outstanding.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return ` ${numberWithDot(sum)}`;
}
