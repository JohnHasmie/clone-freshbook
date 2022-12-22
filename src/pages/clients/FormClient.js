import { InfoOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, notification, Select, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import { countryList } from "../../components/Countries";
import ButtonMore from "../../components/Reports/ButtonMore";
import { bell, toggler } from "../../components/Icons";
import ButtonCustom from "../../components/Button/index";
import ClientSetting from "./ClientSetting";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

export default function FormClient() {

  let history = useHistory();
  const [isForm, setIsForm] = useState({
    first_name:'',
    last_name:"",
    company_name:'',
    email:"",
    phone:"",
    business_phone:"",
    mobile_phone:"",
    country:"Indonesia",
    state:"",
    city:"",
    zip:"",
    address:"",
    address_2:"",
    tax_name:"VAT Number",
    tax_number:""
  })
  const queryClient = useQueryClient();
const {pathname}=useLocation()
const {clientId}= useParams()
const { data: detailClient, status:statusDetailClient } = useQuery(
  "detail-client-form",
  async (key) =>
    axios
      .get(`clients/${clientId}`)
      .then((res) => res.data.data)
);

useEffect(() => {
 detailClient && setIsForm(
  {
    first_name: detailClient?.client.first_name,
    last_name: detailClient?.client.last_name,
    company_name: detailClient?.client.company_name,
    email: detailClient?.client.email,
    phone: detailClient?.client.phone,
    business_phone: "",
    mobile_phone: "",
    country: detailClient?.client.country,
    state: "",
    city: detailClient?.client.city,
    zip: detailClient?.client.zip,
    address: detailClient?.client.address,
    address_2: "",
    tax_name: "",
    tax_number: ""
  }
 )
}, [detailClient])

  const [open, setOpen] = useState({
    sendReminders: false,
    charge: false,
    currency: false,
    invoiceAttachment: false,
    opened: false,
  });
  const [isAdd, setIsAdd] = useState({
    business_phone: false,
    mobile_phone: false,
    address: false,
  });

  const handleIsAdd = (type) => {
    switch (type) {
      case "business_phone":
        setIsAdd({
          ...isAdd,
          business_phone: true,
        });
        break;
      case "mobile_phone":
        setIsAdd({
          ...isAdd,
          mobile_phone: true,
        });
        break;
      case "address":
        setIsAdd({
          ...isAdd,
          address: true,
        });
        break;

      default:
        setIsAdd({
          business_phone: false,
          mobile_phone: false,
          address: false,
        });
        break;
    }
  };
  const mutation = useMutation(
    async (data) => {
      return axios.post("clients", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("clients");
        notification.success({
          message: `${res.data.client.company_name} has been created`,
          description:(<div tw="grid">
            <span>How sweet it is</span>
            <span tw="cursor-pointer text-primary" onClick={()=>history.push(`/clients/${res.data.client.id}/client-detail`)} >View Client</span>
          </div>),
          placement: "topLeft",
        });
        history.push('/clients')
        console.log(res);
      },
      onError: (err) => {
        notification.error({
          message: err.response.data.message,
          placement: "topLeft",
        });
      },
    }
  );


  const mutationEdit = useMutation(
    async (data) => {
      return axios.put(`clients/${clientId}`, data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("detail-client");
        notification.success({
          message: `${res.data.client.company_name} has been updated`,
       
          placement: "topLeft",
        });
        history.push(`/clients/${clientId}/client-detail`)
        console.log(res);
      },
      onError: (err) => {
        notification.error({
          message: err.response.data.message,
          placement: "topLeft",
        });
      },
    }
  );


  const [form] = Form.useForm();
  const handleFinish = (values) => {
    if(pathname.includes('edit')){
      mutationEdit.mutate(isForm)
    }else{
    mutation.mutate(isForm)}
  };
  const onChange = (e) => {
    setIsForm({ ...isForm, [e.target.name]: e.target.value });
  };

  console.log(isForm,"cek");
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
          <span tw="capitalize text-4xl font-bold text-black">{pathname.includes("edit") ? 'Edit' : 'New'} Client</span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <ButtonMore onClick={() => history.goBack()}>
            <span>Cancel</span>
          </ButtonMore>
          <Button
            onClick={() => form.submit()}
            tw="!py-2 ml-2 bg-success text-white px-4 h-auto flex items-center "
          >
            <span tw="text-lg">Save</span>
          </Button>
        </div>
      </div>

      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5">
        <CardReporting tw="md:col-span-8 mb-10 mt-10 md:mt-2">
          <span tw=" text-gray-500">
            <InfoOutlined tw="mr-1 rounded-full border p-0.5" /> Either First
            and Last Name or Company Name is required to save this Client.
          </span>
          <Form
            form={form}
            onFinish={handleFinish}
            layout="vertical"
        
            scrollToFirstError
            fields={[
              {
                name: ["first_name"],
                value: isForm.first_name,
              },
              {
                name: ["last_name"],
                value: isForm.last_name,
              },
              {
                name: ["company_name"],
                value: isForm.company_name,
              },
              {
                name: ["email"],
                value: isForm.email,
              },
              {
                name: ["phone"],
                value: isForm.phone,
              },
            
            
              {
                name: ["business_phone"],
                value: isForm.business_phone,
              },
              {
                name: ["mobile_phone"],
                value: isForm.mobile_phone,
              },
              {
                name: ["country"],
                value: isForm.country,
              },
              {
                name: ["address"],
                value: isForm.address,
              },
              {
                name: ["address_2"],
                value: isForm.address_2,
              },
              {
                name: ["city"],
                value: isForm.city,
              },
  
              {
                name: ["state"],
                value: isForm.state,
              },
              {
                name: ["zip"],
                value: isForm.zip,
              },
              {
                name: ["tax_number"],
                value: isForm.tax_number,
              },
              {
                name: ["tax_name"],
                value: isForm.tax_name,
              },
            ]}
          >
            <div tw="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
              <div tw="col-span-2 md:col-span-1">
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "First & Last Name or Company is required",
                    },
                  ]}
                  
                >
                  <Input tw="!h-10" onChange={onChange} name="first_name" type="text" />
                </Form.Item>
              </div>
              <div tw="col-span-2 md:col-span-1">
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "First & Last Name or Company is required",
                    },
                  ]}
                >
                  <Input tw="!h-10" onChange={onChange} name="last_name" type="text" />
                </Form.Item>
              </div>
              <div tw="col-span-2">
                <Form.Item
                  label="Company Name"
                  name="company_name"
                  rules={[
                    {
                      required: true,
                      message: "First & Last Name or Company is required",
                    },
                  ]}
                >
                  <Input tw="!h-10" onChange={onChange} name="company_name" type="text" />
                </Form.Item>
              </div>
              <Divider tw="col-span-2" />
              <div tw="col-span-2 w-6/12">
                <Form.Item label="Email Address" name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "This email is invalid.",
                  }
                ]}
                >
                  <Input tw="!h-10" onChange={onChange} name="email" type="email" />
                </Form.Item>
              </div>
              <div tw="col-span-2 w-6/12">
                <Form.Item label="Phone Number" name="phone">
                  <Input tw="!h-10" onChange={onChange} name="phone" type="number" />
                </Form.Item>
              </div>
              {isAdd.business_phone ? (
                <div tw="col-span-2 w-6/12">
                  <Form.Item
                    label="Business Phone Number"
                    name="business_phone"
                  >
                    <Input tw="!h-10" onChange={onChange} name="business_phone" type="text" />
                  </Form.Item>
                </div>
              ) : (
                <div tw="col-span-2 w-6/12">
                  <span
                    onClick={() => handleIsAdd("business_phone")}
                    tw="cursor-pointer text-primary hover:text-blue-400"
                  >
                    <PlusOutlined tw="text-lg" />
                    <span>Add Business Phone</span>
                  </span>
                </div>
              )}

              {isAdd.mobile_phone ? (
                <div tw="col-span-2 w-6/12">
                  <Form.Item
                    label="Mobile Phone Number"
                    name="mobile_phone"
                  >
                    <Input tw="!h-10" onChange={onChange} name="mobile_phone" type="text" />
                  </Form.Item>
                </div>
              ) : (
                <div tw="col-span-2 w-6/12">
                  <span
                    onClick={() => handleIsAdd("mobile_phone")}
                    tw="cursor-pointer text-primary hover:text-blue-400"
                  >
                    <PlusOutlined tw="text-lg" />
                    <span>Add Mobile Phone</span>
                  </span>
                </div>
              )}
              <Divider tw="col-span-2" />
              {isAdd.address ? (
                <>
                  <div tw="col-span-2 w-6/12">
                    <Form.Item label="Country" name="country">
                      <Select
                       onChange={(e) =>
                        onChange({
                          target: { value: e, name: "country" },
                        })
                      }
                        options={countryList.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2">
                    <Form.Item label="Address Line 1" name="address">
                      <Input tw="!h-10" onChange={onChange} name="address" type="text" />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2">
                    <Form.Item label="Address Line 2" name="address_2">
                      <Input tw="!h-10" onChange={onChange} name="address_2" type="text" />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2 w-6/12">
                    <Form.Item label="City" name="city">
                      <Input tw="!h-10" onChange={onChange} name="city" type="text" />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2 w-6/12">
                    <Form.Item label="State" name="state">
                      <Input tw="!h-10" onChange={onChange} name="state" type="text" />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2 w-6/12">
                    <Form.Item label="ZIP Code" name="zip">
                      <Input tw="!h-10" onChange={onChange} name="zip" type="text" />
                    </Form.Item>
                  </div>
                  <Divider tw="col-span-2" />
                  <div>
                    <Form.Item label="Tax Name" name="tax_name">
                      <Input tw="!h-10" onChange={onChange} name="tax_name" type="text"  />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item label="Tax Number" name="tax_number">
                      <Input tw="!h-10" onChange={onChange} name="tax_number" type="text" />
                    </Form.Item>
                  </div>
                </>
              ) : (
                <div tw="col-span-2 w-6/12">
                  <span
                    onClick={() => handleIsAdd("address")}
                    tw="cursor-pointer text-primary hover:text-blue-400"
                  >
                    <PlusOutlined tw="text-lg" />
                    <span>Add Address</span>
                  </span>
                </div>
              )}
            </div>
          </Form>
        </CardReporting>
        <ClientSetting open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}
