import {
  Button,
  Card,

  Form,
  
  List,
  notification,
  Popover,
  
  Typography,

} from "antd";
import React, { useState,useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import tw from "twin.macro";

import { bell, toggler } from "../../components/Icons";
import ButtonCustom from "../../components/Button/index";
import { SettingButton } from "./NewInvoice.style";
import ButtonMore from "../../components/Reports/ButtonMore";
import SendEmail from "../../components/Reports/SendEmail";
import CardDetailInvoice from "../../components/CardDetailInvoice";
import InvoiceHead from "./InvoiceHead";
import InvoiceLines from "./InvoiceLines";
import Filter from "../../components/Reports/Filter";
import TextArea from "antd/lib/input/TextArea";
import { countryList } from "../../components/Countries";
import moment from "moment";
import { numberWithDot } from "../../components/Utils";
import {
  AutoCompleteCustom,
  DatePickerCustom,
  UploadCustom,
} from "../report/ReportCustom.style";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function FormInvoice() {
  const [open, setOpen] = useState(false);
  const [isTitle, setIsTitle] = useState("Invoice");

  const { pathname } = useLocation();
  const {invoiceId}=useParams()

  const [clicked, setClicked] = useState(false);
  const [lines, setLines] = useState([]);

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
    district: "",
    city: "",
    state: "",
    zip: "",
    country: "Indonesia",
    tax_name: "VAT NUMBER",
    tax_number: "",
    code: "",
    reference: "",
    issued_at: new Date(),
    due_date: new Date(),
    notes: "",
    terms: "",
  });
  const [filter, setFilter] = useState({
    limit_comment: 1,
  });
  const [isClient, setIsClient] = useState("");
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const queryClient = useQueryClient();


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
  if(pathname.includes('recurring')){
    setIsTitle("Recurring")
  }
}, [pathname])


  useEffect(() => {
  if(status === "success"){
  setIsForm({...isForm,
  code:detailInvoice.code,
  notes:detailInvoice.notes,
  terms:detailInvoice.terms,
  issued_at:detailInvoice.issued_at,
  due_date:detailInvoice.due_date,
  reference:detailInvoice.references,
  })
  if(detailInvoice?.items_detail !== null){
    const newLines= detailInvoice?.items_detail?.map(x=>{
      return { 
        name: x.name,
                description: x.description,
                rate:x.rate,
                qty: x.pivot.qty,
                total: x.pivot.total,
                id:x.id
      }
    })
  setLines(newLines)}
  setIsClient(detailInvoice.client_id)}
  }, [status])

  const handleInput = (e) => {
    setIsForm({ ...isForm, [e.target.name]: e.target.value });
  };
  const mutation = useMutation(
    async (data) => {
      return axios.post("invoices", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("invoices-listing");
        notification.success({
          message: `Invoice has been saved`,
          placement: "topLeft",
        });
        history.push("/invoices");
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        console.log(err.response.data.message);
      },
    }
  );

  const mutationUpdate = useMutation(
    async (data) => {
      return axios.put(`invoices/${invoiceId}`, data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("invoices-listing");
        notification.success({
          message: `Invoice has been updated`,
          placement: "topLeft",
        });
        history.push("/invoices");
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        console.log(err.response.data.message);
      },
    }
  );
  const onFinish = (values) => {
  form.submit()
    const newData = {
      ...isForm,
      items: lines,
      client_id: isClient,

      attachments: [
        {
          name: "download.png",
          size: 3764,
          url: "http://cleanbook.test/storage/file/94ae97b91fdb448cfbca702edcda717a.png",
        },
        {
          name: "download.png",
          size: 3764,
          url: "http://cleanbook.test/storage/file/94ae97b91fdb448cfbca702edcda717a.png",
        },
      ],
    };
    if(invoiceId){
      mutationUpdate.mutate(newData)
    }else{
    mutation.mutate(newData);}
    console.log("Success submitted:", newData);
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

  const [fileListAttach, setFileListAttach] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const onChangeAttach = ({ fileList: newFileList }) => {
    setFileListAttach(newFileList);
  };
  const onPreviewAttach = async (file) => {
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
            {pathname.includes("edit") ? `Edit ${isTitle}` : `New ${isTitle}`}
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <ButtonMore tw="!py-2" onClick={() => history.goBack()}>
            <span>Cancel</span>
          </ButtonMore>
          <Button
            tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex justify-center items-center "
            onClick={onFinish}
          >
            <span tw="text-lg">Save...</span>
          </Button>
          {!pathname.includes("recurring") && (
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
          )}
        </div>
      </div>

      <Form
        size="default"
        layout={"vertical"}
        form={form}
        // onFinish={onFinish}
        tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5 mt-10 md:mt-2"
     
      >
        <div tw="md:col-span-9 space-y-5 mb-10 mt-10 md:mt-2">
          <CardDetailInvoice>
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
                  ></span>
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
                  ></span>
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
                  ></span>
                  <span
                    contentEditable
                    suppressContentEditableWarning
                    className="editable"
                    data-placeholder="Address Line 2"
                    tw="max-w-[200px] min-w-[100px] whitespace-nowrap	overflow-x-hidden text-sm focus:outline-offset-4 focus:outline-2 focus:outline-sky-500 rounded-md focus:border-2 focus:border-gray-400 focus:ring-1 focus:ring-sky-500 border-2 border-transparent"
                    onInput={(e) =>
                      handleInput({
                        target: {
                          value: e.target.innerHTML,
                          name: "address_2",
                        },
                      })
                    }
                    html={isForm.address_2}
                  ></span>
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
                    ></span>
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
                    ></span>
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
                  ></span>

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
                          target: {
                            value: e.target.innerHTML,
                            name: "tax_name",
                          },
                        })
                      }
                      html={isForm.tax_name}
                    ></span>
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
                    ></span>
                  </div>
                </div>
              </div>
            </div>
            <div tw="grid grid-cols-4 gap-5 mb-16">
              <InvoiceHead clientProps={[isClient, setIsClient]} />
              <div tw="space-y-5 ">
                <div>
                  <h4 tw="text-gray-400">Date of Issue</h4>

                  <DatePickerCustom
                    bordered={false}
                    onChange={(date, dateString) =>
                      setIsForm({ ...isForm, issued_at: dateString })
                    }
                    value={moment(isForm.issued_at, dateFormat)}
                    format={dateFormat}
                  />
                </div>

                <div>
                  <h4 tw="text-gray-400">Due Date</h4>
                  <DatePickerCustom
                    bordered={false}
                    onChange={(date, dateString) =>
                      setIsForm({ ...isForm, due_date: dateString })
                    }
                    value={moment(isForm.due_date, dateFormat)}
                    format={dateFormat}
                  />
                </div>
              </div>
              <div tw="space-y-5 ">
                <div>
                  <h4 tw="text-gray-400">Invoice Number</h4>

                  <span tw="text-xs">{isForm.code}</span>
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
                        target: {
                          value: e.target.innerHTML,
                          name: "reference",
                        },
                      })
                    }
                    html={isForm.reference}
                  ></span>
                </div>
              </div>
              <div tw="text-right">
                <h3 tw="text-gray-400">Amount Due (IDR)</h3>
                <span tw="font-medium text-3xl ">
                  {lines.length > 0 && getTotal(lines?.map((x) => { const splitAmount=x.total.split(".")
  return parseInt(splitAmount[0])}))}
                </span>
              </div>
            </div>

            <InvoiceLines linesProps={[lines, setLines]} />

            <div tw="grid grid-cols-12 mt-10 ">
              <div tw="col-span-8"></div>
              <table tw="col-span-4">
                <tbody>
                  <tr tw="text-right">
                    <td>Subtotal</td>
                    <td> {lines.length > 0 && getTotal(lines?.map((x) => { const splitAmount=x.total.split(".")
  return parseInt(splitAmount[0])}))}</td>
                  </tr>
                  <tr tw="border-b  border-gray-300 text-right">
                    <td>Tax</td>
                    <td>0.00</td>
                  </tr>
                  <tr tw="text-right ">
                    <td tw="pt-1">Total</td>
                    <td>  {lines.length > 0 && getTotal(lines?.map((x) => { const splitAmount=x.total.split(".")
  return parseInt(splitAmount[0])}))} </td>
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
                      <span tw="font-semibold ">
                   {lines.length > 0 && getTotal(lines?.map((x) => { const splitAmount=x.total.split(".")
  return parseInt(splitAmount[0])}))}
                      </span>
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
                  onChange={(e) =>
                    setIsForm({ ...isForm, notes: e.target.value })
                  }
                  value={isForm.notes}
                />
              </div>
              <div>
                <h3 tw="text-sm">Terms</h3>
                <TextArea
                  tw="border-0"
                  name="terms"
                  placeholder="Enter your terms and conditions. (Pro tip: It pays to be polite. FreshBooks invoices that include “please” and “thanks” get paid up to 2 days faster.)"
                  autoSize
                  onChange={(e) =>
                    setIsForm({ ...isForm, terms: e.target.value })
                  }
                  value={isForm.terms}
                />
              </div>
            </div>
          </CardDetailInvoice>
          <Card tw="border-gray-200 rounded-lg">
            <UploadCustom
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileListAttach}
              onChange={onChangeAttach}
              onPreview={onPreviewAttach}
            >
              {fileListAttach?.length < 5 && "+ Add an attachment"}
            </UploadCustom>
          </Card>
        </div>
        <Filter Filtering={RecurringSettings} setOpen={setOpen} open={true} />
      </Form>
    </div>
  );
}
export function getTotal(v) {
  const sum = v.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return `Rp${numberWithDot(sum)}`;
}
function totalIteration(data){
  data?.map(x=>{
    const splitAmount=x.amount.split(".")
    return parseInt(splitAmount[0])
  })
}
