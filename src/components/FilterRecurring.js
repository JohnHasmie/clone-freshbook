import { Button, Col, Divider, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import CardPopup from "./CardPopup";
import tw from "twin.macro";

export default function FilterRecurring() {

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
             style={{width:'100%'}}
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
              <Form.Item label="Currency"       name="currency">
                <Select
             style={{width:'100%'}}
            
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
