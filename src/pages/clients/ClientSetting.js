import {
  BarsOutlined,
  ClockCircleOutlined,
  ExclamationOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
import tw, { styled, css } from "twin.macro";
import { DividerCustom } from "./AdvanceSearch.style";

export default function ClientSetting({ open, setOpen }) {
  const { Title } = Typography;
  const handleIsOpen = (type) => {
    switch (type) {
      case "sendReminders":
        setOpen({
          ...open,
          sendReminders: true,
          opened: true,
        });
        break;
      case "charge":
        setOpen({
          ...open,
          charge: true,
          opened: true,
        });
        break;
      case "currency":
        setOpen({
          ...open,
          currency: true,
          opened: true,
        });
        break;

      case "invoiceAttachment":
        setOpen({
          ...open,
          invoiceAttachment: true,
          opened: true,
        });
        break;

      default:
        setOpen({
          sendReminders: false,
          charge: false,
          currency: false,
          invoiceAttachment: false,
          opened: false,
        });
        break;
    }
  };
    const handleIsClose = (type) => {
    switch (type) {
      case "sendReminders":
        setOpen({
          ...open,
          sendReminders: false,
          opened: false,
        });
        break;
      case "charge":
        setOpen({
          ...open,
          charge: false,
          opened: false,
        });
        break;
      case "currency":
        setOpen({
          ...open,
          currency: false,
          opened: false,
        });
        break;

      case "invoiceAttachment":
        setOpen({
          ...open,
          invoiceAttachment: false,
          opened: false,
        });
        break;

      default:
        setOpen({
          sendReminders: false,
          opened: false,
          charge: false,
          currency: false,
          invoiceAttachment: false,
        });
        break;
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const isReminder = (
    <div>
      <Title level={5}>Send Payment Reminders</Title>

      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="reminder" tw="!mb-2">
              <Checkbox>
                Automatically send payment reminders for this client's invoices.
              </Checkbox>
              <DividerCustom />
            </Form.Item>
          </Col>

          <Col span={24} tw="space-y-2 mb-5">
            <span>
              <ExclamationOutlined tw="mr-1 rounded-full bg-gray-300 text-white p-0.5" />{" "}
              Changes will apply to new invoices.
            </span>
            <p>
              Late Payment reminders for all clients can be adjusted on the{" "}
              <a>Email Templates</a> page.
            </p>
            <a>Learn more</a>
            <DividerCustom />
          </Col>

          <Col span={12}>
            <Button
              tw="text-lg px-8"
              onClick={() => handleIsClose("sendReminders")}
            >
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button tw="text-lg text-white bg-success px-8">Done</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  const isCharge = (
    <div>
      <Title level={5}>Charge Late Fees</Title>

      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="reminder" tw="!mb-2">
              <Checkbox>
                Automatically add late fees to this client's overdue invoices.
              </Checkbox>
              <DividerCustom />
            </Form.Item>
          </Col>

          <Col span={24} tw="space-y-5 mb-5">
            <span>
              <ExclamationOutlined tw="mr-1 rounded-full bg-gray-300 text-white p-0.5" />{" "}
              Changes will apply to new invoices.
            </span>
            <DividerCustom />
          </Col>

          <Col span={12}>
            <Button tw="text-lg px-8" onClick={() => handleIsClose("charge")}>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button tw="text-lg text-white bg-success px-8">Done</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  const isInvoice = (
    <div>
      <Title level={5}>Invoice Attachments</Title>

      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="reminder" tw="!mb-2">
              <Checkbox>
                Add the option to attach a PDF copy when sending invoices by
                email.
              </Checkbox>
              <DividerCustom />
            </Form.Item>
          </Col>

          <Col span={24} tw="space-y-5 mb-5">
            <span >
              <ExclamationOutlined tw="mr-1 rounded-full bg-gray-300 text-white p-0.5" />{" "}
              Changes will apply to new invoices.
            </span>
            <DividerCustom />
          </Col>

          <Col span={12}>
            <Button
              tw="text-lg px-8"
              onClick={() => handleIsClose("invoiceAttachment")}
            >
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button tw="text-lg text-white bg-success px-8">Done</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
  const FilterCurrency = (
    <div>
      <Title level={5}>Currency & Languange</Title>

      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item label="Choose a Languange" name="languange">
              <Select
                defaultValue="English"
                options={[
                  {
                    value: "English",
                    label: "English",
                  },
                  {
                    value: "French",
                    label: "French",
                  },
                  {
                    value: "Spanish",
                    label: "Spanish",
                  },
                ]}
              />
              <DividerCustom />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Choose a Currency" name="currency">
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
              <DividerCustom />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Button tw="text-lg px-8" onClick={() => handleIsClose("currency")}>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button tw="text-lg text-white bg-success px-8">Done</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  return (
    <div tw="md:col-span-4 mb-10 ">
      {!open.sendReminders && !open.opened && (
        <div tw="mt-6">
          <Title level={3}>Client Settings</Title>
          <div
            tw="border-y border-gray-300 px-1 py-2 cursor-pointer hover:text-primary"
            onClick={() => handleIsOpen("sendReminders")}
          >
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
        </div>
      )}
      {open.sendReminders && open.opened && isReminder}
      {!open.charge && !open.opened && (
        <div>
          <div
            tw="border-b border-gray-300 px-1 py-2 cursor-pointer hover:text-primary"
            onClick={() => handleIsOpen("charge")}
          >
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
        </div>
      )}
      {open.charge && open.opened && isCharge}

      {!open.currency && !open.opened && (
        <div>
          <div
            tw="border-b border-gray-300 px-1 py-2 cursor-pointer hover:text-primary"
            onClick={() => handleIsOpen("currency")}
          >
            <div tw="bg-transparent rounded p-2 hover:bg-blue-50">
              <div tw=" flex justify-between items-center">
                <div tw="flex items-center ">
                  <GlobalOutlined />
                  <span tw="text-base font-bold ml-2">
                    Currency & Languange
                  </span>
                </div>

                <RightOutlined />
              </div>
              <span tw="text-xs ml-5">IDR, English</span>
            </div>
          </div>
        </div>
      )}
      {open.currency && open.opened && FilterCurrency}
      {!open.invoiceAttachment && !open.opened && (
        <div>
          <div
            tw="border-b border-gray-300 px-1 py-2 cursor-pointer hover:text-primary"
            onClick={() => handleIsOpen("invoiceAttachment")}
          >
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
        </div>
      )}
      {open.invoiceAttachment && open.opened && isInvoice}
    </div>
  );
}
