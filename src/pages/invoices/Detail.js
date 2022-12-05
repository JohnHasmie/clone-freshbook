import {
  DownOutlined,
  EditOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  HddOutlined,
  PlusOutlined,
  RestOutlined,
  RightOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Menu, Popover, Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TableCustom from "../../components/Button copy";
import CardDetailInvoice from "../../components/CardDetailInvoice";
import PopupNewInvoice from "./PopupNewInvoice";
import tw from "twin.macro";

export default function Detail() {
  const { Title } = Typography;
  const [checked, setChecked] = useState([]);
  const [clicked, setClicked] = useState(false);
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  const history = useHistory();
  const handleCheck = (v) => {
    const newChecked = [...checked];
    const findById = newChecked.find((x) => x === v);
    if (findById) {
      const findIndex = checked.indexOf(v);
      newChecked.splice(findIndex, 1);
    } else {
      newChecked.push(v);
    }
    setChecked(newChecked);
  };


  const data = [
    {
      key: "1",
      checkbox: (
        <Checkbox
          className="font-normal"
          value={1}
          checked={checked.includes("1")}
          onChange={(e) => handleCheck(e.target.value)}
        />
      ),
      client_invoice_number: (
        <div>
          <h3>Company Name</h3>
          <p>00148</p>
        </div>
      ),
      description: <span tw="flex items-start">PSD to HTML</span>,

      date: (
        <div>
          <h3>25/10/2022</h3>
          <p>Due in 4 days</p>
        </div>
      ),
      amount: (
        <div tw="text-right relative">
          <div
            className="isVisible"
            tw="absolute bottom-16 right-6 flex invisible rounded-lg bg-white shadow-sm border border-gray-200  "
          >
            <div tw="hover:bg-gray-100   ">
              <Tooltip placement="top" title="More">
                <EllipsisOutlined tw="text-xs px-2 py-1" />
              </Tooltip>
            </div>
          </div>
          <h3 tw="text-base">Rp 0.00 IDR</h3>
          <span tw="bg-gray-300 text-xs rounded p-1">Draft</span>
        </div>
      ),
    },
  ];

  const handleCheckAll = () => {
    const all = data?.map((item) => item.key);
    if (data?.length === checked.length) {
      setChecked([]);
    } else {
      setChecked(all);
    }
  };

  const bulkList = (
    <div >
      <Menu>
        <Menu.Item>
          <div>
            <EditOutlined />
            <span>Edit</span>
          </div>
        </Menu.Item>
        <Menu.Item>
          <div>
            <UndoOutlined />
            <span>Refund</span>
          </div>
        </Menu.Item>

        <Menu.Item>
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
      title: (
        <Checkbox
        checked={data?.length === checked.length}
        className="font-normal"
        onChange={handleCheckAll}
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

 
  return (
    <>
      <div className="layout-content">
        <div tw="grid grid-cols-1 md:grid-cols-12 justify-items-center max-w-screen-lg">
          <div tw="md:col-span-12 mb-10 ">
            <p>
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
            </p>
            <CardDetailInvoice>
              <div tw="grid gap-2 md:flex justify-between mb-10">
                <img
                  src="https://via.placeholder.com/200x200?company"
                  alt="profile company"
                  tw="w-screen md:w-auto"
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
              <div tw="grid grid-cols-2 md:grid-cols-4 mb-16">
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
                <div tw="grid gap-0 md:text-right">
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
           
                <div tw="flex items-center ">
                  <span tw="text-xl font-bold text-black">All Payment for Invoices 00148 </span>
                  <Popover
                    placement="top"
                    content={<PopupNewInvoice hide={hide}/>} trigger="click" visible={clicked}  onVisibleChange={handleClickChange}
                  >
                    <PlusOutlined tw="mx-2 text-white bg-success text-base  px-2 rounded-md font-bold pt-0.5 pb-0 cursor-pointer " />
                  </Popover>
                  {checked.length > 0 ? (
              <>
              
                <Popover placement="bottom" content={bulkList} trigger="click">
                  <div className="flex items-center justify-center">
                    <Button>
                      <span tw="mr-2">More Actions</span>
                      <DownOutlined />
                    </Button>
                  </div>
                </Popover>
              </>
            ):
            <></>
            }
                </div>
              </div>
              <div className="table-responsive">
                <TableCustom
                  tw="mb-10 w-20"
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
