import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import CardPopup from "./CardPopup";
import tw from "twin.macro";

export default function NewItem({hide}) {
  
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <>
      <CardPopup title="New Item">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
        >
          <Form.Item label="Name" name="name" tw="px-2 pt-2">
            <Input type="text" placeholder="Enter a name" />
          </Form.Item>

          <Form.Item label="Description" name="description" tw="px-2 ">
            <Input type="text" placeholder="Enter a description" />
          </Form.Item>

          <div tw="flex justify-end border-t border-gray-200 px-5 pt-5 pb-0">
            <Form.Item>
              <Button onClick={hide} tw="mr-2">Cancel</Button>
            </Form.Item>
            <Form.Item >
              <Button tw="bg-success text-white ">Save</Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
