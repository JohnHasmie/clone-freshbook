import {
  AimOutlined,
  ClockCircleOutlined,
  CoffeeOutlined,
  DownOutlined,
  FileDoneOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Col, Menu, Popover, Row } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CardClient from "../CardClient";
import CardDetail from "../CardDetail";
import Photo from "../../assets/images/mask-group.svg";
import tw from "twin.macro";
import DashboardChart from "../chart/DashboardChart";
import BarChartClient from '../chart/BarChartClient';
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import AppContext from "../context/AppContext";

export default function ClientInfo({clientId}) {
  const [filterInvoice, setFilterInvoice] = useState("usd");
  const {  setGlobalDetailClient } = useContext(AppContext);

  const history=useHistory()
  const { data: detailClient, status:statusDetailClient } = useQuery(
    "detail-client",
    async (key) =>
      axios
        .get(`clients/${clientId}`)
        .then((res) => res.data.data)
        
  );
  useEffect(() => {
    statusDetailClient === "success" &&
    setGlobalDetailClient(detailClient?.client)
  }, [statusDetailClient])
  const invoiceList = (
    <div>
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
    <Row gutter={24} tw="mb-1.5 max-w-full">
      <Col span={8}>
      {statusDetailClient === "success" && <CardClient
          title="Default size card"
          size="small"
          style={{
            width: "auto",
          }}
        >
          <div tw="grid grid-cols-4">
            <img src={detailClient.client.avatar} alt="profile" tw="w-14 h-14 rounded-full col-span-1" />
            <div tw="grid gap-0 col-span-3">
              <h3 tw="font-bold text-base">{detailClient.client.first_name + " " + detailClient.client.last_name }</h3>
              <div>
                <MailOutlined tw="mr-1" />
                <span>{detailClient.client.email}</span>
              </div>
              <div>
                <PhoneOutlined tw="mr-1" />
                <span>{detailClient.client.phone}</span>
              </div>
              <div>
                <AimOutlined tw="mr-1" />
                <span>{detailClient.client.country}</span>
              </div>
            </div>
          </div>
        </CardClient>}
      </Col>
      <Col span={16}>
        <CardDetail
          bordered={true}
          style={{ width: "300", borderColor: "#cdd4d9" }}
          className="criclebox "
        >
          <Row gutter>
            <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mobile-24">
              <div className="h-full col-content p-20">
                <div
                  style={{
                    position: "relative",
                    paddingRight: "20px",
                    flexGrow: "1",
                    width: "screen",
                  }}
                >
                  <div tw="flex justify-between mb-5">
                    <div tw="flex">
                      <span tw="text-3xl font-bold text-black">
                        Outstanding Revenue
                      </span>
                      <Popover
                        tw="ml-5  "
                        placement="bottom"
                        content={invoiceList}
                        trigger="click"
                      >
                        <span tw="mr-2 text-base uppercase">
                          {filterInvoice}
                        </span>
                        <DownOutlined />
                      </Popover>
                    </div>
                    <span onClick={()=>history.push('/invoices/outstanding-balance')} tw="text-primary text-2xl font-bold cursor-pointer">Rp0</span>
                  </div>
                  <div >
                  {/* <DashboardChart/> */}
                  <BarChartClient/>

                  </div>
                  {/* <div
                    style={{
                      alignItems: "flex-start",
                      display: "flex",
                      flexWrap: "nowrap",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div style={{ flexGrow: "1" }}>
                      <div style={{ position: "relative", height: "30px" }}>
                        <div
                          style={{
                            left: "0px",
                            fontSize: "14px",
                            lineHeight: "16px",
                            position: "absolute",
                            transform: "translateX(-50%)",
                            color: "#576981",
                            textAlign: "center",
                            width: "45px",
                            paddingTop: "7px",
                          }}
                        >
                          0
                        </div>
                        <div
                          style={{
                            left: "180px",
                            fontSize: "14px",
                            lineHeight: "16px",
                            position: "absolute",
                            transform: "translateX(-50%)",
                            color: "#576981",
                            textAlign: "center",
                            width: "45px",
                            paddingTop: "7px",
                          }}
                        >
                          2k
                        </div>
                        <div
                          style={{
                            left: "350px",
                            fontSize: "14px",
                            lineHeight: "16px",
                            position: "absolute",
                            transform: "translateX(-50%)",
                            color: "#576981",
                            textAlign: "center",
                            width: "45px",
                            paddingTop: "7px",
                          }}
                        >
                          4k
                        </div>
                        <div
                          style={{
                            right: "0",
                            fontSize: "14px",
                            lineHeight: "16px",
                            position: "absolute",
                            transform: "translateX(-50%)",
                            color: "#576981",
                            textAlign: "center",
                            width: "45px",
                            paddingTop: "7px",
                          }}
                        >
                          6k
                        </div>
                      </div>
                      <div
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
                      </div>
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
                  </div> */}
                  {/* <div style={{ paddingTop: "24px", display: "inline-block" }}>
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
                        <div style={{ color: "#576981", textAlign: "left" }}>
                          outstanding
                        </div>
                      </div>
                    </div>
                    <p>$0</p>
                  </div> */}
                </div>
              </div>
            </Col>
          </Row>
          <hr />
          <div tw="flex justify-center mt-10">
            <div tw="grid justify-items-center">
              <FileDoneOutlined />
              <span>$0</span>
              <p>in draft</p>
            </div>

            {/* <div tw="col-span-4 grid justify-items-center">
              <CoffeeOutlined />
              <span>$0</span>
              <p>unbilled expenses</p>
            </div> */}
          </div>
        </CardDetail>
      </Col>
    </Row>
  );
}
