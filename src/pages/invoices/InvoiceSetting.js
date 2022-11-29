import {
  ClockCircleOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import tw from "twin.macro";
import CardPopup from "../../components/CardPopup";

export default function InvoiceSetting() {
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
      <CardPopup title="Settings for this invoice">
        <div tw="border-y border-gray-300 px-1 py-2 cursor-pointer hover:text-primary">
          <div tw="bg-transparent rounded p-2 hover:bg-blue-50">
            <div tw=" flex justify-between items-center">
              <div tw="flex items-center ">
                <ClockCircleOutlined />
                <span tw="text-base font-bold ml-2">Send Reminders</span>
              </div>
              <div tw="flex items-center">
                <span tw="font-bold">NO</span>
                <RightOutlined />
              </div>
            </div>
            <span tw="text-xs ml-5">At Customizable Interval</span>
          </div>
        </div>
        <div tw="border-b border-gray-300 px-1 py-2 cursor-pointer hover:text-primary">
          <div tw="bg-transparent rounded p-2 hover:bg-blue-50">
            <div tw=" flex justify-between items-center">
              <div tw="flex items-center ">
                <ClockCircleOutlined />
                <span tw="text-base font-bold ml-2">Charge Late Fees</span>
              </div>
              <div tw="flex items-center">
                <span tw="font-bold">NO</span>
                <RightOutlined />
              </div>
            </div>
            <span tw="text-xs ml-5">Percentage or Flate-Rate Fees</span>
          </div>
        </div>
        <div tw="border-b border-gray-300 px-1 py-2 cursor-pointer hover:text-primary">
          <div tw="bg-transparent rounded p-2 hover:bg-blue-50">
            <div tw=" flex justify-between items-center">
              <div tw="flex items-center ">
                <GlobalOutlined />
                <span tw="text-base font-bold ml-2">Currency & Languange</span>
              </div>

              <RightOutlined />
            </div>
            <span tw="text-xs ml-5">IDR, English</span>
          </div>
        </div>
        <div tw="border-b border-gray-300 px-1 py-2 cursor-pointer hover:text-primary">
          <div tw="bg-transparent rounded p-2 hover:bg-blue-50">
            <div tw=" flex justify-between items-center">
              <div tw="flex items-center ">
                <FileDoneOutlined />
                <span tw="text-base font-bold ml-2">Invoice Attachments</span>
              </div>
              <div tw="flex items-center">
                <span tw="font-bold">NO</span>
                <RightOutlined />
              </div>
            </div>
            <span tw="text-xs ml-5">Attach PDF copy to emails</span>
          </div>
        </div>
      </CardPopup>
    </>
  );
}
