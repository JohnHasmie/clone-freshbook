import { AutoComplete, Button, Form, Input, Popover, Select } from "antd";
import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import ButtonMore from "../../components/Reports/ButtonMore";
import { styled } from "twin.macro";
import { InputKeyword, SelectKeyword } from "./AdvanceSearch.style";
import { Option } from "antd/lib/mentions";
import FilterDate from "../invoices/FilterDate";
import FilterDateInvoice from "../invoices/FilterDateInvoice";
import moment from "moment";

export default function FormAdvanceSearch({
  setIsAdvance,
  searchProps,
  typeSearchProps,
  dataClients,
  keywordSearchProps,
  filterProps,
}) {
  const [localSearch, setLocalSearch] = useState({
    company_name: "",
    contact_name: "",
    email: "",
    keyword: "",
    type: "",
  });
  const [form] = Form.useForm();

  const [localKeyword, setLocalKeyword] = useState("");
  const [searchField, setSearchField] = searchProps;
  const [filter, setFilter] = filterProps;

  const [typeSearch, setTypeSearch] = typeSearchProps;
  const [keywordSearch, setKeywordSearch] = keywordSearchProps;

  const onChange = (e) => {
    setLocalSearch({ ...localSearch, [e.target.name]: e.target.value });
  };

  const onChangeKeyword = (e) => {
    if (!typeSearch) {
      setTypeSearch("all");
    }
    setLocalKeyword(e.target.value);
  };

  const onFinish = (values) => {
    console.log("values", values);
    setFilter({...filter,company_name:values.company_name,email:values.email,contact_name:values.contact_name,keyword:values.keyword});
    // setSearchField({ ...searchField, ...localSearch, status: true });
    // setKeywordSearch(localKeyword);
    setIsAdvance(false);
  };
  const onReset = () => {
    form.resetFields();
    // setLocalSearch({
    //   company_name: "",
    //   contact_name: "",
    //   email: "",
    //   keyword: "",
    //   type: "",
    // });
    // setLocalKeyword("");
  };
  const backButton = () => {
    // form.resetFields();
    // setLocalSearch({
    //   company_name: "",
    //  contact_name: "",
    //   email: "",
    //   keyword:"",
    //   type:""

    // });

    setIsAdvance(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // useEffect(() => {
  //   if (keywordSearch) {
  //     setLocalKeyword(keywordSearch);
  //   }
  // }, [keywordSearch]);
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
          value: filter?.company_name,
        },
        {
          name: ["contact_name"],
          value: filter?.contact_name,
        },
        {
          name: ["email"],
          value: filter.email,
        },
        {
          name: ["keyword"],
          value: filter.keyword,
        },
        {
          name: ["type"],
          value: filter.type,
        }

      ]}
    >
      <div tw="grid grid-cols-3 gap-3">
        <div>
          <Form.Item label="Organization" name="company_name">
            <AutoComplete
              // onChange={(e) =>
              //   onChange({
              //     target: { value: e, name: "company_name" },
              //   })
              // }
              // value={"Mills and Sanders Plc"}
              placeholder="Search for an organization"
              filterOption={true}
              dataSource={dataClients?.data?.map((x) => ({
                label: x.company_name,
                value: x.company_name,
              }))}
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item label="Contact Name" name="contact_name">
            <AutoComplete
              placeholder="Search for a contact name"
              filterOption={true}
              // value={localSearch.contact_name}
              // onChange={(e) =>
              //   onChange({
              //     target: { value: e, name: "contact_name" },
              //   })
              // }
              options={dataClients?.data?.map((x) => ({
                label: `${x.first_name} ${x.last_name}`,
                value: x.first_name + " " + x.last_name,
              }))}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Email" name="email">
            <AutoComplete
              // value={localSearch.email}

              // onChange={(e) =>
              //   onChange({
              //     target: { value: e, name: "email" },
              //   })
              // }
              placeholder="Search for a contact email"
              filterOption={true}
              options={dataClients?.data?.map((x) => ({
                label: x.email,
                value: x.email,
              }))}
            />
          </Form.Item>
        </div>
        <div tw="col-span-2 flex items-end ">
          <Form.Item tw="flex w-96" label="Keyword Search" name="keyword">
            <InputKeyword
              type="text"
              name="keyword"
              // value={localSearch.keyword}
              // onChange={onChange}
              placeholder="Keyword or Number"
            />
          </Form.Item>
          <Form.Item tw="inline-flex w-48"  name="type">
            <SelectKeyword
              // value={localSearch.type}
              // onChange={(e) =>
              //   onChange({
              //     target: { value: e, name: "type" },
              //   })
              // }
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
              ]}
            />
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
            <Button
              onClick={() => form.submit()}
              tw="text-lg text-white bg-success px-8"
            >
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

