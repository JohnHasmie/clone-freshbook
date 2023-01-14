import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Popover,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useState, useContext,useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction from "../../components/Reports/MoreAction";
import SendEmail from "../../components/Reports/SendEmail";
import { bell, toggler } from "../../components/Icons";
import ButtonCustom from "../../components/Button/index";
import AppContext from "../../components/context/AppContext";
import moment from "moment";
import { useQuery } from "react-query";
import axios from "axios";
import { numberWithDot, truncate } from "../../components/Utils";

export default function AccountAgingPrint() {
  const [open, setOpen] = useState(false);
  const { Title } = Typography;
  const {pathname}=useLocation()
  const [filterOutstanding, setFilterOutstanding] = useState({
    currency: "USD",
  });

  useEffect(() => {
   pathname.includes("print") &&
    window.print()
  }, [pathname])
  
  const [clicked, setClicked] = useState(false);
  const [newSetting, setNewSetting] = useState(JSON.parse(localStorage.getItem("newSetting")) || {data:""});

  const { setting } = useContext(AppContext);

  const { data: dataOutstanding, status: statusOutstanding } = useQuery(
    ["outstanding-listing", filterOutstanding],
    async (key) =>
      axios
        .get("reports/outstanding-income", {
          params: key.queryKey[1],
        })
        .then((res) => res.data?.data)
  );

  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };
  let history = useHistory();
  const onFinish = (values) => {
    setFilterOutstanding({currency:values.currency})
    setOpen(false)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterAccountAging = (
    <div tw="mt-3">
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <p tw="text-base text-primary">Reset All</p>
      </div>
      <span tw="text-black ">AS OF</span>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
        fields={[
          {
            name: ["time"],
            value: 'today',
          },
          {
            name: ["group"],
            value: 'outstanding',
          },
          {
            name: ["currency"],
            value:filterOutstanding?.currency,
          },
        ]}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item name="time">
              <Select
                options={[
                  {
                    value: "today",
                    label: "Today",
                  },
                  {
                    value: "last-month",
                    label: "End of Last Month",
                  },
                  {
                    value: "last-quarter",
                    label: "End of Last Quarter",
                  },
                  {
                    value: "last-year",
                    label: "End of Last Year",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Group By" name="group">
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="outstanding">Outstanding</Radio>
                  <Radio value="overdue">Overdue</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Currency" name="currency">
              <Select
                options={[
                  {
                    value: "USD",
                    label: "USD - US dollar",
                  },
                  {
                    value: "GBP",
                    label: "GBP - Pound Sterling",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          <Divider />
          <Col span={12}>
            <Button tw="text-lg px-8" onClick={() => setOpen(false)}>
              Close
            </Button>
          </Col>
          <Col span={12}>
            <Button htmlType="submit" tw="text-lg text-white bg-success px-8">Apply</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
  useEffect(() => {
    setting &&
      localStorage.setItem("newSetting",JSON.stringify(setting))
  }, [setting]);
  return (
    <div tw="max-w-screen-lg mx-auto">
      {/* <div tw="grid grid-cols-1 gap-y-2 md:grid-cols-2 mx-5">
        <div tw="flex justify-between md:hidden">
          <div>{bell}</div>
          <ButtonCustom
            tw="!bg-transparent !border-0 hover:opacity-50"
            type="link"
            className="sidebar-toggler"
            // onClick={() => onPress()}
          >
            {toggler}
          </ButtonCustom>
        </div>
        <div tw="md:col-span-2">
          <button
            onClick={() => history.goBack()}
            tw="bg-transparent flex items-center mt-5 text-primary cursor-pointer"
          >
            <LeftOutlined />
            <span tw="ml-1">Reports</span>
          </button>
        </div>
        <div tw="flex items-center">
          <span tw="capitalize text-4xl font-bold text-black">
            Account Aging
          </span>
        </div>
        <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover placement="bottom" content={MoreAction} trigger="click">
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>
          <Popover
            placement="bottom"
            content={<SendEmail hide={hide} />}
            trigger="click"
            visible={clicked}
            onVisibleChange={handleClickChange}
          >
            <Button tw=" md:ml-2 bg-success text-white px-4  flex justify-center items-center ">
              <span tw="text-lg">Send...</span>
            </Button>
          </Popover>
        </div>
      </div> */}

      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5">
        <CardReporting tw="md:col-span-9 mb-10 mt-10 md:mt-2">
          <h1 tw="text-blueDefault">Accounts Aging</h1>
          <div tw="my-3 flex flex-col">
            <span tw="text-sm text-gray-600">
              {setting?.data?.company_name || newSetting?.data?.company_name}
            </span>
            <span tw="text-sm text-gray-600">Amounts Outstanding</span>
            <span tw="text-sm text-gray-600">
              As of {moment(new Date()).format("MMMM DD, YYYY")}
            </span>
          </div>
    {statusOutstanding === "success" &&     <div tw="overflow-x-scroll  md:w-full ">
            <table tw="overflow-x-scroll">
              <thead>
                <tr>
                  <th tw="text-left py-4 ">Client</th>
                  {dataOutstanding?.invoice?.data?.map((item, i) => (
                    <th key={i} tw="py-4 ">
                      {" "}
                      {i === 0 ? 0 : i * 31}-{i + 1 === 1 ? 30 : (i + 1) * 30}{" "}
                      Days
                    </th>
                  ))}

                  <th tw="py-4  ">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr tw="text-right text-sm" style={{ display: "table-row" }}>
                  <th tw="pt-12 text-left ">
                    <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                      {dataOutstanding?.invoice?.data[0]?.client?.company_name[0]}
                    </span>
                    <span tw="text-primary">    {dataOutstanding?.invoice?.data[0]?.client?.company_name && truncate(dataOutstanding?.invoice?.data[0]?.client?.company_name,20)}</span>
                  </th>
                  {dataOutstanding?.invoice?.data?.map((item,i)=>(
                    <td key={i} tw="py-5  text-primary">{item?.total && numberWithDot(item?.total)}</td>

                  ))}
                  
                  <td tw="py-5 ">{dataOutstanding?.total && numberWithDot(dataOutstanding?.total)}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="double">
                  <td tw=" text-left font-semibold">Total</td>
                  {dataOutstanding?.invoice?.data?.map((item,i)=>(
                    <td key={i} >{item?.total && numberWithDot(item?.total)}</td>

                  ))}
             
                  <td tw="pt-5  flex flex-col items-end ">
                    <span tw="font-semibold ">{dataOutstanding?.total && numberWithDot(dataOutstanding?.total)}</span>
                    <span tw="text-gray-600 text-right">{filterOutstanding.currency}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>}
        </CardReporting>
        {/* <Filter Filtering={FilterAccountAging} setOpen={setOpen} open={open} /> */}
      </div>
    </div>
  );
}
