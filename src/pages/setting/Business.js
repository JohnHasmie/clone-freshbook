import { Button, Col, Divider, Form, Input, Row, Select, Typography } from "antd";
import React from "react";
import maskGroup from "../../assets/images/mask-group.svg";

export default function Business() {
  const { Title } = Typography;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <div className="layout-content">
        <div style={{ width: "75%" }}>
          <Form
            layout="vertical"
            size={"large"}
            fields={[
              {
                name: ["business_name"],
                value: "Kedai Pixel",
              },
            ]}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title level={5}>Business Details</Title>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Business Name"
                  //   rules={[{ required: true }]}
                  name="business_name"
                >
                  <Input
                    name="business_name"
                    type="text"
                    // defaultValue={name_business || ""}
                    // onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Business Phone"
                  //   rules={[{ required: true }]}
                  name="business_phone"
                >
                  <Input
                    name="business_phone"
                    type="text"
                    // defaultValue={name_business || ""}
                    // onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mobile Phone"
                  //   rules={[{ required: true }]}
                  name="mobile_phone"
                >
                  <Input
                    name="mobile_phone"
                    type="text"
                    // defaultValue={name_business || ""}
                    // onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Address Line 1"
                  //   rules={[{ required: true }]}
                  name="addres_line_1"
                >
                  <Input
                    name="addres_line_1"
                    type="text"
                    // defaultValue={name_business || ""}
                    // onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Address Line 2"
                  //   rules={[{ required: true }]}
                  name="addres_line_2"
                >
                  <Input
                    name="addres_line_2"
                    type="text"
                    // defaultValue={name_business || ""}
                    // onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="City" name="city">
                  <Input name="city" type="text" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="ZIP Code" name="zip_code">
                  <Input name="zip_code" type="text" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="State" name="state">
                  <Input name="state" type="text" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Country" name="country">
                  <Input name="country" type="text" />
                </Form.Item>
              </Col>

              <Col span={24} style={{ marginTop: "50px" }}>
                <Title level={5}>Preferences</Title>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Base Currency"
                  //   rules={[{ required: true }]}
                  name="base_currency"
                >
                  <Select
                    defaultValue="USD-US dollar"
                    style={{
                      width: "50%",
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "usd",
                        label: "USD-US dollar",
                      },
                      {
                        value: "cad",
                        label: "CAD-Canadian dollar",
                      },
                      {
                        value: "euro",
                        label: "EUR-Euro",
                      },
                      {
                        value: "pacific_niue",
                        label: "Pacific Niue",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Business Time Zone"
                  //   rules={[{ required: true }]}
                  name="business_time_zone"
                >
                  <Select
                    defaultValue="Asia Jakarta"
                    style={{
                      width: "50%",
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "asia_jakarta",
                        label: "Asia Jakarta",
                      },
                      {
                        value: "antartica_davis",
                        label: "Antartica Davis",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Fiscal Year End Month"
                  name="fiscal_year_end_month"
                >
                  <Select
                    defaultValue="December"
                    style={{
                      width: "100%",
                    }}
                    onChange={handleChange}
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
              <Col span={12}>
                <Form.Item
                  label="Fiscal Year End Day"
                  name="fiscal_year_end_day"
                >
                  <Select
                    defaultValue={1}
                    style={{
                      width: "100%",
                    }}
                    onChange={handleChange}
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
                <p>Choose what month and day your fiscal year ends. This will be reflected by reports and dashboard widgets.</p>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Date Format"
                  name="date_format"
                >
                  <Select
                    defaultValue="dd/mm/yy"
                    style={{
                      width: "50%",
                    }}
                    onChange={handleChange}
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
                      }
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Standart Rate" name="standart_rate">
                  <Input name="standart_rate" type="text" placeholder="$0.00"/>
                </Form.Item>
              </Col>
            </Row>
            <Divider/>
            <p>Looking for a way to update your <strong>Invoice due dates</strong>? <a>Click here</a></p>
          </Form>
        </div>
      </div>
    </>
  );
}
