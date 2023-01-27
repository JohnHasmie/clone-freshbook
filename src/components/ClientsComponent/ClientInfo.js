import {
  AimOutlined,
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
import BarChartClient from "../chart/BarChartClient";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import AppContext from "../context/AppContext";
import { numberWithDot } from "../Utils";

export default function ClientInfo({ clientId }) {
  const [filterInvoice, setFilterInvoice] = useState("usd");
  const { setGlobalDetailClient } = useContext(AppContext);
  const [clicked, setClicked] = useState(false);

  const [filterOutstanding, setFilterOutstanding] = useState({
    currency: "USD",
    client_id:clientId
  });

  const history = useHistory();
  const handleClickChange = (open) => {
    console.log(open, "open");
    setClicked(open);
  };
  const { data: detailClient, status: statusDetailClient } = useQuery(
    "detail-client",
    async (key) => axios.get(`clients/${clientId}`).then((res) => res.data.data)
  );

  const { data: dataOutstanding, status: statusOutstanding } = useQuery(
    ["outstanding-listing", filterOutstanding],
    async (key) =>
      axios
        .get(`clients/outstanding-income`, {
          params: key.queryKey[1],
        })
        .then((res) => res.data?.data)
  );

  useEffect(() => {
    statusDetailClient === "success" &&
      setGlobalDetailClient(detailClient?.client);
  }, [statusDetailClient]);
  const invoiceList = (
    <div>
      <Menu>
        <Menu.Item
          onClick={() => {
            setClicked(false);

            setFilterOutstanding({ currency: "USD" });
          }}
        >
          <div>
            <span tw="cursor-pointer">USD</span>
          </div>
        </Menu.Item>

        <Menu.Item
          onClick={() => {
            setClicked(false);

            setFilterOutstanding({ currency: "GBP" });
          }}
        >
          <div>
            <span tw="cursor-pointer">GBP</span>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  );
  console.log(detailClient?.client?.first_name,"outstanding");
  return (
    <Row gutter={24} tw="mb-1.5 max-w-full">
      <Col span={8}>
        {statusDetailClient === "success" && (
          <CardClient
            title="Default size card"
            size="small"
            style={{
              width: "auto",
            }}
          >
            <div tw="grid grid-cols-4">
              <img
                src={detailClient.client.avatar}
                alt="profile"
                tw="w-14 h-14 rounded-full col-span-1"
              />
              <div tw="grid gap-0 col-span-3">
                <h3 tw="font-bold text-base">
                  {detailClient.client.first_name +
                    " " +
                    detailClient.client.last_name}
                </h3>
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
          </CardClient>
        )}
      </Col>
      <Col span={16}>
        {statusOutstanding === "loading" && (
          <div
            role="status"
            tw="flex flex-col w-full h-full items-center justify-center"
          >
            <svg
              tw="inline mr-2 w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          </div>
        )}
        {statusOutstanding === "success" && (
          <CardDetail
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
                          visible={clicked}
                          onVisibleChange={handleClickChange}
                        >
                          <span tw="mr-2 text-base uppercase">
                             {filterOutstanding?.currency}
                          </span>
                          <DownOutlined />
                        </Popover>
                      </div>
                      <span
                        onClick={() =>
                          history.push(`/client/${clientId}/invoices/outstanding-balance?name=${detailClient?.client?.first_name+" "+detailClient?.client?.last_name}`)
                        }
                        tw="text-primary text-2xl font-bold cursor-pointer"
                      >
                         {filterOutstanding?.currency == "GBP" ? '£' : "$"} {dataOutstanding?.outstanding_invoices?.total &&
                          numberWithDot(
                            dataOutstanding?.outstanding_invoices?.total
                          )}
                      </span>
                    </div>
                    <div>
                      {/* <DashboardChart/> */}
                    
                      <BarChartClient
                        data={dataOutstanding}
                        filterOutstanding={filterOutstanding}
                        setFilterOutstanding={setFilterOutstanding}
                      />
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
                <span>
                {filterOutstanding?.currency == "GBP" ? '£' : "$"}
                  {dataOutstanding?.outstanding_draft?.total &&
                    numberWithDot(dataOutstanding?.outstanding_draft?.total)}
                </span>
                <p>in draft</p>
              </div>
            </div>
          </CardDetail>
        )}
      </Col>
    </Row>
  );
}
