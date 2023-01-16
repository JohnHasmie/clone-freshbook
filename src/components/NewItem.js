import { Button, Form, Input, notification } from "antd";
import React from "react";
import CardPopup from "./CardPopup";
import tw from "twin.macro";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export default function NewItem({hide}) {
  const queryClient = useQueryClient();
  const [form]=Form.useForm();
  const mutation = useMutation(
    async (data) => {
      return axios.post("items", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("items-by-client");
        notification.success({
          message: `${res?.data?.item?.name} has been added`,
          placement: "topLeft",
        });
      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
      },
    }
  );
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    let newValues={...values,client_id:1}
    mutation.mutate(newValues);
    form.resetFields();
    
    hide()

  };
  return (
    <>
      <CardPopup title="New Item">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          form={form}
          size="large"
        >
          <div tw="grid grid-cols-3">

          <Form.Item label="Name" name="name" tw="px-2 col-span-3 pt-2" rules={[{ required: true, message: "This cannot be blank" }]}>
            <Input type="text" placeholder="Enter a name" />
          </Form.Item>

          <Form.Item label="Description" name="description" tw="px-2 col-span-3 ">
            <Input type="text" placeholder="Enter a description" />
          </Form.Item>
          <Form.Item label="Rate" name="rate" tw="px-2">
            <Input type="number" placeholder="0.00" />
          </Form.Item>
          <Form.Item label="stock" name="qty" tw="px-2">
            <Input  name="qty" type="number"  />
          </Form.Item>
          </div>

          <div tw="flex justify-end border-t border-gray-200 px-5 pt-5 pb-0">
            <Form.Item>
              <Button onClick={hide} tw="mr-2">Cancel</Button>
            </Form.Item>
            <Form.Item >
              <Button htmlType="submit" tw="bg-success text-white ">Save</Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
