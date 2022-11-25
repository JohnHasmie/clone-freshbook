import {
  DownOutlined,
  LeftOutlined,
  PrinterOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Menu,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardDetailInvoice from "../../components/CardDetailInvoice";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction from "../../components/Reports/MoreAction";
import SendEmail from "../../components/Reports/SendEmail";

export default function NewInvoice() {
  const [open, setOpen] = useState(false);
  const { Title } = Typography;
  let history = useHistory();
const [isForm, setIsForm]=useState({
    name:'Oasis Land',
    phone:'Phone Number',
    address:'Wates Wetan 03/05',
    district:'Bangsri, Purwantoro',
    city:'Wonogiri',
    zip:'57695',
    country:'Indonesia'
})

const handleInput=(e)=>{
setIsForm({...isForm,[e.target.name]:e.target.value})
}
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterAccountAging = (
    <div>
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <p tw="text-base text-primary">Reset All</p>
      </div>
      <span tw="text-black ">AS OF</span>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="time">
              <Select
                defaultValue="today"
                options={[
                  {
                    value: "today",
                    label: "Today",
                  },
                  {
                    value: "last-month",
                    label: "End of Last Month",
                  },
                  {
                    value: "last-quarter",
                    label: "End of Last Quarter",
                  },
                  {
                    value: "last-year",
                    label: "End of Last Year",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Group By" name="group">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="outstanding">Outstanding</Radio>
                  <Radio value="overdue">Overdue</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Currency" name="currency">
              <Select
                defaultValue="usd"
                options={[
                  {
                    value: "usd",
                    label: "USD - US dollar",
                  },
                  {
                    value: "idr",
                    label: "IDR - Rupiah",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={12}>
            <Button tw="text-lg px-8" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Col>
          <Col span={12}>
            <Button tw="text-lg text-white bg-success px-8">Apply</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  console.log(isForm,"is Form");
  return (
    <div tw="max-w-screen-lg mx-auto">
      <div tw="flex justify-between items-center my-2">
        <Title level={2}>New Invoice</Title>

        <div tw="flex ">
            <ButtonMore   onClick={() => history.goBack()}>
              <span>Cancel</span>
            </ButtonMore>
            <Button tw=" ml-2 bg-success text-white px-4 h-auto flex items-center ">
              <span tw="text-lg">Save...</span>
            </Button>
          <Popover placement="bottom" content={SendEmail} trigger="click">
       
            <Button tw=" ml-2 bg-success text-white px-4 h-auto flex items-center ">
              <span tw="text-lg">Send To...</span>
            </Button>
          </Popover>
        </div>
      </div>
      <div tw="grid grid-cols-12 gap-5">
      <CardDetailInvoice tw='col-span-9 mb-10'>
              <div tw="flex justify-between mb-10">
                <img
                  src="https://source.unsplash.com/200x200?company"
                  alt="profile company"
                />
                <div tw="flex justify-between">
                  <div tw="mr-3"><input type="text" name="name" value={isForm.name} onChange={handleInput} tw=" w-20 text-sm"/></div>
                  <div tw="flex flex-col items-end">
                    <span><input type="text" name="address" value={isForm.address} onChange={handleInput} tw=" w-32 text-sm"/></span>
                    <span><input type="text" name="district" value={isForm.district} onChange={handleInput} tw=" w-[130px] text-sm"/></span>
                    <span><input type="text" name="city" value={isForm.city} onChange={handleInput} tw=" w-20 text-sm"/></span>
                    <span><input type="text" name="zip" value={isForm.zip} onChange={handleInput} tw=" w-20 text-sm"/></span>
                    <span><input type="text" name="country" value={isForm.country} onChange={handleInput} tw=" w-20 text-sm"/></span>
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
        <Filter Filtering={FilterAccountAging} setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}