export function FormAdvanceSearchInvoice({ form, setIsAdvance ,dataClients,statusClients,filterProps}) {

  const [filter, setFilter] = filterProps;
  const [clicked, setClicked] = useState(false);

  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  const [localSearch, setLocalSearch] = useState({
    client_id: "",
    status: "",
    currency: "",
    keyword: "",
    type: "all",
    date_type:"last_invoice",
    start_date:"",
    end_date:""
  });
  const onFinish = (values) => {
    setFilter({
      ...filter,
      client_id: localSearch.client_id,
    status: localSearch.status,
    currency: localSearch.currency,
    keyword: localSearch.keyword,
    type: localSearch.type,
      start_date: localSearch.start_date,
      end_date: localSearch.end_date,
      date_type: localSearch.date_type,
    });
  setIsAdvance(false)

  };
  useEffect(() => {
    setLocalSearch({
      ...localSearch,
      client_id: filter?.client_id,
      status: filter?.status,
      currency: filter?.currency,
      keyword: filter?.keyword,
        start_date: filter?.start_date,
        end_date: filter?.end_date,
    });
    if(filter?.date_type){
      setLocalSearch({...localSearch,date_type:filter?.date_type})
    }
    if(filter?.type){
      setLocalSearch({...localSearch,type:filter?.type})
    }
  }, [filter]);
  const onChange = (e) => {
    setLocalSearch({ ...localSearch, [e.target.name]: e.target.value });
  };
  
  const handleReset = () => {
    setLocalSearch("")
    form.resetFields();
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log(localSearch,"local");
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      layout="vertical"
      size={"large"}
      form={form}
      // fields={[
      //   {
      //     name: ["client_id"],
      //     value: filter?.client_id,
      //   },
      //   {
      //     name: ["contact_name"],
      //     value: filter?.contact_name,
      //   },
      //   {
      //     name: ["email"],
      //     value: filter.email,
      //   },
      //   {
      //     name: ["keyword"],
      //     value: filter.keyword,
      //   },
      //   {
      //     name: ["type"],
      //     value: filter.type,
      //   }

      // ]}
    >
      <div tw="grid grid-cols-3 gap-3">
        <div>
          <Form.Item label="Clients" name="client_id">
            <Select
              // mode="multiple"
              // allowClear
              onChange={(e) => onChange({
                target: { value: e, name: "client_id" },
              })}
              value={localSearch.client_id}
              placeholder="Type to add clients"
              options={            
            dataClients?.data?.map(item=>({
              label:item.company_name,
              value:item.id
            }))
            }
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Invoice Status" name="status">
            <Select
              // mode="multiple"
              // allowClear
              onChange={(e) => onChange({
                target: { value: e, name: "status" },
              })}
              value={localSearch.status}

              placeholder="Type to add invoice status"
              options={[
                { label: "Paid", value: "paid" },
                { label: "Success", value: "success" },
                { label: "Partially Paid", value: "partial" },
                { label: "Send", value: "send" },
                { label: "Draft", value: "draft" },
                { label: "Overdue", value: "overdue" },
              ]}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Date Range" name="date">
          <Popover
              placement="bottomLeft"
              content={<FilterDateInvoice hide={hide} localSearchProps={[localSearch,setLocalSearch]} />}
              trigger="click"
              visible={clicked}
              onVisibleChange={handleClickChange}
            >
            <Input type="text" value={localeMoment(localSearch.start_date,localSearch.end_date)} />
                  </Popover>
          </Form.Item>
        </div>
        <div tw="col-span-2 ">
          <Form.Item label="Keyword Search" name="keyword">
            <div tw="flex relative">
              <InputKeyword type="text" 
              value={localSearch.keyword}
              name="keyword"
              onChange={onChange}
              placeholder="Keyword or Number" />
              <SelectKeyword
                tw="inline-flex "
                onChange={(e) => onChange({
                  target: { value: e, name: "type" },
                })}
                value={localSearch.type}
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
              // defaultValue="all"
              onChange={(e) => onChange({
                target: { value: e, name: "currency" },
              })}
              options={[
                {
                  value: "USD",
                  label: "USD - US dollar",
                },
                {
                  value: "GBP",
                  label: "GBP - Pound Sterling",
                },
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
            <Button
              onClick={() => form.submit()}
              tw="text-lg text-white bg-success px-8"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}

export function localeMoment(a,b){
let result=""
let locale1=""
let locale2=""
if(a){
  locale1= moment(a).format("DD MMM YYYY")
}
if(b){
  locale2= moment(b).format("DD MMM YYYY")
}
result=locale1+" - "+locale2
return result
}