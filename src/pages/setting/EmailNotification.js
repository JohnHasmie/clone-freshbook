import { Card, Checkbox, Col, Divider, Row, Switch, Typography } from "antd";
import React, { useState } from "react";
import tw from "twin.macro";

export default function EmailNotification() {
  const { Title, Text } = Typography;
  const [isCheck, setIsCheck] = useState({
    recurringInvoice: false,
    commentIsAdded: false,
  });
  const changeisCheck = (type) => {
    switch (type) {
      case "recurring":
        setIsCheck({
          ...isCheck,
          recurringInvoice: !isCheck.recurringInvoice,
        });
        break;

      case "comment":
        setIsCheck({
          ...isCheck,
          commentIsAdded: !isCheck.commentIsAdded,
        });
        break;

      case "all":
        setIsCheck({
          commentIsAdded: !isCheck.commentIsAdded,

          recurringInvoice: !isCheck.recurringInvoice,
        });
        break;

      default:
        setIsCheck({
          recurringInvoice: false,
          commentIsAdded: false,
        });
        break;
    }
  };
  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
          <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mt-25 mb-24">
            <Title level={3}>Email Notifications</Title>
           
          </Col>
          <div tw="w-full md:w-[90%]" >
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
                        <div tw="flex justify-between">
                          <Title level={3}>Email Notifications to me</Title>
                          {/* <div>
                            <a
                              role="button"
                              style={{ color: "#0063c1", marginRight: "5px" }}
                            >
                              Turn on/off all email notifications
                            </a>
                            <Switch
                            checked={isCheck.recurringInvoice && isCheck.commentIsAdded}
                              onChange={() => changeisCheck('all')}
                            />
                          </div> */}
                        </div>
                        <Divider />
                        <p className="text-secondary">Send me email when</p>
                      </div>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div
                      tw="grid justify-start p-5" 
                    >
                      <p className="font-small">Invoices</p>
                      <Checkbox
                        className="font-normal"
                        checked={isCheck.recurringInvoice}
                        onChange={() => changeisCheck('recurring')}
                      >
                        A recurring Invoice is sent
                      </Checkbox>
                      <Checkbox
                        className="font-normal"
                        checked={isCheck.commentIsAdded}
                        onChange={() => changeisCheck('comment')}
                      tw="!ml-0"
                      >
                        A comment is Added on an Invoice
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
