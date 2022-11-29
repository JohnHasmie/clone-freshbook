import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Checkbox, Collapse, Popover, Table, Typography } from "antd";

import React, { useState } from "react";
import tw from "twin.macro";
import CardDetailInvoice from "../../components/CardDetailInvoice";
import PopupNewInvoice from "./PopupNewInvoice";



export default function Detail() {
    const { Title } = Typography;
    const [checked, setChecked] = useState(false);
  
    const columns = [
        {
          title: (
            <Checkbox
              className="font-normal"
              onChange={() => setChecked(!checked)}
            />
          ),
          dataIndex: "checkbox",
          key: "checkbox",
        },
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
          title: "Amount / Status",
          key: "amount",
          dataIndex: "amount",
        },
      ];
    
      const data = [
        {
          key: "1",
          checkbox: (
            <Checkbox
              className="font-normal"
              checked={checked}
              onChange={(e) => console.log(e.target.value)}
            />
          ),
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
          amount: <div>
          <h3>$6,000.000 USD</h3>
          <p>Sent</p>
        </div>,
        },
    
      
      ];
  return (
    <>
      <div className="layout-content">
    
        <div tw="grid grid-cols-12 justify-items-center">
          <div tw="col-span-11 mb-10">
            <p>
              {" "}
              <ExclamationCircleOutlined tw="mr-2" />
              Company Name has{" "}
              <span tw="text-primary underline">
                1 outstanding invoices
              </span>{" "}
              totalling $6,000.00 USD
            </p>
            <CardDetailInvoice>
              <div tw="flex justify-between mb-10">
                <img
                  src="https://source.unsplash.com/200x200?company"
                  alt="profile company"
                />
                <div tw="flex justify-between">
                  <div tw="mr-3">Oasis Land</div>
                  <div tw="flex flex-col items-end">
                    <span>Wates Wetan 03/05</span>
                    <span>Bangsri, Purwantoro</span>
                    <span>Wonogiri</span>
                    <span>57695</span>
                    <span>Indonesia</span>
                  </div>
                </div>
              </div>
              <div tw="grid grid-cols-4 mb-16">
                <div tw="grid gap-0">
                  <span tw="text-gray-400">Billed To</span>
                  <span tw="text-xs">First Client</span>
                  <span tw="text-xs">Company Name</span>
                  <span tw="text-xs">Apt Building</span>
                  <span tw="text-xs">Jakarta, DKI Jakarta</span>
                  <span tw="text-xs">40555</span>
                  <span tw="text-xs">Indonesia</span>
                </div>
                <div tw="grid gap-0 ">
                  <span tw="text-gray-400">Date of Issue</span>
                  <span tw="text-xs ">25/10/2022</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>

                  <span tw="text-gray-400">Due Date</span>
                  <span tw="text-xs ">24/11/2022s</span>

                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                </div>
                <div tw="grid gap-0">
                  <span tw="text-gray-400">Invoice Number</span>
                  <span tw="text-xs">00148</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                </div>
                <div tw="grid gap-0 text-right">
                  <span tw="text-gray-400">Amount Due (USD)</span>
                  <span tw="font-bold text-xl ">$6,000.00</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
                  <span tw="invisible text-xs">hide</span>
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
                  <tr tw="border-b text-sm  border-gray-300 text-right">
                    <th tw="grid text-left py-2">
                      <span>Frontend Development</span>
                      <span tw="text-xs">
                        PSD to HTML conversion service for Open Trolley (30
                        pages)
                      </span>
                    </th>
                    <td>$6,000.00</td>
                    <td></td>
                    <td>1</td>

                    <td>$6,000.00</td>
                  </tr>
                </tbody>
              </table>

              <div tw="grid grid-cols-12 mt-10 mb-20">
                <div tw="col-span-8"></div>

                <table tw="col-span-4">
                  <tbody>
                    <tr tw="text-right">
                      <td>Subtotal</td>
                      <td>6,000.00</td>
                    </tr>
                    <tr tw="border-b  border-gray-300 text-right">
                      <td>Tax</td>
                      <td>0.00</td>
                    </tr>
                    <tr tw="text-right ">
                      <td tw="pt-1">Total</td>
                      <td>6,000.00</td>
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
                        <span tw="font-semibold ">$6,000.00</span>
                        <span tw="text-gray-600 text-right">USD</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </CardDetailInvoice>
            <div tw="mt-20">
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  
                }}
              >
                 <div tw="flex items-center ">
            <Title level={4}>All Payment for Invoices 00148 </Title>
            <Popover placement="top" content={PopupNewInvoice} trigger="click">

            <PlusOutlined tw='ml-2 text-white bg-success text-base  px-2 rounded-md font-bold pt-0.5 pb-0 cursor-pointer -mt-3  '/>
         </Popover>
          </div>
               
              </div>
              <div className="table-responsive">
                <Table
                tw='mb-10'
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
