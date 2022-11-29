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
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";

import TableCustom from "../../components/Button copy/index";

export default function OutstandingBalance() {
  const { Title, Text } = Typography;
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [isAdvance, setIsAdvance] = useState(false);
  const [form] = Form.useForm();

  
  const columns = [
   
    {
      title: "Client/Invoice Number",
      dataIndex: "client_invoice_number",
      key: "client_invoice_number",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Isseud Date/Due Date",
      key: "date",
      dataIndex: "date",
    },

    {
      title: "Total Outstanding / Status",
      key: "total_outstanding",
      dataIndex: "total_outstanding",
    },
  ];

  const data = [
    {
      key: "1",
     
      client_invoice_number: (
        <div>
          <h3>Company Name</h3>
          <p>00148</p>
        </div>
      ),
      description: <span tw='flex items-start'>PSD to HTML</span>,

      date: <div>
      <h3>25/10/2022</h3>
      <p>Due in 4 days</p>
    </div>,
      total_outstanding: <div>
      <h3>$6,000.000 USD</h3>
      <p>Sent</p>
    </div>,
    },

  
  ];
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
              <span
                onClick={() => history.push("/clients/1/invoices-detail")}
                tw="cursor-pointer text-xl font-bold text-black text-primary"
              >
                Boni Syahrudin
              </span>
              <RightOutlined tw=" mx-2" />

              <span tw="text-xl font-bold text-black ml-2">
                Outstanding
              </span>
            </div>
<span>IDR Invoices(2)</span>
            <div className="table-responsive">
              <TableCustom
                columns={columns}
                dataSource={data}
                pagination={false}
                className="ant-border-space"
              />
            </div>
            <div tw="flex justify-between mt-5">
              <div>
                <span tw="text-sm text-black font-bold">1-4 of 4 </span>
              </div>
              <div tw="flex flex-col items-center">
                <button
                  onClick={() => history.push("clients/archived")}
                  tw="cursor-pointer border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-200 "
                >
                  View Archived Service
                </button>
                <p tw="text-xs text-gray-500">
                  or{" "}
                  <Link tw="underline text-gray-500" to="clients/deleted">
                    deleted
                  </Link>
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
