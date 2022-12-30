import {
  Button,
  DatePicker,
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
  Upload,
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
import { countryList } from "../../components/Countries";
import { AutoCompleteCustom, DatePickerCustom } from "./ReportCustom.style";
import { UploadCustom } from "./UploadCustom.style";
import moment from "moment";
import { numberWithDot } from "../../components/Utils";

export default function FormRecurringTemplate() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const [inputwidth, setinputWidth] = useState(50);

  const [clicked, setClicked] = useState(false);
  const [lines, setLines] = useState([])

  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  const { Title } = Typography;
  let history = useHistory();
  const [isForm, setIsForm] = useState({
    name: "",
    phone: "",
    address: "",
    address_2: "",
    district: "Bangsri, Purwantoro",
    city: "",
    state: "",
    zip: "",
    country: "Indonesia",
    tax_name: "VAT NUMBER",
    tax_number: "",
    invoice_number:"00138",
    reference:""
  });
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";

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

  const [fileList, setFileList] = useState([]);
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
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
          <span tw="capitalize text-4xl font-bold text-black">
            {pathname.includes("edit")
              ? "Edit Recurring Template"
              : "New Recurring Template"}
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <ButtonMore tw="!py-2" onClick={() => history.goBack()}>
            <span>Cancel</span>
          </ButtonMore>
          <Button tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center ">
            <span tw="text-lg">Save...</span>
          </Button>
          <Popover
            placement="bottom"
            content={<SendEmail hide={hide} />}
            trigger="click"
            visible={clicked}
            onVisibleChange={handleClickChange}
          >
            <Button tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center ">
              <span tw="text-lg">Send To...</span>
            </Button>
          </Popover>
        </div>
      </div>

      <Form
        size="default"
        layout={"vertical"}
        form={form}
        tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5 mt-10 md:mt-2"
      >
        <CardDetailInvoice tw="md:col-span-9 mb-10 mt-10 md:mt-2">
          <div tw="grid gap-y-2 md:flex justify-between mb-10">
            {/* <img
              src="https://source.unsplash.com/200x200?company"
              alt="profile company"
              tw="w-screen md:w-auto"
            /> */}
            <UploadCustom
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
            >
              {fileList.length < 1 && "+ Upload"}
            </UploadCustom>
            <div tw="flex justify-between ">
              <div tw="flex flex-col items-end">
                {/* <input
                  name="name"
                  value={isForm.name}
                  onChange={handleInput}
                  tw="text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                  autoComplete="off"
                  placeholder="Company Name"
                  style={{
                    minWidth: "110px",
                    width:
                      isForm.name.length < 20
                        ? 50 + isForm.name.length * 5 + "px"
                        : 70 + isForm.name.length * 6 + "px",
                    maxWidth: "320px",
                  }}
                /> */}
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="editable"
                  data-placeholder="Company Name"
                  tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                  onInput={(e) =>
                    handleInput({
                      target: { value: e.target.innerHTML, name: "name" },
                    })
                  }
                  html={isForm.name}
                >
                  
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="editable"
                  data-placeholder="Phone Number"
                  tw="max-w-[300px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                  onInput={(e) =>
                    handleInput({
                      target: { value: e.target.innerHTML, name: "phone" },
                    })
                  }
                  html={isForm.phone}
                >
             
                </span>
              </div>
              <div tw="flex flex-col items-end">
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="editable"
                  data-placeholder="Address Line 1"
                  tw="max-w-[200px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                  onInput={(e) =>
                    handleInput({
                      target: { value: e.target.innerHTML, name: "address" },
                    })
                  }
                  html={isForm.address}
                >
                  
                </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="editable"
                  data-placeholder="Address Line 2"
                  tw="max-w-[200px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                  onInput={(e) =>
                    handleInput({
                      target: { value: e.target.innerHTML, name: "address_2" },
                    })
                  }
                  html={isForm.address_2}
                >
                  
                </span>
                <div tw="flex">
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="City"
                    tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "city" },
                      })
                    }
                    html={isForm.city}
                  >
                    
                  </span>
                  <span>,</span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="State"
                    tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "state" },
                      })
                    }
                    html={isForm.state}
                  >
                    
                  </span>
                </div>

                <span
                  contentEditable
                  suppressContentEditableWarning
                  className="editable"
                  data-placeholder="ZIP Code"
                  tw="max-w-[100px] min-w-[50px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                  onInput={(e) =>
                    handleInput({
                      target: { value: e.target.innerHTML, name: "zip" },
                    })
                  }
                  html={isForm.zip}
                >
                  
                </span>

                <AutoCompleteCustom
                  style={{
                    width: 100,
                  }}
                  onChange={(e) =>
                    handleInput({
                      target: { value: e, name: "country" },
                    })
                  }
                  options={countryList.map((item) => ({
                    value: item,
                  }))}
                  value={isForm.country}
                  placeholder="Country"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
                <div tw="flex">
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Tax Name"
                    tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: { value: e.target.innerHTML, name: "tax_name" },
                      })
                    }
                    html={isForm.tax_name}
                  >
                    
                  </span>
                  <span>,</span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Tax Number"
                    tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: {
                          value: e.target.innerHTML,
                          name: "tax_number",
                        },
                      })
                    }
                    html={isForm.tax_number}
                  >
                    
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div tw="grid grid-cols-4 mb-16">
            <InvoiceHead />
            <div tw="space-y-5 ">
             <div>
               <h4 tw="text-gray-400">Date of Issue</h4>
              
               <DatePickerCustom
                 bordered={false}
                 defaultValue={moment("25/10/2022", dateFormat)}
                 format={dateFormat}
               />
             </div>
              

             <div>
               <h4 tw="text-gray-400">Due Date</h4>
               <DatePickerCustom
                 bordered={false}
                 defaultValue={moment("24/11/2022", dateFormat)}
                 format={dateFormat}
               />
              
             </div>
            
            </div>
            <div tw="space-y-5 ">
              <div>
                <h4 tw="text-gray-400">Invoice Number</h4>
                
                <span tw="text-xs">{isForm.invoice_number}</span>
              </div>
           
              <div>
                <h4 tw="text-gray-400">Reference</h4>
                <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Enter value (e.g. PO #)"
                    tw="max-w-[100px] min-w-[30px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
              
                      handleInput({
                        target: { value: e.target.innerHTML, name: "reference" },
                      })
                    }
                    html={isForm.reference}
                  >
                  </span>
              </div>
            </div>
            <div tw="text-right">
              <h3 tw="text-gray-400">Amount Due (IDR)</h3>
              <span tw="font-medium text-3xl ">{lines && getTotal(lines?.map(x=>x.total))}</span>
             
            </div>
          </div>

          <InvoiceLines linesProps={[lines, setLines]} />

          <div tw="grid grid-cols-12 mt-10 ">
            <div tw="col-span-8"></div>
            <table tw="col-span-4">
              <tbody>
                <tr tw="text-right">
                  <td>Subtotal</td>
                  <td>{lines && getTotal(lines?.map(x=>x.total))}</td>
                </tr>
                <tr tw="border-b  border-gray-300 text-right">
                  <td>Tax</td>
                  <td>0.00</td>
                </tr>
                <tr tw="text-right ">
                  <td tw="pt-1">Total</td>
                  <td>{lines && getTotal(lines?.map(x=>x.total))}</td>
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
                    <span tw="font-semibold ">{lines && getTotal(lines?.map(x=>x.total))}</span>
                    <span tw="text-gray-600 text-right">USD</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div tw="grid gap-y-5 mb-20">
            <div>
              <h3 tw="text-sm">Notes</h3>
              <TextArea
                tw="border-0"
                name="notes"
                placeholder="Enter notes or bank transfer details (optional)"
                autoSize
              />
            </div>
            <div>
              <h3 tw="text-sm">Terms</h3>
              <TextArea
                tw="border-0"
                name="terms"
                placeholder="Enter terms or conditions (optional)"
                autoSize
              />
            </div>
          </div>
        </CardDetailInvoice>
        <Filter Filtering={RecurringSettings} setOpen={setOpen} open={true} />
      </Form>
    </div>
  );
}
export function getTotal(v) {
  const sum = v.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return `Rp${numberWithDot(sum)}`
}