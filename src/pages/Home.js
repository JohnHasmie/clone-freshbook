import { useContext, useState, useEffect } from "react";

import { Card, Col, Row, Popover, Menu } from "antd";
import { DownOutlined, UnorderedListOutlined } from "@ant-design/icons";
import LineChart from "../components/chart/LineChart";
import tw from "twin.macro";
import { useHistory } from "react-router-dom";
import AppContext from "../components/context/AppContext";
import FilterRecurring from "../components/FilterRecurring";
import DonutsRevenue from "../components/chart/DonutsRevenue";
import FilterRevenue from "../components/FilterRevenue";
import BarChart from "../components/chart/BarChart";
import { useQuery } from "react-query";
import axios from "axios";
import { numberWithDot } from "../components/Utils";
import moment from "moment";

function Home() {
  let history = useHistory();
  const [filterOutstanding, setFilterOutstanding] = useState({
    currency: "USD",
  });
  const [filterPayment, setFilterPayment] = useState({
    currency: "USD",
    start_at: "",
    finish_at: "",
  });
  const [filterRecurring, setFilterRecurring] = useState({
    currency: "USD",
    start_at: moment().subtract(12, 'months').format('YYYY-MM-DD'),
    finish_at: new Date(),
  });
  const [clicked, setClicked] = useState(false);

  const { user, setGlobalOutstanding } = useContext(AppContext);
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const invoiceList = (
    <div /* tw="border border-[#7f8c9f]" */>
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
  const { data: dataOutstanding, status: statusOutstanding } = useQuery(
    ["outstanding-listing", filterOutstanding],
    async (key) =>
      axios
        .get("reports/outstanding-income", {
          params: key.queryKey[1],
        })
        .then((res) => res.data?.data)
  );

  const { data: dataTotalProfit, status: statusTotalProfit } = useQuery(
    ["total-profit-listing", filterRecurring],
    async (key) =>
      axios
        .get("reports/total-profit", {
          params: key.queryKey[1],
        })
        .then((res) => res.data?.data)
  );
  const { data: dataRevenue, status: statusRevenue } = useQuery(
    ["revenue-annual", filterRecurring],
    async (key) =>
      axios
        .get("reports/revenue/annual", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );

  const { data: dataPayment, status: statusPayment } = useQuery(
    ["balance-sheet", filterPayment],
    async (key) =>
      axios
        .get("reports/payment-collection", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );
  useEffect(() => {
    statusOutstanding == "success" && setGlobalOutstanding(dataOutstanding);
  }, [statusOutstanding]);
  console.log("line home",dataRevenue);
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
                  visible={clicked}
                  onVisibleChange={handleClickChange}
                >
                  <span tw="cursor-pointer mr-2 text-base uppercase">
                    {filterOutstanding.currency}
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
                View Accounts Aging Report
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
                  {statusOutstanding === "loading" && (
                    <div
                      role="status"
                      tw="flex flex-col w-full h-full items-center justify-center"
                    >
                      <svg
                        tw="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                            <BarChart data={dataOutstanding} filterOutstanding={filterOutstanding} />
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
                              <span
                                style={{
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  fontSize: "30px",
                                  fontWeight: "bold",
                                }}
                                onClick={() =>
                                  history.push(`/invoices/outstanding`)
                                }
                              >
                                {filterOutstanding.currency === "USD"
                                  ? "$"
                                  : "£"}{" "}
                                {dataOutstanding?.outstanding_total &&
                                  numberWithDot(
                                    Math.round(
                                      dataOutstanding?.outstanding_total * 100
                                    ) / 100
                                  )}
                              </span>
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
                          style={{
                            paddingTop: "24px",
                            display: "inline-block",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </Col>
                <Col xs={24} md={6} sm={24} lg={6} xl={6}>
                  <div className="h-full" tw="pt-6 pl-6">
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
                      {dataOutstanding?.side_data &&
                        Object?.keys(dataOutstanding?.side_data)?.filter(x=>x !== "90")?.map(
                          (item, i) => (
                            <div
                              key={i}
                              tw="grid grid-cols-2 w-auto justify-items-start text-base"
                              // style={{
                              //   display: "flex",
                              //   flexDirection: "row",
                              //   alignItems: "center",
                              //   justifyContent: "space-between",
                              //   color: "#576981",
                              //   fontSize: "16px",
                              //   lineHeight: "16px",
                              //   paddingTop: "6px",
                              //   paddingBottom: "6px",
                              //   textAlign:"left"
                              // }}
                            >
                              <div>{translateDays(item)}</div>
                              <div tw="text-left">
                                <a
                                  href="#"
                                  style={{
                                    color: "#0063c1",
                                    cursor: "pointer",
                                  }}
                                >
                                  {filterOutstanding.currency === "USD"
                                    ? "$"
                                    : "£"}{" "}
                                  {dataOutstanding?.side_data[item] && numberWithDot(Math.round(
                                      dataOutstanding?.side_data[item] * 100
                                    ) / 100)}
                                </a>
                              </div>
                            </div>
                          )
                        )}
                       {dataOutstanding?.side_data &&    <div
                              tw="grid grid-cols-2 w-auto justify-items-start text-base"
                              // style={{
                              //   display: "flex",
                              //   flexDirection: "row",
                              //   alignItems: "center",
                              //   justifyContent: "space-between",
                              //   color: "#576981",
                              //   fontSize: "16px",
                              //   lineHeight: "16px",
                              //   paddingTop: "6px",
                              //   paddingBottom: "6px",
                              //   textAlign:"left"
                              // }}
                            >
                              <div>{translateDays("90")}</div>
                              <div tw="text-left">
                                <a
                                  href="#"
                                  style={{
                                    color: "#0063c1",
                                    cursor: "pointer",
                                  }}
                                >
                                  {filterOutstanding?.currency === "USD"
                                    ? "$"
                                    : "£"}{" "}
                                  {dataOutstanding?.side_data["90"] && numberWithDot(Math.round(
                                      dataOutstanding?.side_data["90"] * 100
                                    ) / 100)}
                                </a>
                              </div>
                            </div>}
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
            <div tw="grid gap-y-2 md:flex justify-between ">
              <div tw="flex items-baseline">
                <span tw="text-xl font-bold text-black">
                  Monthly Recurring Revenue
                </span>
                <Popover
                  tw="ml-5  flex items-center justify-center "
                  placement="bottom"
                  content={<FilterRecurring filterRecurringProps={[filterRecurring, setFilterRecurring] } />}
                  trigger="click"
                >
                  <span tw="cursor-pointer mr-2 text-base ">
                  <UnorderedListOutlined tw="ml-3 text-base flex items-end" />
                  </span>
                  <DownOutlined />
                </Popover>
              </div>
              <span
                onClick={() =>
                  history.push("dashboard/reports/recurring-revenue")
                }
                tw="text-base hover:opacity-60"
                role="button"
                style={{ color: "#0063c1" }}
              >
                View Recurring Revenue Annual Report
              </span>
            </div>
            <Card
              bordered={true}
              className="criclebox h-full"
              style={{
                width: "300",
                borderColor: "#cdd4d9",
                marginTop:"2rem"
              }}
            >
                {statusRevenue === "loading" && (
                    <div
                      role="status"
                      tw="flex flex-col w-full h-full items-center justify-center"
                    >
                      <svg
                        tw="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
             {statusRevenue === "success" && <LineChart dataRevenue={dataRevenue} filterRecurring={filterRecurring} />}
            </Card>
          </Col>
        </Row>

        <Row
          gutter={[24, 0]}
          style={{ marginBottom: "2rem", marginTop: "5rem" }}
        >
          <Col xs={24} md={24} sm={24} lg={24} xl={24} className="mb-24">
            <div tw="flex justify-start items-center mb-5">
              <span tw="text-xl font-bold text-black">Revenue Streams</span>
              <Popover
                placement="bottom"
                content={
                  <FilterRevenue
                    filterRevenueProps={[filterPayment, setFilterPayment]}
                  />
                }
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
              {statusPayment === "loading" && (
                <div
                  role="status"
                  tw="flex flex-col w-full h-full items-center justify-center"
                >
                  <svg
                    tw="inline mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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

              {statusPayment === "success" && (
                <DonutsRevenue
                  dataPayment={dataPayment}
                  filterPayment={filterPayment}
                />
              )}
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
export function translateDays(data) {
  let days = "";
  switch (data) {
    case "0_30":
      days = "0-30 Days";
      break;
    case "31_60":
      days = "31-60 Days";
      break;
    case "61_90":
      days = "61-90 Days";

      break;
    case "90":
      days = "90+ Days";
      break;

    default:
     days="90+ Days"

      break;
  }
  return days;
}

export default Home;
