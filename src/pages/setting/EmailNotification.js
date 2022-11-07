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
            <Title level={3}>Email Notifications</Title>
            <p className="text-dark">
              Turn on or off notification emails FreshBooks sends you.{" "}
              <a>Learn more</a>
            </p>
          </Col>
          <div style={{ width: "90%" }}>
            <Col xs={24} md={24} sm={24} lg={20} xl={24} className="mb-24">
              <Card
                bordered={true}
                style={{ borderColor: "#cdd4d9" }}
                className="criclebox "
              >
                <Row gutter>
                  <Col
                    xs={24}
                    md={24}
                    sm={24}
                    lg={24}
                    xl={24}
                    style={{ marginBottom: "-30px" }}
                  >
                    <div className="h-full col-content p-20">
                      <div>
                        <div className="ant-progress-project">
                          <Title level={3}>Email Notifications to me</Title>
                          <div>
                            <a
                              role="button"
                              style={{ color: "#0063c1", marginRight: "5px" }}
                            >
                              Turn on/off all email notifications
                            </a>
                            <Switch
                              defaultChecked
                              onChange={() => setSwitched(!switched)}
                            />
                          </div>
                        </div>
                        <Divider />
                        <p className="text-secondary">Send me email when</p>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      className=" "
                      style={{ padding: "20px", display: "grid" }}
                    >
                      <p className="font-small">Invoices</p>
                      <Checkbox
                        className="font-normal"
                        onChange={(e) => console.log(e.target.value)}
                        style={{ marginLeft: "7px" }}
                      >
                        A recurring Invoice is sent
                      </Checkbox>
                      <Checkbox
                        className="font-normal"
                        onChange={(e) => console.log(e.target.value)}
                      >
                        A comment is Added on an Invoice
                      </Checkbox>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      className="h-full"
                      style={{ padding: "20px", display: "grid" }}
                    >
                      <p className="font-small"> Payments</p>
                      <Checkbox
                        className="font-normal"
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
                      <p className="font-small">Estimates and Proposals</p>
                      <Checkbox
                        className="font-normal"
                        onChange={(e) => console.log(e.target.value)}
                        style={{ marginLeft: "7px" }}
                      >
                        A comment is added on an Estimate/Proposal
                      </Checkbox>
                      <Checkbox
                        className="font-normal"
                        onChange={(e) => console.log(e.target.value)}
                      >
                        An Estimate/Proposal is accepted
                      </Checkbox>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div
                      className="h-full"
                      style={{ padding: "20px", display: "grid" }}
                    >
                      <p className="font-small">Projects</p>
                      <Checkbox
                        className="font-normal"
                        onChange={(e) => console.log(e.target.value)}
                        style={{ marginLeft: "7px" }}
                      >
                        A comment is added on a Project
                      </Checkbox>
                      <Checkbox
                        className="font-normal"
                        onChange={(e) => console.log(e.target.value)}
                      >
                        An post is made on a Project
                      </Checkbox>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </div>
        </Row>
      </div>
    </>
  );
}
