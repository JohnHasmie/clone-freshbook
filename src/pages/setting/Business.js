import { Col, Form, Input, notification, Row, Select, Typography } from "antd";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ButtonSubmit from "../../components/ButtonSubmit";
import tw from "twin.macro";
import { countryList } from "../../components/Countries";
import AppContext from "../../components/context/AppContext";

export default function Business() {
  const { Title } = Typography;
  const [selectedItems, setSelectedItems] = useState({
    country: "Indonesia",
    base_currency: "usd",
    business_time_zone: "(utc+0:00)",
    fiscal_year_end_month: "Dec",
    fiscal_year_end_day: "1",
    date_format: "dd/mm/yy",
  });
  const { setting} = useContext(AppContext);
  const queryClient = useQueryClient();


  const handleChange = (value, type) => {
    switch (type) {
      case "country":
        setSelectedItems({
          ...selectedItems,
          country: value,
        });
        break;

      case "base_currency":
        setSelectedItems({
          ...selectedItems,
          base_currency: value,
        });
        break;

      case "business_time_zone":
        setSelectedItems({
          ...selectedItems,
          business_time_zone: value,
        });
        break;

      case "fiscal_year_end_month":
        setSelectedItems({
          ...selectedItems,
          fiscal_year_end_month: value,
        });
        break;

      case "fiscal_year_end_day":
        setSelectedItems({
          ...selectedItems,
          fiscal_year_end_day: value,
        });
        break;
      case "date_format":
        setSelectedItems({
          ...selectedItems,
          date_format: value,
        });
        break;

      default:
        return setSelectedItems({
          country: "Indonesia",
          base_currency: "usd",
          business_time_zone: "(utc+0:00)",
          fiscal_year_end_month: "Dec",
          fiscal_year_end_day: "1",
          date_format: "dd/mm/yy",
        });
    }
  };
  const onChange = (e) => {
    setSelectedItems({ ...selectedItems, [e.target.name]: e.target.value });
  };

  const mutation = useMutation(
    async (data) => {
      return axios.put("settings", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("settings");
        notification.success({
          message: `Your Company Profile has been updated.`,
          description:'This information will appear on your invoice',
          placement: "topLeft",
        });
        

      },
      onError: (err) => {
        notification.error({
          message: `An Error Occurred Please Try Again Later`,
          placement: "topLeft",
        });
        console.log(err.response.data.message);
      },
    }
  );
  const onFinish = (values) => {
    mutation.mutate(values)

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        tw="w-full"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        fields={[
          {
            name: ["company_name"],
            value: setting?.data?.company_name,
          },
          {
            name: ["phone"],
            value: setting?.data?.phone,
          },
          {
            name: ["mobile_phone"],
            value: "",
          },
          {
            name: ["state"],
            value: "",
          },
          {
            name: ["addres"],
            value: setting?.data?.address,
          },
          {
            name: ["addres_2"],
            value: "",
          },
          {
            name: ["country"],
            value: selectedItems.country,
          },
          {
            name: ["base_currency"],
            value: selectedItems.base_currency,
          },
          {
            name: ["business_time_zone"],
            value: selectedItems.business_time_zone,
          },
          {
            name: ["fiscal_year_end_month"],
            value: selectedItems.fiscal_year_end_month,
          },
          {
            name: ["fiscal_year_end_day"],
            value: selectedItems.fiscal_year_end_day,
          },
          {
            name: ["date_format"],
            value: selectedItems.date_format,
          },
          {
            name: ["city"],
            value: setting?.data?.city,
          },
          {
            name: ["zip"],
            value: setting?.data?.zip,
          },
        ]}
      >
        <div tw="w-full md:w-9/12	md:ml-24">
          <Row gutter={24} tw="mb-20">
            <Col xs={24} lg={24} style={{ marginBottom: "20px" }}>
              <Title level={3}>Business Details</Title>
            </Col>
            <Col xs={24} lg={24}>
              <Form.Item label="Business Name" name="company_name">
                <Input name="company_name" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Business Phone" name="phone">
                <Input
                  name="phone"
                  type="text"
                  // defaultValue={name_business || ""}
                  // onChange={onChange}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Mobile Phone" name="mobile_phone">
                <Input name="mobile_phone" type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Address Line 1" name="address">
                <Input name="address" type="text" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Address Line 2" name="addres_2">
                <Input name="addres_2" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="City" name="city">
                <Input name="city" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="ZIP Code" name="zip">
                <Input name="zip" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="State" name="state">
                <Input name="state" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Country" name="country">
                <Select
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => onChange({
                    target: { value: e, name: "country" },
                  })}
                  options={countryList.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                />
              </Form.Item>
            </Col>

            <Col span={24} style={{ marginTop: "50px" }}>
              <Title level={3}>Preferences</Title>
            </Col>

            <Col xs={24} lg={12}>
              <Form.Item
                label="Base Currency"
                //   rules={[{ required: true }]}
                name="base_currency"
              >
                <Select
                  onChange={(e) => onChange({
                    target: { value: e, name: "base_currency" },
                  })}
                  options={[
                    {
                      value: "usd",
                      label: "USD - US dollar",
                    },

                    {
                      value: "euro",
                      label: "EUR- Euro",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}></Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Business Time Zone" name="business_time_zone">
                <Select
                  tw="rounded-lg"
                  onChange={(e) => onChange({
                    target: { value: e, name: "business_time_zone" },
                  })}
                  options={[
                    {
                      value: "(utc+0:00)",
                      label: "(UTC+0:00) Etc - GMT",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}></Col>
            <Col xs={24} lg={12}>
              <Form.Item
                label="Fiscal Year End Month"
                name="fiscal_year_end_month"
              >
                <Select
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => onChange({
                    target: { value: e, name: "fiscal_year_end_month" },
                  })}
                  options={[
                    {
                      value: "Jan",
                      label: "January",
                    },
                    {
                      value: "Feb",
                      label: "February",
                    },
                    {
                      value: "Mar",
                      label: "March",
                    },
                    {
                      value: "Apr",
                      label: "April",
                    },
                    {
                      value: "May",
                      label: "May",
                    },
                    {
                      value: "Jun",
                      label: "June",
                    },
                    {
                      value: "Jul",
                      label: "July",
                    },
                    {
                      value: "Aug",
                      label: "August",
                    },
                    {
                      value: "Sep",
                      label: "September",
                    },
                    {
                      value: "Oct",
                      label: "October",
                    },
                    {
                      value: "Nov",
                      label: "November",
                    },
                    {
                      value: "Dec",
                      label: "December",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Fiscal Year End Day" name="fiscal_year_end_day">
                <Select
                  style={{
                    width: "100%",
                  }}
                  onChange={(e) => onChange({
                    target: { value: e, name: "fiscal_year_end_day" },
                  })}
                  options={[
                    {
                      value: 1,
                      label: 1,
                    },
                    {
                      value: 2,
                      label: 2,
                    },
                    {
                      value: 3,
                      label: 3,
                    },
                    {
                      value: 4,
                      label: 4,
                    },
                    {
                      value: 5,
                      label: 5,
                    },
                    {
                      value: 6,
                      label: 6,
                    },
                    {
                      value: 7,
                      label: 7,
                    },
                    {
                      value: 8,
                      label: 8,
                    },
                    {
                      value: 9,
                      label: 9,
                    },
                    {
                      value: 10,
                      label: 10,
                    },
                    {
                      value: 11,
                      label: 11,
                    },
                    {
                      value: 12,
                      label: 12,
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <p
                className="font-small text-secondary"
                style={{ marginTop: "-10px" }}
              >
                Choose what month and day your fiscal year ends. This will be
                reflected by reports and dashboard widgets.
              </p>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Date Format" name="date_format">
                <Select
                    onChange={(e) => onChange({
                      target: { value: e, name: "date_format" },
                    })}
                  options={[
                    {
                      value: "dd/mm/yy",
                      label: "dd/mm/yy",
                    },
                    {
                      value: "dd.mm.yy",
                      label: "dd.mm.yy",
                    },
                    {
                      value: "mm/dd/yy",
                      label: "mm/dd/yy",
                    },
                    {
                      value: "yyyy/mm/dd",
                      label: "yyyy/mm/dd",
                    },
                    {
                      value: "yyyy-mm-dd",
                      label: "yyyy-mm-dd",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <ButtonSubmit type="submit" />
      </Form>
    </>
  );
}
