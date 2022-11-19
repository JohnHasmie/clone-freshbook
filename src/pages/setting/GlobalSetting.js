import { Col, Form, Input, Row, Select, Typography } from "antd";
import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import ButtonSubmit from '../../components/ButtonSubmit';
import tw from 'twin.macro';

export default function GlobalSetting() {
  const { Title } = Typography;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { data } = useQuery("profile", () =>
    axios.get("user/profile").then((res) => res.data)
  );
  const onFinish = (values) => {
    console.log("Success:", values);
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="layout-content">
        <Form
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
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
      <div style={{ width: "75%" }}>
          <Row gutter={24}>
            <Col span={24}>
              <Title level={3}>Account Details</Title>
            </Col>
            <Col span={24}>
              <img
                src={data?.data?.user?.avatar + "Heri Setiawan"}
                className="profile-photo"
                tw='w-20 h-20'
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
                label="First Name"
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
                  defaultValue="(utc+0:00)"
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: "(utc+0:00)",
                      label: "(UTC+0:00) Etc - GMT",
                    }
                  ]}
                />
              </Form.Item>
            </Col>

          
          
          </Row>
      </div>
      <ButtonSubmit/>
        </Form>
    </div>
  );
}
