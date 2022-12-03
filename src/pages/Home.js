import { useContext, useState } from "react";

import {
  Card,
  Col,
  Row,
  Typography,
 
  Popover,
  Menu,
} from "antd";
import {

  DownOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import Echart from "../components/chart/EChart";
import DashboardChart from "../components/chart/DashboardChart";

import LineChart from "../components/chart/LineChart";

import ava1 from "../assets/images/logo-shopify.svg";
import ava2 from "../assets/images/logo-atlassian.svg";
import ava3 from "../assets/images/logo-slack.svg";
import ava4 from "../assets/images/logo-spotify.svg";
import ava5 from "../assets/images/logo-jira.svg";
import ava6 from "../assets/images/logo-invision.svg";
import team1 from "../assets/images/team-1.jpg";
import team2 from "../assets/images/team-2.jpg";
import team3 from "../assets/images/team-3.jpg";
import team4 from "../assets/images/team-4.jpg";
import card from "../assets/images/info-card-1.jpg";
import ReactApexChart from "react-apexcharts";
import tw from "twin.macro";
import { useHistory } from "react-router-dom";
import NewItem from "../components/NewItem";
import AppContext from "../components/context/AppContext";
import FilterRecurring from "../components/FilterRecurring";

function Home() {
  const { Title } = Typography;
  let history = useHistory();
  const [filterInvoice, setFilterInvoice] = useState("usd");

  const { user } = useContext(AppContext);
  const invoiceList = (
    <div tw="border border-[#7f8c9f]">
      <Menu>
        <Menu.Item>
          <div>
            <span tw="cursor-pointer" onClick={() => setFilterInvoice("idr")}>
              IDR - Rupiah
            </span>
          </div>
        </Menu.Item>

        <Menu.Item>
          <div>
            <span tw="cursor-pointer" onClick={() => setFilterInvoice("usd")}>
              USD - US dollar
            </span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <>
      <div className="layout-content" style={{ width: "98%" }}>
        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
          <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mb-24">
            <div tw="grid gap-y-2 md:flex justify-between">
              <div tw="flex items-baseline">
                <Title level={3}>Outstanding Invoices</Title>
                <Popover
                  tw="ml-5 px-2 py-1 hover:border hover:rounded-md hover:border-blue-500 flex items-center justify-center "
                  placement="bottom"
                  content={invoiceList}
                  trigger="click"
                >
                  <span tw="cursor-pointer mr-2 text-base uppercase">
                    {filterInvoice}
                  </span>
                  <DownOutlined />
                </Popover>
              </div>
              <a
                onClick={() => history.push("dashboard/reports/account-aging")}
                tw="text-base hover:opacity-60"
                role="button"
                style={{ color: "#0063c1" }}
              >
                View Account Aging Report
              </a>
            </div>
            <Card
              bordered={true}
              style={{ width: "300", borderColor: "#cdd4d9" }}
              className="criclebox "
            >
              <Row gutter>
                <Col
                  xs={24}
                  md={18}
                  sm={24}
                  lg={18}
                  xl={18}
                  className="mobile-24"
                >
                  <div className="h-full col-content p-20">
                    <div
                      style={{
                        position: "relative",
                        paddingRight: "20px",
                        flexGrow: "1",
                        width: "screen",
                      }}
                    >
                      <div
                        style={{
                          alignItems: "flex-start",
                          display: "flex",
                          flexWrap: "nowrap",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                        }}
                      >
                        <div style={{ flexGrow: "1" }}>
                          {/* <div style={{ position: "relative", height: "30px" }}>
                            <div
                            tw="left-0 absolute pt-2"
                              
                            >
                              0
                            </div>
                            <div
                            tw="left-[2rem] md:left-[10rem] absolute pt-2"
                              
                            >
                              2k
                            </div>
                            <div
                              tw="left-[4rem] md:left-[20rem] absolute pt-2"
                            >
                              4k
                            </div>
                            <div
                             tw="left-[6rem] md:left-[30rem] absolute pt-2"
                            >
                              6k
                            </div>
                          </div> */}
                          {/* <div
                            style={{
                              borderLeft: "2px solid #cdd4d9",
                              padding: "3px 0",
                              marginLeft: "-2px",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                             
                                borderTopRightRadius: "5px",
                                borderBottomRightRadius: "5px",
                                height: "40px",
                              }}
                            >
                              <div
                                style={{
                                  borderTopRightRadius: "5px",
                                  borderBottomRightRadius: "5px",
                                  color: "#f4d980",
                                  backgroundColor: "#f4d980",
                                  borderColor: "#f4d980",
                                  height: "100%",
                                }}
                              ></div>
                            </div>
                          </div> */}
                        <DashboardChart/>

                        </div>
                        <div
                          style={{ textAlign: "right", marginLeft: "20px" }}
                          
                        >
                          <div
                           style={{
                              color: "#0063c1",
                              fontWeight: "500",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <a
                              style={{
                                textDecoration: "none",
                                cursor: "pointer",
                                fontSize: "30px",
                                fontWeight: "bold",
                              }}
                             
                              href="#/invoices/outstanding"
                            >
                              $6,000
                            </a>
                          </div>
                          <div 
                            style={{
                              color: "#576981",
                              fontSize: "16px",
                              lineHeight: "16px",
                            }}
                          >
                            total outstanding
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ paddingTop: "24px", display: "inline-block" }}
                      >
                        <div style={{ verticalAlign: "middle", width: "100%" }}>
                          <div
                            style={{
                              paddingRight: "10px",
                              textAlign: "left",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                color: "#ec8292",
                                borderColor: "#ec8292",
                                backgroundColor: "#ec8292",
                                height: "16px",
                                width: "16px",
                                borderRadius: "5px",
                                marginRight: "5px",
                              }}
                            ></div>
                            <div
                              style={{
                                color: "#576981",
                                textAlign: "left",
                                marginRight: "5px",
                              }}
                            >
                              overdue
                            </div>
                            <div
                              style={{
                                color: "#f4d980",
                                borderColor: "#f4d980",
                                backgroundColor: "#f4d980",
                                height: "16px",
                                width: "16px",
                                borderRadius: "5px",
                                marginRight: "5px",
                              }}
                            ></div>
                            <div
                              style={{ color: "#576981", textAlign: "left" }}
                            >
                              outstanding
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={6} sm={24} lg={6} xl={6}>
                  <div className="h-full col-content p-20">
                    <div
                      style={{
                        paddingLeft: "20px",

                        alignItems: "stretch",
                        justifyContent: "space-between",
                        display: "flex",
                        flexDirection: "column",
                        borderLeftWidth: "1px",
                        borderLeft: "2px solid #cdd4d9",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "#576981",
                          fontSize: "16px",
                          lineHeight: "16px",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                        }}
                      >
                        <div>0-30 Days</div>
                        <div style={{ marginLeft: "40px" }}>
                          <a
                            href="#"
                            style={{ color: "#0063c1", cursor: "pointer" }}
                          >
                            $6,000.00
                          </a>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "#576981",
                          fontSize: "16px",
                          lineHeight: "16px",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                        }}
                      >
                        <div>0-30 Days</div>
                        <div style={{ marginLeft: "40px" }}>
                          <a
                            href="#"
                            style={{ color: "#0063c1", cursor: "pointer" }}
                          >
                            $6,000.00
                          </a>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "#576981",
                          fontSize: "16px",
                          lineHeight: "16px",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                        }}
                      >
                        <div>0-30 Days</div>
                        <div style={{ marginLeft: "40px" }}>
                          <a
                            href="#"
                            style={{ color: "#0063c1", cursor: "pointer" }}
                          >
                            $6,000.00
                          </a>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "nowrap",
                          alignItems: "center",
                          justifyContent: "space-between",
                          color: "#576981",
                          fontSize: "16px",
                          lineHeight: "16px",
                          paddingTop: "6px",
                          paddingBottom: "6px",
                        }}
                      >
                        <div>0-30 Days</div>
                        <div style={{ marginLeft: "40px" }}>
                          <a
                            href="#"
                            style={{ color: "#0063c1", cursor: "pointer" }}
                          >
                            $6,000.00
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
        <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mb-24">
            <div tw="grid gap-y-2 md:flex justify-between">
              <div tw="flex items-baseline">
                <Title level={3}>Monthly Recurring Revenue</Title>
                <Popover
                  tw="ml-5  flex items-center justify-center "
                  placement="bottom"
                  content={FilterRecurring}
                  trigger="click"
                >
                  <span tw="cursor-pointer mr-2 text-base ">
                    for Dec 1, 2021 to Nov 30, 2022 (IDR)
                  </span>
                  <DownOutlined />
                </Popover>
              </div>
              <a
                onClick={() =>
                  history.push("dashboard/reports/recurring-revenue")
                }
                tw="text-base hover:opacity-60"
                role="button"
                style={{ color: "#0063c1" }}
              >
                View Recurring Revenue Annual Report
              </a>
            </div>

            <Card
              bordered={true}
              style={{
                width: "300",
                borderColor: "#cdd4d9",
                position: "relative",
              }}
              className="criclebox "
            >
              <div
                className="h-full col-content p-20"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Col xs={24} md={20} sm={24} lg={20} xl={20}>
                  <DashboardChart />
                </Col>
                <div
                  style={{
                    position: "absolute",
                    textAlign: "right",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  <div
                  tw="font-bold text-primary text-lg md:text-3xl"
                  
                  >
                    $6,000
                  </div>
                  <div>this month</div>
                </div>
              </div>
            </Card>
          </Col>
</Row>
        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
        
            <Col span={24} className="mb-24">
            <div tw="grid gap-y-2 md:flex justify-between">
              <div tw="flex items-baseline">
                <Title level={3}>Monthly Recurring Revenue</Title>
                <Popover
                  tw="ml-5  flex items-center justify-center "
                  placement="bottom"
                  content={FilterRecurring}
                  trigger="click"
                >
                  <span tw="cursor-pointer mr-2 text-base ">
                    for Dec 1, 2021 to Nov 30, 2022 (IDR)
                  </span>
                  <DownOutlined />
                </Popover>
              </div>
              <a
                onClick={() =>
                  history.push("dashboard/reports/recurring-revenue")
                }
                tw="text-base hover:opacity-60"
                role="button"
                style={{ color: "#0063c1" }}
              >
                View Recurring Revenue Annual Report
              </a>
            </div>
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
          <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mb-24">
            <div tw="flex justify-between">
              <Title level={3}>Revenue Streams</Title>
            </div>

            <Card
              bordered={true}
              style={{
                width: "300",
                borderColor: "#cdd4d9",
                position: "relative",
              }}
              className="criclebox "
            >
              <div
                className="h-full col-content p-20"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Col xs={24} md={20} sm={24} lg={20} xl={20}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minHeight: "300px",
                    }}
                  >
                    No transactions found. Adjust the date range and try again
                  </div>
                </Col>
                <div
                  style={{
                    position: "absolute",
                    textAlign: "right",
                    top: "20px",
                    right: "20px",
                  }}
                >
                  <div
                    style={{
                      color: "#0063c1",
                      fontWeight: "bold",
                      fontSize: "30px",
                    }}
                  >
                    $0
                  </div>
                  <div>total revenue</div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
