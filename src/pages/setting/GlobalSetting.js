import { Col, Form, Input, Row, Select, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ButtonSubmit from "../../components/ButtonSubmit";
import tw from "twin.macro";
import AppContext from "../../components/context/AppContext";

export default function GlobalSetting() {
  const { Title } = Typography;
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  const { user } = useContext(AppContext);
  const [isForm, setIsForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    new_email: "",
    new_email_confirmation: "",
    phone: "082243629916",
    password: "password12345",
    new_password: "",
    new_password_confirmation: "",
    time_zone: "(utc+0:00)",
  });
  const onChange = (e) => {
    setIsForm({ ...isForm, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    user?.status === "success" &&
      setIsForm({
        ...isForm,
        first_name: user?.data?.first_name,
        last_name: user?.data?.last_name,
        email: user?.data?.email,
        phone: user?.data?.phone,
      });
  }, [user]);

  const mutation = useMutation(
    async (data) => {
      return axios.put("user/profile", data).then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("profile");
        console.log(res);
      },
      onError: (err) => {
        console.log(err.response.data.message);
      },
    }
  );
  const onFinish = (values) => {
    if (form.getFieldValue("new_password") === "") {
      let obj = {};
      obj = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        phone: "089669235897",
        time_zone: values.time_zone,
      };
      mutation.mutate(obj);
    } else {
      let dummyPhone = { phone: "089669235897" };
      mutation.mutate({ ...dummyPhone, ...values });
    }
    setIsForm({ ...isForm, password: "password12345" });

    setShowPassword(false);
    setShowEmail(false);
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  const mutationUpload = useMutation(
    async (data) => {
      return axios
        .post("user/avatar", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("profile");
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const onSelectFile = (e) => {
    console.log(e.target.files[0], "cek gambar");
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    mutationUpload.mutate(formData);
  };
  const openPassword = (e) => {
    setIsForm({ ...isForm, password: "" });
    setShowPassword(true);
  };
  const closePassword = (e) => {
    setIsForm({ ...isForm, password: "password12345" });
    setShowPassword(false);
  };

  return (
    <div className="layout-content">
      {user?.status === "loading" && <div>Loading...</div>}
      {user?.status === "success" && (
        <Form
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          layout="vertical"
          size={"large"}
          form={form}
          scrollToFirstError
          fields={[
            {
              name: ["email"],
              value: isForm.email,
            },
            {
              name: ["new_email"],
              value: isForm.new_email,
            },
            {
              name: ["new_email_confirmation"],
              value: isForm.new_email_confirmation,
            },
            {
              name: ["first_name"],
              value: isForm.first_name,
            },
            {
              name: ["last_name"],
              value: isForm.last_name,
            },
            {
              name: ["password"],
              value: isForm.password,
            },
            {
              name: ["new_password"],
              value: isForm.new_password,
            },
            {
              name: ["new_password_confirmation"],
              value: isForm.new_password_confirmation,
            },

            {
              name: ["time_zone"],
              value: isForm.time_zone,
            },
          ]}
          autoComplete="off"
        >
          <div tw="w-full md:w-9/12	">
            <Row gutter={24} tw="mb-20">
              <Col span={24}>
                <Title level={3}>Account Details</Title>
              </Col>
              <Col span={24}>
                <img
                  src={user?.data?.avatar + "+" + user?.data?.last_name}
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
                    accept="image/jpeg, image/jpg, image/png"
                    onChange={onSelectFile}
                  />
                  <p style={{ marginTop: "10px", color: "#0063c1" }}>
                    Upload Photo
                  </p>
                </label>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="First Name"
                  name="first_name"
                  rules={[{ required: true, message: "This cannot be blank" }]}
                >
                  <Input onChange={onChange} name="first_name" type="text" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Last Name"
                  name="last_name"
                  rules={[{ required: true, message: "This cannot be blank" }]}
                >
                  <Input onChange={onChange} name="last_name" type="text" />
                </Form.Item>
              </Col>
              {!showEmail ? (
                <>
                  <Col span={24}>
                    <Form.Item
                      label="Email Address"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
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
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="New Email Address" name="new_email">
                      <Input
                        onChange={onChange}
                        name="new_email"
                        type="email"
                        placeholder="New Email"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Confirm Email Address"
                      name="new_email_confirmation"
                    >
                      <Input
                        onChange={onChange}
                        name="new_email_confirmation"
                        type="email"
                        placeholder="Confirm New Email"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <p
                      onClick={() => setShowEmail(false)}
                      tw="text-blue-700  cursor-pointer"
                    >
                      Cancel
                    </p>
                  </Col>
                </>
              )}
              {!showPassword ? (
                <>
                  <Col span={24}>
                    <Form.Item label="Password" name="password">
                      <Input.Password
                        name="password"
                        type="password"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <p
                      onClick={openPassword}
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
                      <Input.Password
                        onChange={onChange}
                        name="password"
                        placeholder="Current Password"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="New Password"
                      name="new_password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password
                        onChange={onChange}
                        name="new_password"
                        type="password"
                        placeholder="New Password"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label="Confirm New Password"
                      name="new_password_confirmation"
                      dependencies={["new_password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("new_password") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        onChange={onChange}
                        name="new_password_confirmation"
                        placeholder="Confirm New Password"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <p
                      onClick={closePassword}
                      tw="text-blue-700 cursor-pointer"
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
                    style={{
                      width: "100%",
                    }}
                    onChange={(e) =>
                      onChange({
                        target: { value: e, name: "time_zone" },
                      })
                    }
                    options={[
                      {
                        value: "(utc+0:00)",
                        label: "(UTC+0:00) Etc - GMT",
                      },
                      {
                        value: "cek",
                        label: "Cek",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <ButtonSubmit htmlType="submit" />
        </Form>
      )}
    </div>
  );
}
