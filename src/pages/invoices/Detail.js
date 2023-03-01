import {
  DownOutlined,
  EditOutlined,
  PlusOutlined,
  RestOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Card, Menu, notification, Popover } from "antd";
import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import TableCustom from "../../components/Table";
import CardDetailInvoice from "../../components/CardDetailInvoice";
import tw from "twin.macro";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import AppContext from "../../components/context/AppContext";
import moment from "moment";
import { numberWithDot } from "../../components/Utils";
import PopupPayment from "./PopupPayment";
import jsPDF from "jspdf";

export default function Detail() {
  const [clicked, setClicked] = useState(false);
  const [clickedList, setClickedList] = useState(false);

  const [filter, setFilter] = useState({
    limit_comment: 1,
  });
  const [clickedRow, setClickedRow] = useState(false);
  const queryClient = useQueryClient();

  const [clickedId, setClickedId] = useState("");
  const [marginResponsive, setMarginResponsive] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [filteayment, setFilteayment] = useState({
    payment_method: 1,
    client_id: "",
    limit: 10,
    status: "",
    invoice_id: "",
  });
  const { invoiceId } = useParams();
  const { pathname } = useLocation();
  const { setGlobalDetailInvoice, user, setting, refInvoice } =
    useContext(AppContext);

  const handleClickChange = (open) => {
    setClicked(open);
  };
  const handleClickChangeList = (open) => {
    setClickedList(open);
  };

  const hide = () => {
    setClicked(false);
  };
  const handleClickRowChange = (id, index) => {
    if (clickedRow === false) {
      setClickedRow(true);
      setClickedId(id);
      setMarginResponsive("400px");
    } else {
      setClickedRow(false);
      setClickedId("");
      setMarginResponsive("");
    }
  };
  const hideClickRow = (e) => {
    setClickedRow(false);
  };

  const { data: detailInvoice, status } = useQuery(
    ["invoice-detail", filter],
    async (key) =>
      axios
        .get(`invoices/detail/${invoiceId}`, {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );

  useEffect(() => {
    if (status === "success") {
      setGlobalDetailInvoice(detailInvoice);
      setFilteayment({
        ...filteayment,
        invoice_id: invoiceId,
        client_id: detailInvoice.client_id,
      });
    }
  }, [status]);

  const { data: listPayment, status: statusListPayment } = useQuery(
    ["payment-listing", filteayment],
    async (key) =>
      axios
        .get(`payments`, {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );

  const history = useHistory();

  const data =
    statusListPayment === "success" &&
    listPayment?.data?.map((item, i) => ({
      key: item.id,
      payment_at: item.payment_at,
      payment_method: item.payment_method.name,
      note: item.note,
      amount: item.amount,
      method_id: item.payment_method.id,
      status: item.status,
    }));

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const mutationDelete = useMutation(
    async (data) => {
      return axios
        .delete(`payments/${selectedRowKeys[0]}`)
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("payment-listing");
        setClickedList(false);
        setSelectedRowKeys([]);

        notification.success({
          message: `A payment was deleted`,
          // description:'This information will appear on your invoice',
          placement: "topLeft",
        });
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        setClickedList(false);

        console.log(err.response.data.message);
      },
    }
  );

  const bulkList = (
    <div>
      <Menu>
        <Menu.Item
          key="edit"
          onClick={() => {
            setClickedRow(!clickedRow);
            setClickedId(selectedRowKeys[0]);
            setMarginResponsive("400px");
            setClickedList(false);
          }}
          disabled={selectedRowKeys.length > 1}
        >
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>
        <Menu.Item
          key="refund"
          /* onClick={()=>history.push(`clients/${selectedRowKeys[0]}/edit`)} */ disabled
        >
          <div>
            <UndoOutlined />
            <span>Refund</span>
          </div>
        </Menu.Item>

        <Menu.Item
          key="delete"
          onClick={() => mutationDelete.mutate()}
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

  const columns = [
    {
      title: "Client / Invoice Number",
      dataIndex: "payment_at",
      key: "payment_at",
      render: (text, record) => (
        <span>{moment(record.payment_at).format("MM/DD/YYYY")}</span>
      ),
      sorter: (a, b) => a.payment_at - b.payment_at,
    },
    {
      title: "Type",
      dataIndex: "payment_method",
      key: "payment_method",
      sorter: (a, b) => a.payment_method.length - b.payment_method.length,
    },
    {
      title: "Internal Notes",
      dataIndex: "note",
      key: "note",
      render: (text, record) => (
        <>
          <Popover
            placement="top"
            content={
              <PopupPayment
                invoiceId={detailInvoice?.id}
                hide={hideClickRow}
                id={record.key}
                data={record}
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
      sorter: (a, b) => a.note?.length - b.note?.length,
    },

    {
      title: "Line Total",
      key: "amount",
      dataIndex: "amount",
      render: (text, record) => <span> {numberWithDot(record.amount)}</span>,
      sorter: (a, b) => a.amount - b.amount,
    },
  ];

 
  return (
    <>
      <div className="layout-content">
        <div
          tw="grid grid-cols-1 md:grid-cols-12 justify-items-center max-w-screen-sm"
          style={{ marginBottom: marginResponsive }}
        >
          <div tw="md:col-span-12 mb-10 ">
            {/* <p>
              {" "}
              <ExclamationCircleOutlined tw="mr-2" />
              Company Name has{" "}
              <span
                onClick={() => history.push("/invoices/outstanding-balance")}
                tw="cursor-pointer text-primary underline"
              >
                1 outstanding invoices
              </span>{" "}
              totalling $6,000.00 USD
            </p> */}
            {status === "loading" && (
              <div
                role="status"
                tw="flex flex-col w-full items-center justify-center"
              >
                <svg
                  tw="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2948 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            )}
            {status === "success" && (
              <div ref={refInvoice}>
                <CardDetailInvoice>
                  <div tw="grid gap-2 md:flex justify-between mb-10"  >
                    {/* {detailInvoice.logo  ? (
                      <img
                        src={detailInvoice?.logo}
                        alt="profile company"
                        tw="w-52 h-52"
                      />
                    ) : ( */}
                      <img
                        src="https://api.freshbooks.com/uploads/images/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50Ijo3OTU0MjUzLCJvcmlnaW5hbF9maWxlbmFtZSI6InNlbWktam9pbi1hbmQtYW50aS1qb2luLnBuZyIsImxlbmd0aCI6NTAyMDcsImZpbGVuYW1lIjoidXBsb2FkLWI1MjQ5OGNjNDllNGJiOGNhZDhhYzM5YmZkMzJjODJmODI1Y2NhMjYiLCJidWNrZXQiOiJ1cGxvYWRzIiwia2V5IjoiJ2RvY3MtJy03OTU0MjUzL3VwbG9hZC1iNTI0OThjYzQ5ZTRiYjhjYWQ4YWMzOWJmZDMyYzgyZjgyNWNjYTI2IiwidXVpZCI6ImYyOThlMTUxLTliMTAtNGEwYS04YjY2LTM0ZTc5MmIwZWUxMyJ9.GfHJz3M6QXBQkkREmYY6ZCvPTOeYlvUrQMurvBIMX0Q"
                        alt="profile company"
                        tw="w-52 h-52"
                      />
                    {/* )} */}
                    <div tw="flex justify-between"  >
                      <div tw="flex flex-col items-end mr-5">
                        <span>{user?.data?.company_name}</span>
                        <span>{user?.data?.phone}</span>
                      </div>
                      <div tw="flex flex-col items-end">
                        <span>{user?.data?.address}</span>
                        {/* <span
          
                 >line_address_2</span> */}
                        <div tw="flex">
                          <span>{user?.data?.city}</span>
                          <span>,</span>
                          {/* <span
                
                   >State</span> */}
                        </div>

                        <span>{user?.data?.zip}</span>

                        <span>{user?.data?.country}</span>
                        {/* <div tw="flex">
                   <span
           
                   >TAX NAME</span>
                   <span>,</span>
                   <span
                 
                   >TAX NUMBER</span>
                 </div> */}
                      </div>
                    </div>
                  </div>
                  <div tw="grid grid-cols-4 mb-16">
                    <div className="flex flex-col">
                      <span tw="text-gray-400">Billed To</span>
                      <span tw="text-xs w-28">
                        {detailInvoice?.client.first_name}{" "}
                        {detailInvoice?.client.last_name}
                      </span>
                      <span tw="text-xs w-28">
                        {detailInvoice?.client.company_name}
                      </span>
                      <span tw="text-xs">{detailInvoice?.client.address}</span>
                      <span tw="text-xs">{detailInvoice?.client.city}</span>
                      <span tw="text-xs">{detailInvoice?.client.zip}</span>
                      <span tw="text-xs">{detailInvoice?.client.country}</span>
                    </div>
                    <div tw="space-y-5 ">
                      <div>
                        <h4 tw="text-gray-400">Date of Issue</h4>

                        <span>
                          {moment(detailInvoice?.issued_at).format(
                            `DD/MM/YYYY`
                          )}
                        </span>
                      </div>

                      <div>
                        <h4 tw="text-gray-400">Due Date</h4>
                        <span>
                          {moment(detailInvoice?.due_date).format(`DD/MM/YYYY`)}
                        </span>
                      </div>
                    </div>
                    <div tw="space-y-5 ">
                      <div>
                        <h4 tw="text-gray-400">Invoice Number</h4>

                        <span tw="text-xs">{detailInvoice?.code}</span>
                      </div>

                      <div>
                        <h4 tw="text-gray-400">Reference</h4>
                        <span>{detailInvoice?.references}</span>
                      </div>
                    </div>
                    <div tw="text-right">
                      <h3 tw="text-gray-400">Amount Due </h3>
                      <span tw="font-medium text-3xl ">
                        {numberWithDot(detailInvoice?.total)}
                      </span>
                    </div>
                  </div>

                  <table>
                    <tbody>
                      <tr tw="border-t-4 border-gray-600 text-sm text-gray-500 text-right font-bold">
                        <th tw="text-left  py-2">Description</th>
                        <th>Rate</th>
                        <th tw="invisible">hide</th>
                        <th>Qty</th>
                        <th>Line Total</th>
                      </tr>

                      {detailInvoice?.items_detail.length > 0 &&
                        detailInvoice?.items_detail?.map((detail, i) => (
                          <tr
                            key={i}
                            tw="border-b text-sm  border-gray-300 text-right"
                          >
                            <th tw="grid text-left py-2">
                              <span>{detail.name}</span>
                              <span tw="text-xs">{detail.description}</span>
                            </th>
                            <td>{numberWithDot(detail.rate)}</td>
                            <td></td>
                            <td>{detail.pivot.qty}</td>

                            <td>{numberWithDot(detail.pivot.total)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  <div tw="grid grid-cols-12 mt-10 mb-20">
                    <div tw="col-span-8"></div>

                    <table tw="col-span-4">
                      <tbody>
                        <tr tw="text-right">
                          <td>Subtotal</td>
                          <td>
                            {detailInvoice?.subtotal !== null &&
                              numberWithDot(detailInvoice?.subtotal)}
                          </td>
                        </tr>
                        <tr tw="border-b  border-gray-300 text-right">
                          <td>Tax</td>
                          <td>0.00</td>
                        </tr>
                        <tr tw="text-right ">
                          <td tw="pt-1">Total</td>
                          <td>{numberWithDot(detailInvoice?.total)}</td>
                        </tr>
                        <tr tw="text-right">
                          <td>Amount Paid</td>
                          <td>0.00</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="double">
                          <td tw=" text-right align-top text-gray-400">
                            Amount Due
                          </td>

                          <td tw=" grid gap-0 items-end ">
                            <span tw="font-semibold ">
                              {numberWithDot(detailInvoice?.total)}
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardDetailInvoice>
                {detailInvoice?.attachments?.length > 0 && (
                  <Card tw="border-gray-200 rounded-lg p-5 mt-5">
                    {detailInvoice?.attachments?.map((item, i) => (
                      <img
                        key={i}
                        src={item.url}
                        tw="rounded-lg w-48 h-48"
                        alt={item.name}
                      />
                    ))}
                  </Card>
                )}
              </div>
            )}
            {!pathname.includes("recurring") && (
              <>
                <div tw="mt-20 w-auto">
                  <div tw="flex items-center ">
                    <span tw="text-xl font-bold text-black">
                      All Payment for Invoices {detailInvoice?.code}{" "}
                    </span>
                    <Popover
                      placement="top"
                      content={
                        <PopupPayment
                          hide={hide}
                          id={0}
                          data={null}
                          invoiceId={detailInvoice?.id}
                        />
                      }
                      trigger="click"
                      visible={clicked}
                      onVisibleChange={handleClickChange}
                    >
                      <PlusOutlined tw="mx-2 text-white bg-success text-xl flex items-center py-1.5 px-2  rounded-md font-bold cursor-pointer " />
                    </Popover>
                    {hasSelected ? (
                      <>
                        <Popover
                          placement="bottom"
                          content={bulkList}
                          trigger="click"
                          visible={clickedList}
                          onVisibleChange={handleClickChangeList}
                        >
                          <div className="flex items-center justify-center">
                            <Button>
                              <span tw="mr-2">More Actions</span>
                              <DownOutlined />
                            </Button>
                          </div>
                        </Popover>
                      </>
                    ) : (
                      <>
                        <Popover
                          tw="invisible"
                          placement="bottom"
                          content={bulkList}
                          trigger="click"
                        >
                          <div className="flex items-center justify-center">
                            <Button>
                              <span tw="mr-2">More Actions</span>
                              <DownOutlined />
                            </Button>
                          </div>
                        </Popover>
                      </>
                    )}
                  </div>
                </div>
                <div className="table-responsive">
                  <TableCustom
                    tw="mb-10 w-20"
                    onRow={(record, rowIndex) => {
                      return {
                        onDoubleClick: (event) => {
                          event.preventDefault();
                          setClickedRow(!clickedRow);
                          setClickedId(record.key);
                          setMarginResponsive("400px");
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
