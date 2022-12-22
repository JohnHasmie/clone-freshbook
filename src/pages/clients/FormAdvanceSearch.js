import { AutoComplete, Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import ButtonMore from "../../components/Reports/ButtonMore";
import { styled } from "twin.macro";
import { InputKeyword, SelectKeyword } from "./AdvanceSearch.style";
import { Option } from "antd/lib/mentions";

export default function FormAdvanceSearch({
  form,
  setIsAdvance,
  searchProps,
  typeSearchProps,
  dataClients,
  keywordSearchProps,
}) {
  const [localSearch, setLocalSearch] = useState({
    company_name: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
    total_outstanding: "",
    credit_number: "",
    credit_amount: "",
  });
  const [localKeyword, setLocalKeyword] = useState("");
  const [searchField, setSearchField] = searchProps;
  const [typeSearch, setTypeSearch] = typeSearchProps;
  const [keywordSearch, setKeywordSearch] = keywordSearchProps;

  const onChange = (e) => {
    setLocalSearch({ ...localSearch, [e.target.name]: e.target.value });
  };
  const onChangeKeyword = (e) => {
    if(!typeSearch){
    setTypeSearch("all")}
    setLocalKeyword(e.target.value);
  };

  const onFinish = (values) => {
    setSearchField({ ...searchField, ...localSearch, status: true });
    setKeywordSearch(localKeyword);
    setIsAdvance(false);
  };
  const onReset = () => {
    // form.resetFields();
    setLocalSearch({
      company_name: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      note: "",
      total_outstanding: "",
      credit_number: "",
      credit_amount: "",
    });
    setLocalKeyword("");
  };
  const backButton = () => {
    form.resetFields();
    setLocalSearch({
      company_name: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      note: "",
      total_outstanding: "",
      credit_number: "",
      credit_amount: "",
    });
    setLocalKeyword("");

    setIsAdvance(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (searchField.status) {
      console.log("berjalan");
      setLocalSearch({ ...searchField });
    }
  }, [searchField]);
  useEffect(() => {
    if (keywordSearch) {
      setLocalKeyword(keywordSearch);
    }
  }, [keywordSearch]);
console.log(localSearch,"local");
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size={"large"}
      form={form}
      fields={[
        {
          name: ["company_name"],
          value: localSearch.company_name,
        },
        {
          name: ["name"],
          value: localSearch.name,
        },
        {
          name: ["email"],
          value: localSearch.email,
        },
      ]}
    >
      <div tw="grid grid-cols-3 gap-3">
        <div>
          <Form.Item label="Organization" name="company_name">
            <AutoComplete
              onChange={(e) =>
                onChange({
                  target: { value: e, name: "company_name" },
                })
              }
              placeholder="Search for an organization"
              filterOption={true}
              options={dataClients?.data?.map((x) => ({
                label: x.company_name,
                value: x.company_name,
              }))}
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item label="Contact Name" name="name">
            <AutoComplete
              placeholder="Search for a contact name"
              filterOption={true}
              onChange={(e) =>
                onChange({
                  target: { value: e, name: "name" },
                })
              }
              options={dataClients?.data?.map((x) => ({
                label: `${x.first_name} ${x.last_name}`,
                value: x.first_name,
              }))}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Email" name="email">
            <AutoComplete
              onChange={(e) =>
                onChange({
                  target: { value: e, name: "email" },
                })
              }
              placeholder="Search for a contact email"
              filterOption={true}
              options={dataClients?.data?.map((x) => ({
                label: x.email,
                value: x.email,
              }))}
            />
          </Form.Item>
        </div>
        <div tw="col-span-2 ">
          <Form.Item label="Keyword Search" name="keyword">
            <div tw="flex relative">
              <InputKeyword
                type="text"
                onChange={onChangeKeyword}
                value={localKeyword}
                placeholder="Keyword or Number"
              />
              <SelectKeyword
                tw="inline-flex "
                value={typeSearch}
                onChange={(e) => {
                  setTypeSearch(e);
                }}
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
                    value: "note",
                    label: "Internal Note",
                  },
                  {
                    value: "total_outstanding",
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
        <span tw="bg-transparent text-primary cursor-pointer" onClick={onReset}>
          Reset all
        </span>
        <div tw="flex">
          <div>
            <ButtonMore tw="text-lg px-8 mr-2" onClick={backButton}>
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
    console.log(form, "Form");
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
