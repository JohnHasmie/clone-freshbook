import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Select,
} from "antd";
import React, { useState } from "react";
import tw from "twin.macro";
import CardPopup from "../../components/CardPopup";

export default function PopupNewInvoice() {
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
      <CardPopup title="Add a Payment">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item name="price" tw="px-2 pt-2">
            <Input type="text" placeholder="Rp0.00" />
          </Form.Item>

          <Form.Item name="payment_method" tw="px-2 ">
            <Select
              placeholder="Payment Method"
              options={[
                { label: "2Checkout", value: "2Checkout" },
                { label: "ACH", value: "ACH" },
                { label: "Bank Transfer", value: "Bank Transfer" },
                { label: "Cash", value: "Cash" },
                { label: "Check", value: "Check" },
                { label: "Credit Card", value: "Credit Card" },
                { label: "Debit", value: "Debit" },
                { label: "Other", value: "Other" },
                { label: "Paypal", value: "Paypal" },
                { label: "AMEX", value: "AMEX" },
                { label: "Diners Club", value: "Diners Club" },
                { label: "Discover", value: "Discover" },
                { label: "JCB", value: "JCB" },
                { label: "MasterCard", value: "MasterCard" },
                { label: "Visa", value: "Visa" },
              ]}
            />
          </Form.Item>
          <Form.Item name="date" tw="px-2 ">
            <Input type="text" placeholder="Date" />
          </Form.Item>
          <Form.Item name="payment_notes" tw="px-2 ">
            <Input type="text" placeholder="Payment Notes (Optional)" />
          </Form.Item>
          <Form.Item name="notification_email" tw="px-2 ">
            <Checkbox>Send client a payment notification email</Checkbox>
          </Form.Item>

          <div tw="flex justify-end border-t border-gray-200 pt-2 pr-2">
            <Form.Item>
              <Button tw="mr-2">Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" tw="bg-success text-white ">Add Payment</Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}
