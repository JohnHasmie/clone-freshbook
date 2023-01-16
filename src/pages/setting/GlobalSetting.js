import { Col, Form, Input, notification, Row, Select, Typography } from "antd";
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
    phone: "",
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
        notification.success({
          message: `Changes to your profile are now saved.
          `,
          placement: "topLeft",
        });
      },
      onError: (err) => {
        switch (err?.response?.status) {        
          case 500:
            notification.error({
              message: `Internal Server Error`,
              placement: "topLeft",
            });
            break;
      
        default:
          notification.error({
            message: `An Error Occurred Please Try Again Later`,
            placement: "topLeft",
          });
          break;
      }
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

  );

  const onSelectFile = (e) => {
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
      {user?.status === undefined  &&   <div role="status" tw="flex flex-col items-center justify-center">
            <svg
              tw="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>}
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
          <div tw="w-full md:w-9/12	md:ml-24">
            <Row gutter={24} tw="mb-20">
              <Col span={24}>
                <Title level={3}>Account Details</Title>
              </Col>
              <Col span={24}>
              { user?.data?.first_name !== null  && user?.data?.last_name !==null ? 
           <div
            tw="rounded-full w-[70px] bg-gray-300 text-black px-2 py-3.5 text-4xl font-medium"
            >
              {user?.data?.first_name[0] +user?.data?.last_name[0] }
            </div>
          :  
          <div
          tw="rounded-full w-[70px] bg-gray-300 text-black px-2 py-3.5 text-4xl font-medium"
          >
            UK
          </div>
          }
                {/* <div
            tw="rounded-full w-[70px] bg-gray-300 text-black px-2 py-3.5 text-4xl font-medium"
            >
              {user?.data?.first_name[0] +user?.data?.last_name[0] }
            </div> */}

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
                      tw="text-blue-700  cursor-pointer"
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
                      <Input
                        name="password"
                        type="password"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <p
                      onClick={openPassword}
                      tw="text-blue-700  cursor-pointer"
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
                      <Input
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
                      <Input
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
              <Col span={24} style={{ marginTop: "50px" }} >
                <Title level={3}>Preferences</Title>
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
