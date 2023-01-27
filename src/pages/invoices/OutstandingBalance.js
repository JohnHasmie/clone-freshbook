import {
  CaretDownOutlined,
  EditOutlined,
  HddOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  RestOutlined,
  RightOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  Card,
  Checkbox,
  Col,
  Form,
  Row,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useHistory, useLocation, useParams, } from "react-router-dom";
import tw from "twin.macro";

import TableCustom from "../../components/Table/index";
import { numberWithDot, translateBg } from "../../components/Utils";

export default function OutstandingBalance() {
  const { Title, Text } = Typography;
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();
const {clientId}=useParams()
const { data: detailClient, status: statusDetailClient } = useQuery(
  "detail-client",
  async (key) => axios.get(`clients/${clientId}`).then((res) => res.data.data)
);
const [filter, setFilter] = useState({
 
client_id:clientId,
status:"send"
});

const { data: dataInvoices, status } = useQuery(
  ["invoices-listing", filter],
  async (key) =>
    axios
      .get("invoices", {
        params: key.queryKey[1],
      })
      .then((res) => res.data.data)
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
      client_id: item?.client_id,
    }));
  console.log(dataInvoices,"data")
  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-lg mb-20">
          <div >
            <div tw="flex items-center mb-4">
              <span
                onClick={() => history.push("/invoices")}
                tw="cursor-pointer text-xl font-bold text-black text-primary"
              >
                All Invoices
              </span>
              <RightOutlined tw=" mx-2" />
             {statusDetailClient === "success" && <span
                onClick={() => history.push(`/clients/${clientId}/client-detail`)}
                tw="cursor-pointer text-xl font-bold text-black text-primary"
              >
                {detailClient?.client?.first_name+ " "+ detailClient?.client?.last_name}
              </span>}
              <RightOutlined tw=" mx-2" />

              <span tw="text-xl font-bold text-black ml-2">
                Outstanding
              </span>
              <span tw="align-middle bg-gray-300 text-black rounded-full px-2  mx-2">
                  {data?.length}
                </span>
            </div>
            {/* <span>IDR Invoices(2)</span> */}
            <div className="table-responsive">
              <TableCustom
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      history.push(`/invoices/${record.key}/invoice-detail`);
                    },
                  };
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-border-space"
              />
            </div>
        
          </div>
        </div>
      </div>
    </>
  );
}
