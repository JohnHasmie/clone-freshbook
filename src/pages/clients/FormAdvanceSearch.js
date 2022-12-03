import { AutoComplete, Button, Form, Input, Select } from "antd";
import React from "react";
import tw from "twin.macro";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import ButtonMore from "../../components/Reports/ButtonMore";
import { styled } from "twin.macro";
import { InputKeyword, SelectKeyword } from "./AdvanceSearch.style";
import { Option } from "antd/lib/mentions";

export default function FormAdvanceSearch({form,setIsAdvance }) {

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size={"large"}
      form={form}
    >
      <div tw="grid grid-cols-3 gap-3">
        <div>
          <Form.Item label="Organization" name="organization">
            <AutoComplete
              placeholder="Search for an organization"
              filterOption={true}
              options={[
                { label: "Boni Syahrudin Inc", value: "Boni Syahrudin Inc" },
                { label: "John Doe Inc", value: "John Doe Inc" },
              ]}
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item label="Contact Name" name="contact">
            <AutoComplete
              placeholder="Search for a contact name"
              filterOption={true}
              options={[
                { label: "Boni Syahrudin", value: "Boni Syahrudin" },
                { label: "John Doe", value: "John Doe" },
              ]}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Email" name="email">
            <AutoComplete
              placeholder="Search for a contact email"
              filterOption={true}
              options={[
                { label: "bonis@gmail.com", value: "bonis@gmail.com" },
                { label: "johndoe@gmail.com", value: "johndoe@gmail.com" },
              ]}
            />
          </Form.Item>
        </div>
        <div tw="col-span-2 ">
          <Form.Item label="Keyword Search" name="keyword">
            <div tw="flex relative">
              <InputKeyword type="text" placeholder="Keyword or Number" />
              <SelectKeyword
                tw="inline-flex "
                defaultValue="all"
                options={[
                  {
                    value: "all",
                    label: "All Fields",
                  },
                  {
                    value: "phone",
                    label: "Phone Number",
                  },
                  {
                    value: "address",
                    label: "Address",
                  },
                  {
                    value: "internal",
                    label: "Internal Note",
                  },
                  {
                    value: "total",
                    label: "Total Outstanding",
                  },
                  {
                    value: "credit_number",
                    label: "Credit Number",
                  },
                  {
                    value: "credit_amount",
                    label: "Credit Amount",
                  },
                ]}
              />
            </div>
          </Form.Item>
        </div>
      </div>
      <div tw="flex justify-between items-start">
        <button tw="bg-transparent text-primary cursor-pointer "  onClick={onReset}>
          Reset all
        </button>
        <div tw="flex">
          <div>
            <ButtonMore
              tw="text-lg px-8 mr-2"
              onClick={() => setIsAdvance(false)}
            >
              Cancel
            </ButtonMore>
          </div>
          <div>
            <Button htmlType="submit" tw="text-lg text-white bg-success px-8">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export function FormAdvanceSearchEmail({ form, setIsAdvance }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const handleReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size={"large"}
      form={form}

    >
      <div tw="grid grid-cols-3 gap-3">
        <div>
          <Form.Item label="Sender (Team Member)" name="sender">
            <Select
              mode="multiple"
              allowClear
              placeholder="Type to add team members"
              options={[
                { label: "Suzie Jones", value: "Suzie Jones" },
                { label: "John Doe ", value: "John Doe " },
              ]}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Recipient" name="recipient">
            <Select
              mode="multiple"
              placeholder="Type to add recipients or emails"
              optionLabelProp="label"
            >
              <Option value="bonis@gmail.com" label="bonis@gmail.com">
                <div tw="grid">
                  <span tw="text-primary text-sm">bonis@gmail.com</span>
                  <span tw="text-xs">Boni Syahrudin Inc</span>
                  <span tw="text-xs">Boni Syahrudin</span>
                </div>
              </Option>
            </Select>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Date Range" name="date">
            <Input type="text" />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Email Type" name="email_type">
            <Select
              mode="multiple"
              placeholder="Type to add email types"
              options={[
                {
                  label: "Checkout Link Payments",
                  value: "Checkout Link Payments",
                },
                { label: "Client Invite ", value: "Client Invite " },
                { label: "Credit ", value: "Credit " },
                {
                  label: "Declined Checkout Link Payment ",
                  value: "Declined Checkout Link Payment ",
                },
                {
                  label: "Declined Invoice Payment ",
                  value: "Declined Invoice Payment ",
                },
                { label: "Direct Debit ", value: "Direct Debit " },

                { label: "Estimate ", value: "Estimate " },
                { label: "Estimate Comment ", value: "Estimate Comment " },
                { label: "Invoice ", value: "Invoice " },
                { label: "Invoice Comment ", value: "Invoice Comment " },

                { label: "Late Payment ", value: "Late Payment " },
                { label: "Online Payment ", value: "Online Payment " },
                { label: "Proposal ", value: "Proposal " },
                { label: "Proposal Comment ", value: "Proposal Comment " },
                { label: "Recurring Invoice ", value: "Recurring Invoice " },
                {
                  label: "Recurring Online Payment ",
                  value: "Recurring Online Payment ",
                },
                { label: "Refund ", value: "Refund " },
                { label: "Report ", value: "Report " },
                { label: "Retainer Invoice ", value: "Retainer Invoice " },
              ]}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Email Subject" name="email_subject">
            <Input type="text" placeholder="Type to add subject" />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Email Body" name="email_body">
            <Input type="text" placeholder="Type to add body" />
          </Form.Item>
        </div>
      </div>
      <div tw="flex justify-between items-start">
        <span tw="text-primary cursor-pointer " onClick={handleReset}>
          Reset all
        </span>
        <div tw="flex">
          <div>
            <ButtonMore
              tw="text-lg px-8 mr-2"
              onClick={() => setIsAdvance(false)}
            >
              Cancel
            </ButtonMore>
          </div>
          <div>
            <Button htmlType="submit" tw="text-lg text-white bg-success px-8">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export function FormAdvanceSearchInvoice({ form, setIsAdvance }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const handleReset = () => {
    console.log(form,"Form");
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size={"large"}
    >
      <div tw="grid grid-cols-3 gap-3">
        <div>
          <Form.Item label="Clients" name="clients">
            <Select
              mode="multiple"
              allowClear
              placeholder="Type to add clients"
              options={[
                { label: "Suzie Jones", value: "Suzie Jones" },
                { label: "John Doe ", value: "John Doe " },
              ]}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Invoice Status" name="invoice_status">
            <Select
              mode="multiple"
              allowClear
              placeholder="Type to add invoice status"
              options={[
                { label: "Outstanding", value: "Outstanding" },
                { label: "Paid", value: "Paid" },
                { label: "Auto-Paid", value: "Auto-Paid" },
                { label: "Partially Paid", value: "Partially Paid" },
                { label: "Sent", value: "Sent" },
                { label: "Viewed", value: "Viewed" },
                { label: "Disputed", value: "Disputed" },
                { label: "Draft", value: "Draft" },
                { label: "Overdue", value: "Overdue" },
              ]}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Date Range" name="date">
            <Input type="text" />
          </Form.Item>
        </div>
        <div tw="col-span-2 ">
          <Form.Item label="Keyword Search" name="keyword">
            <div tw="flex relative">
              <InputKeyword type="text" placeholder="Keyword or Number" />
              <SelectKeyword
                tw="inline-flex "
                defaultValue="all"
                options={[
                  {
                    value: "all",
                    label: "All Fields",
                  },
                  {
                    value: "Item Description",
                    label: "Item Description",
                  },
                  {
                    value: "Item Name",
                    label: "Item Name",
                  },
                  {
                    value: "Invoice Number",
                    label: "Invoice Number",
                  },
                  {
                    value: "Invoice Amount",
                    label: "Invoice Amount",
                  },
                  {
                    value: "Reference Number",
                    label: "Reference Number",
                  },

                  {
                    value: "Note",
                    label: "Note",
                  },
                ]}
              />
            </div>
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Currency" name="currency">
            <Select
              placeholder="Type to add invoice status"
              defaultValue="all"
              options={[
                { label: "All Currencies", value: "all" },
                { label: "IDR-Rupiah", value: "idr" },
              ]}
            />
          </Form.Item>
        </div>
      </div>
      <div tw="flex justify-between items-start">
        <span tw="text-primary cursor-pointer " onClick={handleReset}>
          Reset all
        </span>
        <div tw="flex">
          <div>
            <ButtonMore
              tw="text-lg px-8 mr-2"
              onClick={() => setIsAdvance(false)}
            >
              Cancel
            </ButtonMore>
          </div>
          <div>
            <Button htmlType="submit" tw="text-lg text-white bg-success px-8">
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
