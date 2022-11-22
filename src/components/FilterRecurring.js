import { Button, Col, Divider, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import CardPopup from "./CardPopup";
import tw from "twin.macro";

export default function FilterRecurring() {
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
      <CardPopup title="Choose a Date Range">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
          tw="p-5"
        >
           <Form.Item  name="time"     >
                <Select
             
                  defaultValue="last-12month"
             
                  options={[
                    {
                      value: "last-12month",
                      label: "Last 12 Months",
                    },
                    {
                      value: "next-12month",
                      label: "Next 12 Months",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Currency"       name="time">
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

       
        </Form>
      </CardPopup>
    </>
  );
}
