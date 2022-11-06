import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import React from "react";
import maskGroup from "../../assets/images/mask-group.svg";

export default function GlobalSetting() {
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
                name: ["email"],
                value: "example@gmail.com",
              },
              {
                name: ["password"],
                value: "example12345",
              },
            ]}
          >
            <Row gutter={24}>
              <Col span={24}>
                <Title level={5}>Account Details</Title>
              </Col>
              <Col span={24}>
                <img src={maskGroup} alt="profile" />
                <p style={{ marginTop: "6px", color: "#0063c1" }}>
                  Upload Photo{" "}
                </p>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Firts Name"
                  //   rules={[{ required: true }]}
                  name="first_name"
                >
                  <Input
                    name="first_name"
                    type="text"
                    // defaultValue={name_business || ""}
                    // onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Last Name"
                  //   rules={[{ required: true }]}
                  name="last_name"
                >
                  <Input
                    name="last_name"
                    type="text"
                    // defaultValue={name_business || ""}
                    // onChange={onChange}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Email Address"
                  //   rules={[{ required: true }]}
                  name="email"
                >
                  <Input
                    name="email"
                    type="email"
                    disabled
                    // onChange={onChange}
                  />
                </Form.Item>
                <p style={{ color: "#0063c1" }}>Disconnect Google Account</p>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Password"
                  //   rules={[{ required: true }]}
                  name="password"
                >
                  <Input
                    name="password"
                    type="password"
                    disabled

                    // onChange={onChange}
                  />
                </Form.Item>
                <p style={{ color: "#0063c1" }}>Change Password</p>
              </Col>

              <Col span={24} style={{ marginTop: "50px" }}>
                <Title level={5}>Preferences</Title>
              </Col>

              <Col span={24}>
                <Form.Item
                  label="Time Zone"
                  //   rules={[{ required: true }]}
                  name="time_zone"
                >
                  <Select
                    defaultValue="Asia Jakarta"
                    style={{
                      width: "100%",
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
                      {
                        value: "all_time_zone",
                        disabled: true,
                        label: "All Time Zones",
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
                  label="Loading Screen Display"
                  //   rules={[{ required: true }]}
                  name="loading_screen"
                >
                  <Select
                    defaultValue="Show inspirational quotes"
                    style={{
                      width: "100%",
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "show freshbooks logo (no quotes)",
                        label: "Show Freshbooks logo (no quotes)",
                      },
                      {
                        value: "show inspirational quotes",
                        label: "Show inspirational quotes",
                      },
                    ]}
                  />
                </Form.Item>
                <p>Choose what appears when your account is loading.</p>
              </Col>
<Col span={24} style={{ marginTop: "50px" }}>
              <p style={{ color: "#0063c1" }}>
              Log out of FreshBooks on all devices
              </p>
         
            </Col>
            
            </Row>
          
          </Form>
        </div>
      </div>
    </>
  );
}
