import { Col, Form, Input, Row, Select, Typography } from "antd";
import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import ButtonSubmit from "../../components/ButtonSubmit";
import tw from "twin.macro";

export default function GlobalSetting() {
  const { Title } = Typography;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

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
            name: ["passwordDisabled"],
            value: "example",
          },
        ]}
      >
        <div tw='w-full md:w-9/12	'>
          <Row gutter={24} tw='mb-20'>
            <Col span={24}>
              <Title level={3}>Account Details</Title>
            </Col>
            <Col span={24}>
              <img
                src={data?.data?.user?.avatar + "Heri Setiawan"}
                className="profile-photo"
                tw="w-20 h-20"
                alt="profile"
              />

              <label
                htmlFor="photo"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  width: "150px",
                }}
              >
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  style={{ display: "none" }}
                  accept="image/jpeg, image/jpeg, image/png"
                  onChange={(e) => console.log(e)}
                />
                <p style={{ marginTop: "10px", color: "#0063c1" }}>
                  Upload Photo
                </p>
              </label>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="First Name" name="first_name">
                <Input name="first_name" type="text" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={12}>
              <Form.Item label="Last Name" name="last_name">
                <Input name="last_name" type="text" />
              </Form.Item>
            </Col>
            {!showEmail ? (
              <>
                <Col span={24}>
                  <Form.Item label="Email Address" name="email">
                    <Input name="email" type="email" disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <p
                    onClick={() => setShowEmail(true)}
                    tw="text-blue-700 -mt-5 cursor-pointer"
                  >
                    Change Email
                  </p>
                </Col>
              </>
            ) : (
              <>
                <Col span={24}>
                  <Form.Item label="Email Address" name="email">
                    <Input
                      name="email"
                      type="email"
                      placeholder="Current Email"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="New Email Address" name="newEmail">
                    <Input
                      name="newEmail"
                      type="email"
                      placeholder="New Email"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <p
                    onClick={() => setShowEmail(false)}
                    tw="text-blue-700 -mt-5 cursor-pointer"
                  >
                    Cancel
                  </p>
                </Col>
              </>
            )}
            {!showPassword ? (
              <>
                <Col span={24}>
                  <Form.Item label="Password" name="passwordDisabled">
                    <Input name="passwordDisabled" type="password" disabled />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <p
                    onClick={() => setShowPassword(true)}
                    tw="text-blue-700 -mt-5 cursor-pointer"
                  >
                    Change Password
                  </p>
                </Col>
              </>
            ) : (
              <>
                <Col span={24}>
                  <Form.Item label="Password" name="password">
                    <Input
                      name="password"
                      type="password"
                      placeholder="Current Password"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="New Password" name="newPassword">
                    <Input
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Confirm New Password"
                    name="passwordConfirmation"
                  >
                    <Input
                      name="passwordConfirmation"
                      type="password"
                      placeholder="Confirm New Password"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <p
                    onClick={() => setShowPassword(false)}
                    tw="text-blue-700 -mt-5 cursor-pointer"
                  >
                    Cancel
                  </p>
                </Col>
              </>
            )}
            <Col span={24} style={{ marginTop: "50px" }}>
              <Title level={3}>Preferences</Title>
            </Col>

            <Col span={24}>
              <Form.Item label="Time Zone" name="time_zone">
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
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <ButtonSubmit type='submit'/>
      </Form>
    </div>
  );
}
