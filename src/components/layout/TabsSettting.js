import { Col, Row, Tabs, Typography } from "antd";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";

export default function TabsSettting() {
  const { Title } = Typography;
  const { pathname } = useLocation();

  const history = useHistory();
  const handleClick = (key) => {
    history.push(`${key}`);
    // console.log(key,"key");
  };
  return (
    <div tw='overflow-x-auto md:overflow-x-hidden w-screen md:w-auto justify-center'>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Tabs
            defaultActiveKey={pathname}
            onChange={handleClick}
            tw="w-screen md:w-[60rem]"
          >
            <Tabs.TabPane tab="Account" key="/global-settings" />

            <Tabs.TabPane tab="Business" key="/global-settings/business" />

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
