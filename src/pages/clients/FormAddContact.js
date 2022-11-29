import { AutoComplete, Button, Form, Input, Select } from "antd";
import React from "react";
import tw from "twin.macro";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import ButtonMore from "../../components/Reports/ButtonMore";
import { styled } from "twin.macro";
import { InputKeyword, SelectKeyword } from "./AdvanceSearch.style";
import { Option } from "antd/lib/mentions";
import { CheckOutlined } from "@ant-design/icons";

export default function FormAddContact({ form ,handleOk }) {
  const onFinish = (values) => {
    console.log("Success:", values);
    handleOk()
  };
  const handleReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size={"large"}
      tw="mt-10"
    >
      <div tw="flex">
        <div tw="grid grid-cols-3 gap-3">
          <div>
            <Form.Item label="First Name" name="first_name">
              <Input type="text" placeholder="First Name"/>
             
            </Form.Item>
          </div>
        
          <div>
            <Form.Item label="Last Name" name="last_name">
              <Input type="text" placeholder="Last Name"/>
             
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Email" name="email">
              <Input type="text" placeholder="Email"/>
             
            </Form.Item>
          </div>
         
          <div>
            <Form.Item label="Phone 1" name="phone_1">
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


