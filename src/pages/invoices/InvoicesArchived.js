import {
  CaretDownOutlined,
  CloseOutlined,
  CopyOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  HddOutlined,
  MailOutlined,
  PlusCircleFilled,
  PlusOutlined,
  PrinterOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
  SendOutlined,
  UndoOutlined,
  UnorderedListOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Menu,
  Modal,
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
import FormPayment from "./FormPayment";
import AppContext from "../../components/context/AppContext";

export default function InvoicesArchived() {
  const { Title } = Typography;
  const [isAdvance, setIsAdvance] = useState(false);
  const [isType, setIsType] = useState("");
  const [isInvoiceId, setIsInvoiceId] = useState("");
  const [invoiceForPayment, setInvoiceForPayment] = useState("");

  const [form] = Form.useForm();
  const history = useHistory();
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    mode: "archive",
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPayment, setIsModalPayment] = useState(false);
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
    setIsModalOpen(true);

        break;
        case "delete":
          setIsType("delete");
          setIsModalOpen(true);
          break;
        case "mark":
          setIsType("mark");
          setIsModalOpen(true);
          break;
        case "send":
          setIsType("send");
          setIsModalOpen(true);
          break;
        case "payment":
          setIsType("payment");
          setIsModalPayment(true);
          break;
        default:
          setIsType("");
          break;
      }
  


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
    ["invoices-listing", filter],
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
    filteredData?.map((item) => ({
      key: item.id,
      company_name: item.client.company_name,
      invoice_number: item.code,
      date: item.issued_at,
      due_date: item.due_date,
      description: item.notes,
      amount: item.total,
      status: item.status,
    }));

  const defaultFooter = () => (
    <div tw="text-right text-base">
      Grand Total:{filter?.currency == "GBP" ? "£" : "$"}
      {data &&
        getTotal(
          data?.map((x) => {
            const splitAmount = x.amount.split(".");
            return parseInt(splitAmount[0]);
          })
        )}{" "}
    </div>
  );

  const columns = [
    {
      title: "Client / Invoice Number",
      dataIndex: "invoice_number",
      key: "invoice_number",
      render: (text, record) => (
        <div>
          <span>{record.company_name}</span>{" "}
          <p tw="text-xs">{record.invoice_number}</p>{" "}
        </div>
      ),
      sorter: (a, b) => a.company_name.length - b.company_name.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      sorter: (a, b) => a.description.length - b.description.length,
      width: "30%",
    },

    {
      title: "Issued Date / Due Date",
      key: "issued_due_date",
      dataIndex: "issued_due_date",
      render: (text, record) => (
        <div>
          <span>{moment(record.date).format("MM/DD/YYYY")}</span>{" "}
          <p tw="text-xs">
            {`Due ${moment(record.due_date).endOf("month").from(record.date)} `}
          </p>{" "}
        </div>
      ),
      sorter: (a, b) => a.date.length - b.date.length,
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
            <div tw="hover:bg-gray-100 hover:rounded-l-full ">
              <Tooltip placement="top" title="edit">
                <EditOutlined
                  tw="p-2"
                  onClick={(e) => {
                    handleAction(e, "edit", record);
                  }}
                />
              </Tooltip>
            </div>

            <div tw="hover:bg-gray-100  border-l border-r border-gray-200 ">
              <Tooltip placement="top" title="duplicate">
                <CopyOutlined
                  tw="p-2"
                  onClick={(e) => {
                    handleAction(e, "duplicate", record);
                  }}
                />
              </Tooltip>
            </div>
            <div tw="hover:bg-gray-100    ">
              <Tooltip placement="top" title="add payment">
                <DollarOutlined
                  tw="p-2 "
                  onClick={(e) => {
                    handleAction(e, "payment", record);
                  }}
                />
              </Tooltip>
            </div>
            {/* <div tw="hover:bg-gray-100  hover:rounded-r-full ">
              <Tooltip placement="top" title="More">
                
                <EllipsisOutlined tw="text-xs p-2" />
              </Tooltip>
            </div> */}
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

  const handleOk = (type) => {
    console.log(type)
    if (type === "confirm") {
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
        case "mark":
          mutationMark.mutate(selectedRowKeys[0]);

          break;
        case "send":
          mutationSend.mutate({
            client_id: invoiceForPayment[0].client_id,
            ids: selectedRowKeys,
          });

          break;
        default:
          setIsType("");
          break;
      }

      setIsModalOpen(false);
    } else {
      setIsModalPayment(false);
    }
  };

  // const handleOk = () => {
  //   switch (isType) {
  //     case "unarchive":
  //       if (selectedRowKeys.length === 0) {
  //         mutationUnarchive.mutate({ ids: [isInvoiceId], mode: "published" });
  //       } else {
  //         mutationUnarchive.mutate({ ids: selectedRowKeys, mode: "published" });
  //       }
  //       break;
  //     case "delete":
  //       if (isInvoiceId) {
  //         mutation.mutate(isInvoiceId);
  //       } else {
  //         mutation.mutate(selectedRowKeys[0]);
  //       }
  //       break;
  //     default:
  //       setIsType("");
  //       break;
  //   }

  //   setIsModalOpen(false);
  // };
  const mutationMark = useMutation(
    async (id) => {
      return axios
        .put(`invoices/status/${id}`, { status: "send" })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        console.log("res", res);
        // setTimeout(() => {
        queryClient.invalidateQueries("invoices-listing");
        // }, 500);
        setSelectedRowKeys([]);
        setIsInvoiceId("");
        notification.success({
          message: `Invoice ${res?.data?.invoice?.code} has been marked as sent`,
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
  const mutationSend = useMutation(
    async (data) => {
      return axios.post(`invoices/send`, data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        console.log("res", res);
        // setTimeout(() => {
        queryClient.invalidateQueries("invoices-listing");
        // }, 500);
        setSelectedRowKeys([]);
        setIsInvoiceId("");
        notification.success({
          message: `Invoice has been send by email`,
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
      return axios.delete(`invoices/${data}`).then((res) => res.data);
    },
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries("invoices-listing");
        }, 500);
        setSelectedRowKeys([]);
        setIsInvoiceId("");
        notification.success({
          message: `The selected ${
            selectedRowKeys.length > 1 && selectedRowKeys.length
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
          queryClient.invalidateQueries("invoices-listing");
        }, 500);
        setSelectedRowKeys([]);
        notification.success({
          message: `The selected ${
            selectedRowKeys.length > 1 ? selectedRowKeys.length : ""
          } invoices
          has been succesfully unarchived`,
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
  const onSelectChange = (newSelectedRowKeys, x) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setInvoiceForPayment(x);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const { status: pdfStatus, refetch: pdfRefetch } = useQuery(
    "downloadPDF",
    async () =>
      axios
        .get("invoices/export", {
          responseType: "blob",
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download.pdf");
          document.body.appendChild(link);
          link.click();

          return res.data;
        })
        .catch((error) => {
          console.log(error, "error");
          switch (error?.response?.status) {
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
        }),
    {
      enabled: false,
    }
  );

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

        <Menu.Item key="duplicate">
          <div>
            <CopyOutlined />
            <span>Duplicate</span>
          </div>
        </Menu.Item>

        <Menu.Item
          key="print"
          onClick={() => history.push(`/invoices/${selectedRowKeys[0]}/print`)}
          disabled={selectedRowKeys.length > 1}
        >
          <div>
            <PrinterOutlined />
            <span>Print</span>
          </div>
        </Menu.Item>

        <Menu.Item
          key="send"
          onClick={handleModal}
          disabled={
            selectedRowKeys.length > 1 ||
            invoiceForPayment[0]?.status === "paid" ||
            invoiceForPayment[0]?.status === "send"
          }
        >
          <div>
            <MailOutlined />
            <span>Send By Email</span>
          </div>
        </Menu.Item>
        <Menu.Item
          key="mark"
          disabled={
            selectedRowKeys.length > 1 ||
            invoiceForPayment[0]?.status !== "draft"
          }
          onClick={handleModal}
        >
          <div>
            <SendOutlined />
            <span>Mark as Sent</span>
          </div>
        </Menu.Item>
        <Menu.Item
          key="payment"
          onClick={handleModal}
          disabled={
            selectedRowKeys.length > 1 ||
            invoiceForPayment[0]?.status === "paid"
          }
        >
          <div>
            <DollarOutlined />
            <span>Add a Payment</span>
          </div>
        </Menu.Item>
        <Menu.Item key="download-pdf" onClick={() => pdfRefetch()}>
          <div>
            <VerticalAlignBottomOutlined />
            <span>Download PDF</span>
          </div>
        </Menu.Item>
        <Menu.Item key="unarchive" onClick={handleModal}>
          <div>
            <UndoOutlined />
            <span>Unarchive</span>
          </div>
        </Menu.Item>
        <Menu.Item
          key="delete"
          onClick={handleModal}
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
                        history.push("/invoices")
                        setSelectedRowKeys([])}}
                      tw="text-xl text-primary font-bold text-primary cursor-pointer"
                    >
                      All Invoices
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
                    <span tw="text-xl font-bold text-primary cursor-pointer" onClick={()=>history.push("/invoices")}>All Invoices</span>
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
               <Modal
              footer={null}
              visible={isModalPayment}
              onOk={() => handleOk("modal")}
              onCancel={() => handleCancel("modal")}
              width={"100%"}
              centered
            >
              <FormPayment
                handleCancel={handleCancel}
                handleOk2={handleOk}
                data={invoiceForPayment[0]}
              />
            </Modal>
            <ModalConfirm
              title="Confirm"
              visible={isModalOpen}
              onOk={() => handleOk("confirm")}
              onCancel={() => handleCancel("confirm")}
              width={500}
              closable={false}
            >
              <span tw="text-lg">                {translateIsType(isType, selectedRowKeys)}
</span>
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
  return `Rp. ${numberWithDot(sum)} IDR`;
}
export function translateIsType(type, selectedRowKeys) {
  let text = "";
  switch (type) {
    case "mark":
      text =
        "Your client won't receive a notification email about this invoice. However, the invoice will appear in their account if they have one. Do you want to mark it as sent?";
      break;
    case "send":
      text =
        "Are you sure you want to send this invoice? Only the primary contact will be notified.";
      break;

    default:
      text = `Are you sure you want to ${type} ${
        selectedRowKeys.length > 1
          ? selectedRowKeys.length + " invoice "
          : "this"
      } ?`;
      break;
  }

  return text;
}
