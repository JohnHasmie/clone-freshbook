import {
  CaretDownOutlined,
    MailOutlined,
    PhoneOutlined,
    PlusOutlined,
    SearchOutlined,
    UnorderedListOutlined,
  } from "@ant-design/icons";
  import { Card, Checkbox, Col, Form, Row, Table, Tabs, Typography } from "antd";
  import React, { useState } from "react";
  import { Link, useHistory, useLocation } from "react-router-dom";
  import tw from "twin.macro";
  import CardClient from "../../components/CardClient";
  import InputSearch from "../../components/InputSearch";
  import Photo from "../../assets/images/mask-group.svg";
  import AllClientTabs from "../../components/ClientsComponent/AllClientTabs";
import InputAdvanceSearch from "../../components/InputAdvancedSearch";
import { FormAdvanceSearchEmail } from "./FormAdvanceSearch";
  
  
  export default function Email() {
  const [form] = Form.useForm();

    const { Title, Text } = Typography;
  const [isAdvance, setIsAdvance] = useState(false);

    const [checked, setChecked] = useState(false);
    const columns = [
      {
        title: (
          <Checkbox
            className="font-normal"
            onChange={() => setChecked(!checked)}
          />
        ),
        dataIndex: "checkbox",
        key: "checkbox",
        width:"5%"
      },
      {
        title: "Date Sent/Sender",
        dataIndex: "dateSent",
        key: "dateSent",
      },
      {
        title: "Recipient/ Organization",
        dataIndex: "recipient",
        key: "recipient",
      },
  
      {
        title: "Email Type",
        key: "email",
        dataIndex: "email",
      },
  
      {
        title: "Subject",
        key: "subject",
        dataIndex: "subject",
      },
    ];
  
    const data = [
      {
        key: "1",
        checkbox: (
          <Checkbox
            className="font-normal"
            checked={checked}
            onChange={(e) => console.log(e.target.value)}
          />
        ),
        dateSent: (
          <div>
            <span>10/11/2022</span>
            <p>Heri Setiawan</p>
          </div>
        ),
        recipient: <div>
        <span>First Client</span>
        <p>Company Name</p>
      </div>,
  
  email: <span>Recurring Invoice</span>,
        subject: <span >Oasis Land sent you an invoice (00148)</span>,
      },
  
      {
        key: "1",
        checkbox: (
          <Checkbox
            className="font-normal"
            checked={checked}
            onChange={(e) => console.log(e.target.value)}
          />
        ),
        organization: (
          <div>
            <h3>Open Trolley</h3>
            <p>Mazmur Andreas</p>
          </div>
        ),
        internal: <span></span>,
  
        credit: <span></span>,
        outstanding: <span tw="font-bold">$20,000,000.00</span>,
      },
    ];
    return (
      <>
        <div className="layout-content">
          <div tw="max-w-screen-lg mb-20">
            <div tw="grid grid-cols-3 gap-4 justify-items-center content-center">
              <div>
                <div>
                  <span tw="text-4xl font-bold text-blue-700">$0 </span>
                  <span tw="text-sm font-bold text-blue-700 ">USD</span>
                </div>
  
                <p tw="text-secondary">overdue</p>
              </div>
              <div>
                <div>
                  <span tw="text-4xl font-bold text-blue-700">$0 </span>
                  <span tw="text-sm font-bold text-blue-700 ">USD</span>
                </div>
                <p>total outstanding</p>
              </div>
              <div>
                <div>
                  <span tw="text-4xl font-bold text-blue-700">$0 </span>
                  <span tw="text-sm font-bold text-blue-700 ">USD</span>
                </div>
                <p>in draft</p>
              </div>
            </div>
            <div tw="mt-20">
              <Title level={4}>Recently Active</Title>
              <div tw="flex">
                <div tw="border border-dashed flex w-72 rounded-md  mr-5 justify-center items-center">
                <div tw="flex flex-col">
                  <PlusOutlined tw="text-3xl text-green-400" />
                    <span tw="text-lg text-2xl font-bold">New Client</span>
                </div>
                </div>
                <Link to={`/clients/1/client-detail`}>
                <CardClient
                  title="Default size card"
                  size="small"
                  style={{
                    width: 300,
                  }}
                >
                  <div tw="flex justify-around">
                    <img src={Photo} alt="profile" tw="w-14 h-14"/>
                    <div tw="grid">
                      <h3 tw="font-bold text-lg">Card content</h3>
                      <p tw="text-sm">Company Name</p>
                    </div>
                  </div>
                  <div>
                    <MailOutlined tw="mr-1" />
                    <span>kywu@mailinator.com</span>
                  </div>
                  <div>
                    <PhoneOutlined tw="mr-1" />
                    <span>+6289669235897</span>
                  </div>
                </CardClient>
                </Link>
                
              </div>
            </div>
            <div tw="mt-20">
              <AllClientTabs/>
              <div
                tw='flex justify-between mb-4'
              >
                <Title level={5}>All Sent Emails</Title>
                <div tw="flex relative cursor-pointer">
                <InputAdvanceSearch  prefix={<SearchOutlined />} />
                <div onClick={()=>setIsAdvance(!isAdvance)}  tw="inline-flex rounded-r-full border border-gray-300 justify-center items-center w-36">
                  <UnorderedListOutlined />
                  <span tw="text-xs ml-2">Advanced Search </span>
                  <CaretDownOutlined tw='ml-1' />
                </div>
              </div>
           
              </div>
              {isAdvance ?  <div tw='bg-gray-100 border-y-2 border-gray-400 p-3 mb-4'>
           <FormAdvanceSearchEmail form={form} setIsAdvance={setIsAdvance}/>

            </div>
          : <></>  
          }
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={data}
                  pagination={false}
                  className="ant-border-space"
                />
              </div>
              <div tw="flex justify-between mt-5">
              <div>
                <span tw="text-sm text-black font-bold">1-4 of 4 </span>
              </div>
              <div tw="flex flex-col items-center">
                <button
                  
                  tw="mb-3 cursor-pointer text-black border border-gray-200 px-3 py-1 text-sm rounded bg-transparent hover:bg-gray-200 "
                >
                  View Deleted Emails                </button>
                <p tw="text-xs text-gray-500">
                Emails sent more than 90 days ago are automatically purged
                </p>
              </div>
              <div tw="invisible">hide</div>
            </div>
            </div>
            
          </div>
        </div>
      </>
    );
  }
  
  
  