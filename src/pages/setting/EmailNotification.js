import { Card, Checkbox, Col, Divider, Row, Switch, Typography } from "antd";
import React, { useState } from "react";

export default function EmailNotification() {
  const { Title, Text } = Typography;
  const [switched, setSwitched] = useState(true);


  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
          <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mt-25 mb-24">
            <Title level={4}>Email Notifications</Title>
            <Text>
              Turn on or off notification emails FreshBooks sends you.{" "}
              <a>Learn more</a>
            </Text>
          </Col>

          <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mb-24">
            <Card
              bordered={true}
              style={{ width: "300", borderColor: "#cdd4d9" }}
              className="criclebox "
            >
              <Row gutter>
                <Col
                  xs={24}
                  md={24}
                  sm={24}
                  lg={24}
                  xl={24}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div>
                      <div className="ant-progress-project">
                        <Title level={5}>Email Notifications to me</Title>
                        <div>
                        <a role="button" style={{ color: "#0063c1", marginRight:"5px" }}>
                          Turn on/off all email notifications
                        </a>
                        <Switch defaultChecked onChange={()=>setSwitched(!switched)} />
                        </div>
                      
                      </div>
                      <Divider />
                      <p>Send me email when</p>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    className=" "
                    style={{ padding: "20px", display: "grid" }}
                  >
                    <p>Invoices</p>
                    <Checkbox
                    checked={switched}
                      onChange={(e) => console.log(e.target.value)}
                      style={{ marginLeft: "7px" }}
                    >
                      A recurring Invoice is sent
                    </Checkbox>
                    <Checkbox
                    checked={switched} onChange={(e) => console.log(e.target.value)}>
                      A comment is Added on an Invoice
                    </Checkbox>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    className="h-full"
                    style={{ padding: "20px", display: "grid" }}
                  >
                    <p>Invoices</p>
                    <Checkbox
                    checked={switched}
                      onChange={(e) => console.log(e.target.value)}
                      style={{ marginLeft: "7px" }}
                    >
                      An online payment is received{" "}
                    </Checkbox>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    className="h-full"
                    style={{ padding: "20px", display: "grid" }}
                  >
                    <p>Estimates and Proposals</p>
                    <Checkbox
                    checked={switched}
                      onChange={(e) => console.log(e.target.value)}
                      style={{ marginLeft: "7px" }}
                    >
                      A comment is added on an Estimate/Proposal
                    </Checkbox>
                    <Checkbox
                    checked={switched} onChange={(e) => console.log(e.target.value)}>
                      An Estimate/Proposal is accepted
                    </Checkbox>
                  </div>
                </Col>
                <Col span={12}>
                  <div
                    className="h-full"
                    style={{ padding: "20px", display: "grid" }}
                  >
                    <p>Projects</p>
                    <Checkbox
                    checked={switched}
                      onChange={(e) => console.log(e.target.value)}
                      style={{ marginLeft: "7px" }}
                    >
                      A comment is added on a Project
                    </Checkbox>
                    <Checkbox
                    checked={switched} onChange={(e) => console.log(e.target.value)}>
                      An post is made on a Project
                    </Checkbox>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
