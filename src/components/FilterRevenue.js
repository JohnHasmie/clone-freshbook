import { Form, Input, Select } from "antd";
import React, { useState } from "react";
import CardPopup from "./CardPopup";
import tw from "twin.macro";

export default function FilterRevenue() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  return (
    <>
      <CardPopup title="Filters">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
          tw="p-5"
        >
          <div tw="grid grid-cols-2 gap-x-5">
            <Form.Item name="time_1">
              <Input type="date" defaultValue={new Date()} />
            </Form.Item>
            <Form.Item name="date_2">
              <Input type="date" defaultValue={new Date()} />
            </Form.Item>
            <Form.Item tw="col-span-2" label="Currency"       name="currency">
                <Select
            
                  defaultValue="usd"
              
                  options={[
                    {
                      value: "usd",
                      label: "USD - US dollar",
                    },
                    {
                      value: "idr",
                      label: "IDR - Rupiah",
                    },
                  ]}
                />
              </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
