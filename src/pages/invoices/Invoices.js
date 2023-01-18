import {
  CaretDownOutlined,
  CloseOutlined,
  CopyOutlined,
  DollarOutlined,
  DownOutlined,
  EditOutlined,
  HddOutlined,
  PlusCircleFilled,
  PlusOutlined,
  PrinterOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
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
import React, { useState } from "react";
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

export default function Invoices() {
  const { Title } = Typography;
  const [isAdvance, setIsAdvance] = useState(false);
  const [isType, setIsType] = useState("");
  const [isInvoiceId, setIsInvoiceId] = useState("");
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const history = useHistory();
  const [filter, setFilter] = useState({
    limit: 10,
    page: 1,
    mode: "published",
    currency:"USD",
    // status:"",
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

  const [invoiceForPayment, setInvoiceForPayment] = useState('');

  const handleModal = (type) => {
    if(type.key !== "payment"){
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
    setIsModalOpen(true);
    setClicked(false);
}else{
  setIsModalPayment(true)
  setClicked(false);

}
    
  

  };
  const handleModalTooltip = (e, id, client, type) => {
    e.stopPropagation();
    // setClientName(client);
    setIsInvoiceId(id);
    if (type === "delete") {
      setIsType("delete");
    } else {
      setIsType("archive");
    }
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

  const { data: dataClients, statusClients } = useQuery(
    ["clients-listing"],
    async (key) =>
      axios
        .get("clients", {
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
          const url = window.URL.createObjectURL(new Blob([res.data]))
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download.pdf")
          document.body.appendChild(link)
          link.click()

          return res.data
        }
        
      
        )
        .catch((error) => {
          console.log(error,"error"); 
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
        })
        ,
    {
      enabled: false,
    },
  
  )

  const filteredData =
    status === "success" &&
    dataInvoices?.data.filter((item) => {
      return item?.client?.company_name
        .toLowerCase()
        .includes(searchField?.company_name.toLowerCase());
    });

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
      Grand Total:{" "}
      {filter?.currency == "GBP" ? '£' : "$"}
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
          <span>{filter?.currency == "GBP" ? '£' : "$"}{numberWithDot(record.amount)}</span>{" "}
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
        let data=[]
        data.push(record)
        setInvoiceForPayment(data)
        setIdRow("")
        setIsModalPayment(true)
        
        break;

      default:
        history.push(`/invoices`);

        break;
    }
  };
  const handleOk = (type) => {
    if(type === "confirm"){
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
      default:
        setIsType("");
        break;
    }

    setIsModalOpen(false);}else{
      setIsModalPayment(false)
    }
  };

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
    if(type === "confirm"){
    setIsModalOpen(false);}else{
      setIsModalPayment(false)
    }
  };
  const onSelectChange = (newSelectedRowKeys,x) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setInvoiceForPayment(x)
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

        {/* <Menu.Item key="send-email">
          <div>
            <MailOutlined />
            <span>Send By Email</span>
          </div>
        </Menu.Item>
        <Menu.Item key="mark-as-sent">
          <div>
            <SendOutlined />
            <span>Mark as Sent</span>
          </div>
        </Menu.Item> */}
        <Menu.Item key="payment" onClick={handleModal} disabled={selectedRowKeys.length > 1 || invoiceForPayment[0]?.status === "paid"}>
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
  console.log(selectedRowKeys,"cek")
  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg">
          <TabHome />
          {isToggle ? (
            <div tw="hidden md:block mt-20">
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
              <div tw="flex" style={{ opacity: isHover ? "0.5" : "1" }}>
                {dataInvoices?.data.length < 4 && (
                  <div
                    onClick={() => history.push("/invoices/new")}
                    tw="cursor-pointer border border-gray-200 hover:bg-blue-50 border-dashed flex w-44 rounded-md  mr-5 justify-center items-center"
                  >
                    <div tw="flex flex-col">
                      <PlusOutlined tw="text-xl text-green-400" />
                      <span tw="text-base  font-bold">New Invoice</span>
                    </div>
                  </div>
                )}
                <ListCardInvoice invoiceProps={[dataInvoices, status]} />
              </div>
            </div>
          ) : (
            <div tw=" hidden opacity-0 hover:opacity-100  md:block relative mt-20">
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
          <div tw="md:mt-20">
            <InvoiceTabs />
            <div tw="grid md:flex justify-between mb-6">
              <div tw="flex items-center">
                {hasSelected ? (
                  <>
                    <span
                      onClick={() => setSelectedRowKeys([])}
                      tw="text-xl font-bold text-primary cursor-pointer"
                    >
                      Invoices
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
                  <>
                    <span tw="text-xl font-bold text-black">All Invoices</span>
                    <PlusOutlined
                      onClick={() => history.push("/invoices/new")}
                      tw="ml-2 text-white bg-success text-xl flex items-center rounded-md font-bold py-1.5 px-2 cursor-pointer "
                    />
                  </>
                )}
              </div>
              <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch prefix={<SearchOutlined />} />
                <div
                  onClick={() => setIsAdvance(!isAdvance)}
                  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center px-1"
                >
                  <UnorderedListOutlined />
                  <span tw="text-xs ml-2">Advanced Search </span>
                  <CaretDownOutlined tw="ml-1" />
                </div>
              </div>
            </div>
            {isAdvance ? (
              <div tw="bg-gray-100 border-y-2 border-gray-400 p-3 mb-4">
                <FormAdvanceSearchInvoice
                statusClients={statusClients}
                dataClients={dataClients}
                  form={form}
                  setIsAdvance={setIsAdvance}
                  filterProps={[filter,setFilter]}
                />
              </div>
            ) : (
              <></>
            )}
               <Modal
               footer={null}
            visible={isModalPayment}
            onOk={()=>handleOk('modal')}
            onCancel={()=>handleCancel('modal')}
            width={"100%"}

            centered
          >
            <FormPayment handleCancel={handleCancel} handleOk2={handleOk} data={invoiceForPayment[0]} />
          </Modal>
            <ModalConfirm
              title="Confirm"
              visible={isModalOpen}
              onOk={()=>handleOk('confirm')}
              onCancel={()=>handleCancel('confirm')}
              width={500}
              closable={false}
            >
              <span tw="text-lg">{`Are you sure you want to ${isType} ${
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
              <div tw="flex flex-col items-center">
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
