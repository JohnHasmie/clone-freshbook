import {
  CopyOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  HddOutlined,
  MailOutlined,
  PrinterOutlined,
  RestOutlined,
  RightOutlined,
  SendOutlined,
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
} from "antd";
import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import TableCustom from "../../components/Table";

import TabHome from "../clients/TabHome";
import PaginationFooter from "../../components/layout/PaginationFooter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { numberWithDot, translateBg } from "../../components/Utils";
import moment from "moment";
import { ModalConfirm } from "../../components/ModalConfirm.style";
import FormPayment from "./FormPayment";
import AppContext from "../../components/context/AppContext";

export default function InvoicesOverdue() {
  const [isType, setIsType] = useState("");
  const [isInvoiceId, setIsInvoiceId] = useState("");
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const history = useHistory();
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    mode: "published",
    currency: "USD",
    status: "overdue",
    // type:"",
    // date_type:"",
    // start_date:"",
    // end_date:""
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [idRow, setIdRow] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPayment, setIsModalPayment] = useState(false);

  const [invoiceForPayment, setInvoiceForPayment] = useState("");
  const { user } = useContext(AppContext);
  useEffect(() => {
    if (user) {
      setFilter({ ...filter, currency: user?.data?.base_currency });
    }
  }, [user]);
  const handleModal = (type) => {
    switch (type.key) {
      case "archive":
        setIsType("archive");
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

  const handleClickChange = (open) => {
    setClicked(open);
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

  const data =
    status === "success" &&
    dataInvoices?.data?.map((item) => ({
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
      Total Overdue: {filter?.currency == "GBP" ? "£" : "$"}
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
          <span>
            {filter?.currency == "GBP" ? "£" : "$"}
            {numberWithDot(record.amount)}
          </span>{" "}
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
        let data = [];
        data.push(record);
        setInvoiceForPayment(data);
        setIdRow("");
        setIsModalPayment(true);

        break;

      default:
        history.push(`/invoices`);

        break;
    }
  };
  const handleOk = (type) => {
    if (type === "confirm") {
      switch (isType) {
        case "archive":
          if (selectedRowKeys.length === 0) {
            mutationArchive.mutate({ ids: [isInvoiceId], mode: "archive" });
          } else {
            mutationArchive.mutate({ ids: selectedRowKeys, mode: "archive" });
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
            selectedRowKeys.length > 1 ? selectedRowKeys.length : ""
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
  const mutationArchive = useMutation(
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
            selectedRowKeys.length > 1 && selectedRowKeys.length
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
  const handleCancel = (type) => {
    if (type === "confirm") {
      setIsModalOpen(false);
    } else {
      setIsModalPayment(false);
    }
  };
  const onSelectChange = (newSelectedRowKeys, x) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setInvoiceForPayment(x);
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
        <Menu.Item key="archive" onClick={handleModal}>
          <div>
            <HddOutlined />
            <span>Archive</span>
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
          <TabHome filterOutstanding={filter} />

          <div tw="md:mt-20">
            <div tw="grid md:flex  mb-6">
              <div tw="flex items-center">
                {hasSelected ? (
                  <>
                    <span
                      onClick={() => history.push(`/invoices`)}
                      tw="text-xl font-bold text-primary cursor-pointer"
                    >
                      All Invoices
                    </span>

                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Overdue</span>
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
                      onClick={() => history.push(`/invoices`)}
                      tw="text-xl font-bold text-primary"
                    >
                      All Invoices
                    </span>
                    <RightOutlined tw=" ml-2" />
                    <span tw="text-xl font-bold text-black ml-2">Overdue</span>
                  </>
                )}
              </div>
            </div>

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
              <span tw="text-lg">
                {translateIsType(isType, selectedRowKeys)}
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
  return ` ${numberWithDot(sum)} `;
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
