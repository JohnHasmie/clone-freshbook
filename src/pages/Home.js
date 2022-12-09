import { useContext, useState } from "react";

import { Card, Col, Row, Typography, Popover, Menu } from "antd";
import { DownOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import Echart from "../components/chart/EChart";
import DashboardChart from "../components/chart/DashboardChart";

import LineChart from "../components/chart/LineChart";

import tw from "twin.macro";
import { useHistory } from "react-router-dom";
import AppContext from "../components/context/AppContext";
import FilterRecurring from "../components/FilterRecurring";
import DonutsRevenue from "../components/chart/DonutsRevenue";
import FilterRevenue from "../components/FilterRevenue";
import BarChart from "../components/chart/BarChart";

function Home() {
  const { Title } = Typography;
  let history = useHistory();
  const [filterInvoice, setFilterInvoice] = useState("usd");

  const { user } = useContext(AppContext);
  const invoiceList = (
    <div /* tw="border border-[#7f8c9f]" */>
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
            <div tw="grid gap-y-2 md:flex justify-between mb-5">
              <div tw="flex items-baseline">
                <span tw="text-xl font-bold text-black">
                  Outstanding Invoices
                </span>
                <Popover
                  tw="ml-5 px-2 py-1 border border-transparent hover:border hover:rounded-md hover:border-blue-500 flex items-center justify-center "
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
              
                          <BarChart />
                        </div>
                        <div style={{ textAlign: "right", marginLeft: "20px" }}>
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
        {/* <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
        <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mb-24">
            <div tw="grid gap-y-2 md:flex justify-between">
              <div tw="flex items-baseline">
                <span tw="text-xl font-bold text-black">Monthly Recurring Revenue</span>
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
</Row> */}
        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
          <Col span={24} className="mb-24">
            <div tw="grid gap-y-2 md:flex justify-between mb-5">
              <div tw="flex items-baseline">
                <span tw="text-xl font-bold text-black">
                  Monthly Recurring Revenue
                </span>
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
              className="criclebox h-full"
              style={{
                width: "300",
                borderColor: "#cdd4d9",
              }}
            >
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]} style={{ marginBottom: "2rem" }}>
          <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mb-24">
            <div tw="flex justify-start items-center mb-5">
              <span tw="text-xl font-bold text-black">Revenue Streams</span>
              <Popover
                placement="bottom"
                content={FilterRevenue}
                trigger="click"
              >
                <UnorderedListOutlined tw="ml-3 text-base flex items-end" />
              </Popover>
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
              <DonutsRevenue />
              {/* <div
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
              </div> */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Home;
