import { Col, Row, Tabs } from "antd";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";
import useAuth from "../../hooks/useAuth";

export default function TabsSettting() {
  const { pathname } = useLocation();
const { role } = useAuth();

  const history = useHistory();
  const handleClick = (key) => {
    history.push(`${key}`);
    // console.log(key,"key");
  };
  return (
    <div tw=' w-screen md:w-auto justify-center'>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Tabs
          type="card"
            defaultActiveKey={pathname}
            onChange={handleClick}
            tw="w-screen md:w-[60rem]"
          >
            <Tabs.TabPane tab="Account" key="/global-settings" />

            {role === "admin" && <Tabs.TabPane tab="Business" key="/global-settings/business" />}

            <Tabs.TabPane
              tab="Email Notifications"
              key="/global-settings/email-notifications"
            />
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
