import { Button, Form, Input, notification } from "antd";
import React, { useState, useEffect } from "react";
import CardPopup from "../CardPopup";
import tw from "twin.macro";
import { useLocation } from "react-router-dom";
import moment from "moment";
import { useMutation } from "react-query";
import axios from "axios";

export default function SendEmail({hide}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setIsTitle] = useState("");

  let { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("revenue-by-client")) {
      setIsTitle("Revenue By Client");
    }
    if (pathname.includes("account-aging")) {
      setIsTitle("Accounts Aging");
    }
    if (pathname.includes("recurring-revenue")) {
      setIsTitle("Recurring Revenue Annual");
    }
    if (pathname.includes("payments-collected")) {
      setIsTitle("Payments Collected");
    }
    if (pathname.includes("account-statement")) {
      setIsTitle("Account Statement");
    }
    if (pathname.includes("invoice-detail")) {
      setIsTitle("Invoice Detail");
    }
  }, [pathname]);

  const { TextArea } = Input;
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
      <CardPopup title={`Email this ${isTitle}`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            subject: `Oasis Land sent you a ${isTitle}`,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="To" name="email" tw="px-2 pt-2">
            <Input type="email" placeholder="Email Address" />
          </Form.Item>

          <Form.Item label="Subject" name="subject" tw="px-2 ">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="File" name="file" tw="px-2 ">
            <div> {isTitle} as of Nov 23, 2022.csv</div>
          </Form.Item>
          <div tw="flex flex-col justify-center border-t border-gray-200 p-2">
            <div tw="text-center mb-2">
              Heri Setiawan from Oasis Land has sent you an {isTitle} as of Nov
              23, 2022
            </div>
            <TextArea rows={3} />
          </div>
          <div tw="flex justify-end border-t border-gray-200 pb-0 pt-2 px-2">
            <Form.Item>
              <Button tw="mr-2" onClick={hide}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button tw="bg-success text-white">Send Report</Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}


export  function SendEmailDefault({hide,dataClients,user,mutation}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitle, setIsTitle] = useState("");
  

  let { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes("revenue-by-client")) {
      setIsTitle("Revenue By Client");
    }
    if (pathname.includes("account-aging")) {
      setIsTitle("Accounts Aging");
    }
    if (pathname.includes("recurring-revenue")) {
      setIsTitle("Recurring Revenue Annual");
    }
    if (pathname.includes("payments-collected")) {
      setIsTitle("Payments Collected");
    }
    if (pathname.includes("account-statement")) {
      setIsTitle("Account Statement");
    }
    if (pathname.includes("invoice-detail")) {
      setIsTitle("Invoice Detail");
    }
  }, [pathname]);

  const { TextArea } = Input;

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinish = (values) => {
    mutation.mutate(values)
  };
 
  return (
    <>
      <CardPopup title={`Email this ${isTitle}`}>
        <Form
          name="basic"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 20,
          }}
      
          fields={[
    
            {
              name: ["subject"],
              value: `${user?.data?.company_name} sent you a ${isTitle}`,
            }
      
         
          ]}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="To" name="to" tw="px-2 pt-2"
             rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" placeholder="Email Address" />
          </Form.Item>

          <Form.Item label="Subject" name="subject" tw="px-2 ">
            <Input type="text" />
          </Form.Item>
          {/* <Form.Item label="File" name="file" tw="px-2 ">
            <div> {isTitle} as of Nov 23, 2022.csv</div>
          </Form.Item> */}
          <div tw="flex flex-col justify-center border-t border-gray-200 p-2">
            <div tw="text-center mb-2">
              {user?.data?.first_name} {user?.data?.last_name} from {user?.data?.company_name} has sent you an {isTitle} as of {moment().format("MMM DD, YYYY")}
            </div>
         <Form.Item name="body" tw=" pl-4 w-full"
          
         >
             <TextArea rows={3} />
         </Form.Item>
          </div>
          <div tw="flex justify-end border-t border-gray-200 pb-0 pt-2 px-2">
            <Form.Item>
              <Button tw="mr-2" onClick={hide}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" tw="bg-success text-white">Send Report</Button>
            </Form.Item>
          </div>
        </Form>
      </CardPopup>
    </>
  );
}