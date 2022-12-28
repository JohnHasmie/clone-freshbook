import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    List,
    Popover,
    Radio,
    Row,
    Select,
    Space,
    Typography,
  } from "antd";
  import React, { useState } from "react";
  import { useHistory, useLocation } from "react-router-dom";
  import tw from "twin.macro";

  import { bell, toggler } from "../../components/Icons";
  import ButtonCustom from "../../components/Button/index";
import { SettingButton } from "../invoices/NewInvoice.style";
import ButtonMore from "../../components/Reports/ButtonMore";
import SendEmail from "../../components/Reports/SendEmail";
import CardDetailInvoice from "../../components/CardDetailInvoice";
import InvoiceHead from "../invoices/InvoiceHead";
import InvoiceLines from "../invoices/InvoiceLines";
import Filter from "../../components/Reports/Filter";
import TextArea from "antd/lib/input/TextArea";
  
  export default function NewRecurringTemplate() {
    const [open, setOpen] = useState(false);
    const {pathname}=useLocation()
    const [inputwidth, setinputWidth] = useState(50);

    const onChange = (e) => {
      let length = e.target.value.length;
      setIsForm({ ...isForm, [e.target.name]: e.target.value });

      if (length === 0) {
        setinputWidth(50);
      }
      if (inputwidth <= 100) {
         setinputWidth(50 + e.target.value.length * 5);
      }
    };
    const [clicked, setClicked] = useState(false);
    const handleClickChange = (open) => {
      setClicked(open);
    };
    const hide = () => {
      setClicked(false);
    };
    const { Title } = Typography;
    let history = useHistory();
    const [isForm, setIsForm] = useState({
      name: "Oasis Land",
      phone: "Phone Number",
      address: "Wates Wetan 03/05",
      district: "Bangsri, Purwantoro",
      city: "Wonogiri",
      zip: "57695",
      country: "Indonesia",
    });
  const [form]=Form.useForm();

  
  
    const handleInput = (e) => {
      setIsForm({ ...isForm, [e.target.name]: e.target.value });
    };
    const onFinish = (values) => {
      console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const RecurringSettings = (
      <div>
        <div tw="flex justify-between ">
          <Title level={3}>Settings</Title>
        </div>
        <List
          itemLayout="horizontal"
          dataSource={[
            {
              title: "Make Recurring",
              desc: "Bill your clients automatically",
            },
          ]}
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
            <span tw="capitalize text-4xl font-bold text-black">{pathname.includes("edit")? 'Edit Recurring Template' :'New Recurring Template'}</span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
            <ButtonMore tw="!py-2" onClick={() => history.goBack()}>
              <span>Cancel</span>
            </ButtonMore>
            <Button tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center ">
              <span tw="text-lg">Save...</span>
            </Button>
            <Popover placement="bottom" content={<SendEmail hide={hide}/>} trigger="click" visible={clicked}  onVisibleChange={handleClickChange}>
              <Button tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center ">
                <span tw="text-lg">Send To...</span>
              </Button>
            </Popover>
          </div>
        </div>
  
        <Form size="default"
        layout={'vertical'}
        form={form}
        tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5 mt-10 md:mt-2">
          <CardDetailInvoice tw="md:col-span-9 mb-10 mt-10 md:mt-2">
            <div tw="grid gap-y-2 md:flex justify-between mb-10">
              <img
                src="https://source.unsplash.com/200x200?company"
                alt="profile company"
                tw="w-screen md:w-auto"
              />
              <div tw="flex justify-between">
                <div tw="mr-3">
                  <Input
                    name="name"
                    value={isForm.name}
                    onChange={handleInput}
                    tw="w-fit"
                    // onChange={onChange} style={{ width: inputwidth }}
                  />
                </div>
                <div tw="flex flex-col items-end">
                  <span>
                    <input
                      type="text"
                      name="address"
                      value={isForm.address}
                      onChange={handleInput}
                      tw=" w-32 text-sm"
                    />
                  </span>
                  <span>
                    <input
                      type="text"
                      name="district"
                      value={isForm.district}
                      onChange={handleInput}
                      tw=" w-[130px] text-sm"
                    />
                  </span>
                  <span>
                    <input
                      type="text"
                      name="city"
                      value={isForm.city}
                      onChange={handleInput}
                      tw=" w-20 text-sm"
                    />
                  </span>
                  <span>
                    <input
                      type="text"
                      name="zip"
                      value={isForm.zip}
                      onChange={handleInput}
                      tw=" w-20 text-sm"
                    />
                  </span>
                  <span>
                    <input
                      type="text"
                      name="country"
                      value={isForm.country}
                      onChange={handleInput}
                      tw=" w-20 text-sm"
                    />
                  </span>
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
  
            <div tw="grid grid-cols-12 mt-10 ">
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
                    <td tw=" text-right align-top text-gray-400">Amount Due</td>
  
                    <td tw=" grid gap-0 items-end ">
                      <span tw="font-semibold ">$6,000.00</span>
                      <span tw="text-gray-600 text-right">USD</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div tw="grid gap-y-5 mb-20">
           <div>
             <h3 tw="text-sm">Notes</h3>
             <TextArea tw="border-0" name="notes" placeholder="Enter notes or bank transfer details (optional)"  autoSize />
           </div>
           <div>
             <h3 tw="text-sm">Terms</h3>
             <TextArea tw="border-0" name="terms" placeholder="Enter terms or conditions (optional)"  autoSize />
           </div>
            </div>
          </CardDetailInvoice>
          <Filter Filtering={RecurringSettings} setOpen={setOpen} open={true} />
        </Form>
      </div>
    );
  }
  