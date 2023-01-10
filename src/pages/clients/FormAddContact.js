import { AutoComplete, Button, Form, Input, notification, Select } from "antd";
import React from "react";
import tw from "twin.macro";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import ButtonMore from "../../components/Reports/ButtonMore";
import { styled } from "twin.macro";
import { InputKeyword, SelectKeyword } from "./AdvanceSearch.style";
import { Option } from "antd/lib/mentions";
import { CheckOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function FormAddContact({handleOk ,clientId,data}) {
  const [form]=Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    if(data){
      mutationUpdate.mutate({...values,id:data.key})
    }else{
    mutation.mutate({...values,client_id:clientId})}
    form.resetFields();

    handleOk("modal")
  };
  const queryClient = useQueryClient();

  const mutation = useMutation(
    async (data) => {
      return axios.post("contacts/store", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("contacts-listing");
        notification.success({
          message: `Secondary contact has now been saved.
          `,
          placement: "topLeft",
        });
        

      },
      onError: (err) => {
        switch (err?.response?.status) {
          case 422:
            notification.error({
              message: `Invalid Input`,
              placement: "topLeft",
            });
            break;
            case 500:
              notification.error({
                message: `Internal Server Error`,
                placement: "topLeft",
              });
              break;
        
          default:
            notification.error({
              message: `An Error Occurred Please Try Again Later`,
              placement: "topLeft",
            });
            break;
        }
      },
    }
  );

  const mutationUpdate = useMutation(
    async (data) => {
      return axios.put("contacts", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("contacts-listing");
        notification.success({
          message: `Secondary contact has now been updated.
          `,
          placement: "topLeft",
        });
        

      },
      onError: (err) => {
        switch (err?.response?.status) {
          case 422:
            notification.error({
              message: `Invalid Input`,
              placement: "topLeft",
            });
            break;
            case 500:
              notification.error({
                message: `Internal Server Error`,
                placement: "topLeft",
              });
              break;
        
          default:
            notification.error({
              message: `An Error Occurred Please Try Again Later`,
              placement: "topLeft",
            });
            break;
        }
      },
    }
  );
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size={"large"}
      tw="mt-10"
      fields={   
        [
        {
          name: ["first_name"],
          value: data?.first_name,
        },
        {
          name: ["last_name"],
          value: data?.last_name,
        },
        {
          name: ["email"],
          value: data?.email,
        },
           {
          name: ["phone_1"],
          value: data?.phone_number_1,
        },
        {
          name: ["phone_2"],
          value: data?.phone_number_2,
        }
      ]}
    >
      <div tw="flex">
        <div tw="grid grid-cols-3 gap-3">
          <div>
            <Form.Item label="First Name" name="first_name"  rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}>
              <Input type="text" placeholder="First Name"/>
             
            </Form.Item>
          </div>
        
          <div>
            <Form.Item label="Last Name" name="last_name" rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}>
              <Input type="text" placeholder="Last Name"/>
             
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Email" name="email" rules={[
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}>
              <Input type="text" placeholder="Email"/>
             
            </Form.Item>
          </div>
         
          <div>
            <Form.Item label="Phone 1" name="phone_1" rules={[
                      {
                        required: true,
                        message: "Please input your phone 1!",
                      },
                    ]}>
              <Input type="text" placeholder="Phone 1"/>
             
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Phone 2" name="phone_2">
              <Input type="text" placeholder="Phone 2"/>
             
            </Form.Item>
          </div>
         
        </div>
        <div tw="ml-5 flex justify-center items-center">
            <Button htmlType="submit"  tw="text-lg h-full   text-white bg-success ">
            <CheckOutlined  />
            </Button>
          </div>
      </div>
     
    </Form>
  );
}


