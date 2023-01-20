import { Button, DatePicker, Form, Input, notification, Radio } from "antd";
import React, { useState, useEffect } from "react";
import tw from "twin.macro";

import CardPopup from "../../components/CardPopup";
import moment from "moment";

const dateFormat = "DD/MM/YYYY";

export default function FilterDiscount({ hide, isFormProps }) {

  const [isForm, setIsForm] = isFormProps;


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    console.log("values",values)
    setIsForm({
      ...isForm,
      discount: values?.discount,
     
    });
  
    hide();
  };
  const suffixSelector=(<span>%</span>)
  return (
    <>
      <CardPopup
      title="Add a Discount"
      >
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          size="large"
         fields={[
        {
          name: ["discount"],
          value: isForm?.discount,
        },


      ]}
        >
          <div tw="grid grid-cols-2 place-content-center place-items-center mt-5	">
            <Form.Item name="discount" tw="px-2 pt-2">
            <Input
              addonAfter={suffixSelector}
            />
            </Form.Item>

           <div>
           of invoice subtotal

            </div>

          </div>

          <div tw="flex justify-end border-t border-gray-200 mt-5 pt-5 pr-5 pb-0">
            <Form.Item>
              <Button onClick={hide} tw="mr-2">
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" tw="bg-success text-white ">
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
