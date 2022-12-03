import {
  Button,
  Col,
  Divider,
  Form,
  List,
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
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import SendEmail from "../../components/Reports/SendEmail";
import InvoiceHead from "./InvoiceHead";
import InvoiceLines from "./InvoiceLines";
import { SettingButton } from "./NewInvoice.style";
import { bell, toggler } from '../../components/Icons';
import ButtonCustom from '../../components/Button/index';

export default function NewInvoice() {
  const [open, setOpen] = useState(false);
  const { Title } = Typography;
  let history = useHistory();
  const [isForm, setIsForm] = useState({
    name: 'Oasis Land',
    phone: 'Phone Number',
    address: 'Wates Wetan 03/05',
    district: 'Bangsri, Purwantoro',
    city: 'Wonogiri',
    zip: '57695',
    country: 'Indonesia'
  })

  const handleInput = (e) => {
    setIsForm({ ...isForm, [e.target.name]: e.target.value })
  }
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const InvoiceSettings = (
    <div>
      <div tw="flex justify-between ">
        <Title level={3}>Settings</Title>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={[{
          title: 'Make Recurring',
          desc: 'Bill your clients automatically',
        }]}
        renderItem={(item) => (
          <List.Item>
            <SettingButton>
              <strong>{item.title}</strong>
              <span>{item.desc}</span>
            </SettingButton>
          </List.Item>
        )}
      />
    </div>
  );

  console.log(isForm, "is Form");
  return (
    <div tw="max-w-screen-lg mx-auto">
        <div tw="grid grid-cols-1 gap-y-2 md:grid-cols-2 mx-5 mt-5">
          <div tw="flex justify-between md:hidden">
            <div>{bell}</div>
            <ButtonCustom
              tw="!bg-transparent !border-0 hover:opacity-50"
              type="link"
              className="sidebar-toggler"
              // onClick={() => onPress()}
            >
              {toggler}
            </ButtonCustom>
          </div>
          
          <div tw="flex items-center">
            <span tw="capitalize text-4xl font-bold">New Invoice</span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <ButtonMore tw="!py-2" onClick={() => history.goBack()}>
            <span>Cancel</span>
          </ButtonMore>
          <Button tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center ">
            <span tw="text-lg">Save...</span>
          </Button>
          <Popover placement="bottom" content={SendEmail} trigger="click">
            <Button tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center ">
              <span tw="text-lg">Send To...</span>
            </Button>
          </Popover>
          </div>

        </div>
  
      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5 mt-10 md:mt-2">
        <CardDetailInvoice tw="md:col-span-9 mb-10 mt-10 md:mt-2">
          <div tw="grid gap-y-2 md:flex justify-between mb-10">
            <img
              src="https://source.unsplash.com/200x200?company"
              alt="profile company"
              tw="w-screen md:w-auto"
            />
            <div tw="flex justify-between">
              <div tw="mr-3"><input type="text" name="name" value={isForm.name} onChange={handleInput} tw=" w-20 text-sm" /></div>
              <div tw="flex flex-col items-end">
                <span><input type="text" name="address" value={isForm.address} onChange={handleInput} tw=" w-32 text-sm" /></span>
                <span><input type="text" name="district" value={isForm.district} onChange={handleInput} tw=" w-[130px] text-sm" /></span>
                <span><input type="text" name="city" value={isForm.city} onChange={handleInput} tw=" w-20 text-sm" /></span>
                <span><input type="text" name="zip" value={isForm.zip} onChange={handleInput} tw=" w-20 text-sm" /></span>
                <span><input type="text" name="country" value={isForm.country} onChange={handleInput} tw=" w-20 text-sm" /></span>
              </div>
            </div>
          </div>
          <div tw="grid grid-cols-4 mb-16">
            <InvoiceHead />
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

          <InvoiceLines />

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
        <Filter Filtering={InvoiceSettings} setOpen={setOpen} open={true} />
      </div>
    </div>
  );
}
