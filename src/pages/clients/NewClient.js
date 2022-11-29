import {
  DownOutlined,
  InfoOutlined,
  LeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import { countryList } from "../../components/Countries";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction from "../../components/Reports/MoreAction";
import SendEmail from "../../components/Reports/SendEmail";
import ClientSetting from "./ClientSetting";

export default function NewClient() {
  const { Title } = Typography;
  let history = useHistory();
  const [open, setOpen] = useState({
    sendReminders:false,
    charge:false,
    currency:false,
    invoiceAttachment:false,
    opened:false

  });
  const [isAdd, setIsAdd] = useState({
    business_phone: false,
    mobile_phone: false,
    address: false,
  });

  const handleIsAdd = (type) => {
    switch (type) {
      case "business_phone":
        setIsAdd({
          ...isAdd,
          business_phone: true,
        });
        break;
      case "mobile_phone":
        setIsAdd({
          ...isAdd,
          mobile_phone: true,
        });
        break;
      case "address":
        setIsAdd({
          ...isAdd,
          address: true,
        });
        break;

      default:
        setIsAdd({
          business_phone: false,
          mobile_phone: false,
          address: false,
        });
        break;
    }
  };
  const [form] = Form.useForm();
  const handleFinish = (values) => {
    console.log("values: ", values);
  };


 
  return (
    <div tw="max-w-screen-lg mx-auto">
      <div tw="flex justify-between items-center my-2">
        <Title level={2}>New Client</Title>
        <div tw="flex ">
          <ButtonMore onClick={() => history.goBack()}>
            <span>Cancel</span>
          </ButtonMore>
          <Button
            onClick={() => form.submit()}
            tw=" ml-2 bg-success text-white px-4 h-auto flex items-center "
          >
            <span tw="text-lg">Save</span>
          </Button>
        </div>
      </div>
      <div tw="grid grid-cols-12 gap-5">
        <CardReporting tw="col-span-9 mb-10">
          <span tw="text-xs text-gray-500">
            <InfoOutlined tw="mr-1 rounded-full border p-0.5" /> Either First
            and Last Name or Company Name is required to save this Client.
          </span>
          <Form
            form={form}
            onFinish={handleFinish}
            // onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <div tw="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
              <div>
                <Form.Item label="First Name" name="first_name">
                  <Input type="text" />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Last Name" name="last_name">
                  <Input type="text" />
                </Form.Item>
              </div>
              <div tw="col-span-2">
                <Form.Item label="Company Name" name="company_name">
                  <Input type="text" />
                </Form.Item>
              </div>
              <Divider tw="col-span-2" />
              <div tw="col-span-2 w-6/12">
                <Form.Item label="Email Address" name="email_address">
                  <Input type="email" />
                </Form.Item>
              </div>
              <div tw="col-span-2 w-6/12">
                <Form.Item label="Phone Number" name="phone_number">
                  <Input type="number" />
                </Form.Item>
              </div>
              {isAdd.business_phone ? (
                <div tw="col-span-2 w-6/12">
                  <Form.Item
                    label="Business Phone Number"
                    name="business_phone_number"
                  >
                    <Input type="text" />
                  </Form.Item>
                </div>
              ) : (
                <div tw="col-span-2 w-6/12">
                  <span
                    onClick={() => handleIsAdd("business_phone")}
                    tw="cursor-pointer text-primary hover:text-blue-400"
                  >
                    <PlusOutlined tw="text-lg" />
                    <span>Add Business Phone</span>
                  </span>
                </div>
              )}

              {isAdd.mobile_phone ? (
                <div tw="col-span-2 w-6/12">
                  <Form.Item
                    label="Mobile Phone Number"
                    name="mobile_phone_number"
                  >
                    <Input type="text" />
                  </Form.Item>
                </div>
              ) : (
                <div tw="col-span-2 w-6/12">
                  <span
                    onClick={() => handleIsAdd("mobile_phone")}
                    tw="cursor-pointer text-primary hover:text-blue-400"
                  >
                    <PlusOutlined tw="text-lg" />
                    <span>Add Mobile Phone</span>
                  </span>
                </div>
              )}
              <Divider tw="col-span-2" />
              {isAdd.address ? (
                <>
                  <div tw="col-span-2 w-6/12">
                    <Form.Item label="Country" name="country">
                      <Select
                        defaultValue="Indonesia"
                        options={countryList.map((item) => ({
                          label: item,
                          value: item,
                        }))}
                      />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2">
                    <Form.Item label="Address Line 1" name="address_line_1">
                      <Input type="text" />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2">
                    <Form.Item label="Address Line 2" name="address_line_2">
                      <Input type="text" />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2 w-6/12">
                    <Form.Item label="City" name="city">
                      <Input type="text" />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2 w-6/12">
                    <Form.Item label="State" name="state">
                      <Input type="text" />
                    </Form.Item>
                  </div>
                  <div tw="col-span-2 w-6/12">
                    <Form.Item label="ZIP Code" name="zip">
                      <Input type="text" />
                    </Form.Item>
                  </div>
                  <Divider tw="col-span-2" />
                  <div>
                    <Form.Item label="Tax Name" name="tax_number">
                      <Input type="text" defaultValue="VAT Number" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item label="Tax Number" name="tax_name">
                      <Input type="text" />
                    </Form.Item>
                  </div>
                </>
              ) : (
                <div tw="col-span-2 w-6/12">
                  <span
                    onClick={() => handleIsAdd("address")}
                    tw="cursor-pointer text-primary hover:text-blue-400"
                  >
                    <PlusOutlined tw="text-lg" />
                    <span>Add Address</span>
                  </span>
                </div>
              )}
            </div>
          </Form>
        </CardReporting>
        <ClientSetting
         
          open={open}
          setOpen={setOpen}
        />
      </div>
    </div>
  );
}
