import { Col, Form, Input, Row, Select, Typography } from "antd";
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

export default function GlobalSetting() {
  const { Title } = Typography;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { data } = useQuery("profile", () =>
    axios.get("user/profile").then((res) => res.data)
  );
  return (
    <>
      <div style={{ width: "75%" }}>
        <Form
          layout="vertical"
          size={"large"}
          fields={[
            {
              name: ["email"],
              value: data?.data?.user?.email,
            },
            {
              name: ["password"],
              value: "example",
            },
          ]}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Title level={3}>Account Details</Title>
            </Col>
            <Col span={24}>
              <img
                src={data?.data?.user?.avatar + "Heri Setiawan"}
                className="profile-photo"
                alt="profile"
              />

              <label
                htmlFor="photo"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width:"150px"
                }}
              >
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  style={{display:"none"}}
                  accept="image/jpeg, image/jpeg, image/png"
                  onChange={(e) => console.log(e)}
                />
                <p style={{ marginTop: "10px", color: "#0063c1" }}>
                  Upload Photo
                </p>
              </label>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Firts Name"
                name="first_name"
              >
                <Input
                  name="first_name"
                  type="text"
      
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="last_name"
              >
                <Input
                  name="last_name"
                  type="text"
            
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email Address"
                name="email"
              >
                <Input
                  name="email"
                  type="email"
                  disabled
                />
              </Form.Item>
              <p style={{ color: "#0063c1", marginTop:"-10px" }}>Disconnect Google Account</p>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Password"
                name="password"
              >
                <Input
                  name="password"
                  type="password"
                  disabled
                />
              </Form.Item>
              <p style={{ color: "#0063c1", marginTop:"-10px" }}>Change Password</p>
            </Col>

            <Col span={24} style={{ marginTop: "50px" }}>
              <Title level={3}>Preferences</Title>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Time Zone"
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
              <p className="font-small text-secondary" style={{marginTop:"-10px"}}>Choose what appears when your account is loading.</p>
            </Col>
            <Col span={24} style={{ marginTop: "50px" }}>
              <p style={{ color: "#0063c1" }}>
                Log out of FreshBooks on all devices
              </p>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
