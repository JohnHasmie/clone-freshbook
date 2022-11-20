import { Button, Col, Divider, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import CardPopup from "./CardPopup";
import  tw from 'twin.macro';

export default function NewItem() {
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
      <CardPopup title="New Item">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          className="row-col"
        >
          <Form.Item label="Name" name="name">
            <Input type='text' placeholder="Enter a name" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            
          >
            <Input type="text" placeholder="Enter a description" />
          </Form.Item>

          <Divider/>
       <div tw="flex justify-end">
       <Form.Item >
             <Button tw='mr-2' >
               Cancel
             </Button>
           </Form.Item>
           <Form.Item >
             <Button tw='bg-success ' >
              <span tw='text-white'>Save</span> 
             </Button>
           </Form.Item>
       </div>
          
        </Form>
      </CardPopup>
    </>
  );
}
