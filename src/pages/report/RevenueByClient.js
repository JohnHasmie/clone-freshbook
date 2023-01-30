import {
  CaretDownOutlined,
  CaretUpOutlined,
  DownOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Popover,
  Row,
  Select,
  Typography,
} from "antd";
import React, { useState,useContext,useEffect,useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import { MoreActionBackend } from "../../components/Reports/MoreAction";
import SendEmail, { SendEmailRevenue } from "../../components/Reports/SendEmail";
import { bell, toggler } from '../../components/Icons';
import ButtonCustom from '../../components/Button/index';
import { useQuery } from "react-query";
import axios from "axios";
import AppContext from "../../components/context/AppContext";
import moment from "moment";
import { getTotalGlobal, numberWithDot } from "../../components/Utils";
const dummyList = [
  { name: "Company Name", total: 6000 },
  { name: "Abc Company", total: 50000 },
];
const dateFormat = "DD/MM/YYYY";

export default function RevenueByClient() {
  const { Title } = Typography;
  const [open, setOpen] = useState(false);
  const [sortState, setSortState] = useState("none");
  const [clicked, setClicked] = useState(false);
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const { user } = useContext(AppContext);
  const [newUser, setNewUser] = useState(
    JSON.parse(localStorage.getItem("newUser")) || { data: "" }
  );
  const myRef=useRef()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clientId = searchParams.get('clientId');
  const [filter, setFilter] = useState({   
    currency: "USD",
start_at: new Date(),
finish_at:moment().endOf('year'),
    client_id:"",
    type:"billed"
  });

  useEffect(() => {
    clientId && 
    setFilter({...filter,client_id:clientId})
  }, [clientId])
  const hide = () => {
    setClicked(false);
  };

  const { data: dataRevenue, status: statusRevenue } = useQuery(
    ["revenue-by-client", filter],
    async (key) =>
      axios
        .get("reports/revenue", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );

  const { isFetching: excelIsFetching, refetch: excelRefetch } = useQuery(
    ["export-csv",{...filter,export:true}],
    async () =>
      axios
        .get(`reports/revenue`, {
          responseType: "blob",
        })
        .then((res) => {
          const href = URL.createObjectURL(res.data);

      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "revenue_by_client.xlsx");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);
        }),
    {
      enabled: false,
    }
  )

  const { data: dataClients, status } = useQuery(
    ["clients"],
    async (key) =>
      axios
        .get("clients", {
          params: key.queryKey[1],
        })
        .then((res) => res.data.data)
  );
  const sortMethods = {
    none: { method: (a, b) => null },
    true: { method: (a, b) => (a.name > b.name ? 1 : -1) },
    false: { method: (a, b) => (a.name > b.name ? -1 : 1) },
  };
  let history = useHistory();
  const onFinish = (values) => {
    setFilter(
      {   
        currency: values.currency,
    start_at: values.start_at._d,
    finish_at:values.finish_at._d,
        client_id:values.client_id,
        type:values.type
      }
    )
    setOpen(false)
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterRevenueByClient = (
    <div>
      <div tw="flex justify-between mt-5 ">
        <Title level={3}>Filters</Title>
        <p tw="text-base text-primary cursor-pointer" onClick={()=>setFilter({
    currency: "USD",
    start_at: new Date(),
    finish_at:moment().endOf('year'),
        client_id:"",
        type:"billed"
        })}>Reset All</p>
      </div>
      <span tw="text-black ">DATE RANGE</span>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
        fields={[
          { name: ["start_at"], value:  filter.start_at
          ? moment(new Date(filter.start_at), dateFormat)
          : "" },
          { name: ["finish_at"], value: filter.finish_at
          ? moment(new Date(filter.finish_at), dateFormat)
          : "" },
          {
            name: ["client_id"],
            value: filter?.client_id,
          },
          {
            name: ["type"],
            value: filter?.type,
          },
          {
            name: ["currency"],
            value: filter?.currency,
          },
        ]}
      >
        <Row gutter={24}>
          {/* <Col span={24}>
            <Form.Item name="time">
              <Select
                defaultValue="this-year"
                options={[
                  {
                    value: "this-month",
                    label: "This Month",
                  },
                  {
                    value: "this-year",
                    label: "This Year",
                  },
                  {
                    value: "last-year",
                    label: "Last Year",
                  },
                  {
                    value: "this-quarter",
                    label: "This Quarter",
                  },
                  {
                    value: "last-quarter",
                    label: "Last Quarter",
                  },
                ]}
              />
            </Form.Item>
          </Col> */}
          <Col span={24}>
            <Form.Item name="start_at">
              <DatePicker
                tw="w-full rounded-md"
                // onChange={(date, dateString) =>
                //   setFilter({ ...filter, start_at: dateString })
                // }
                // placeholder="Start"
         
                // defaultValue={
                //   filter.start_at
                //     ? moment(new Date(filter.start_at), dateFormat)
                //     : ""
                // }
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="finish_at">
              <DatePicker
                tw="w-full rounded-md"
                // onChange={(date, dateString) =>
                //   setFilter({ ...filter, finish_at: dateString })
                // }
                // placeholder="End"
                // defaultValue={
                //   filter.finish_at
                //     ? moment(new Date(filter.finish_at), dateFormat)
                //     : ""
                // }
                format={dateFormat}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Clients" name="client_id">
              <Select
                options={dataClients?.data?.map(item=>({
                  value:item?.id,
                  label:item?.company_name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Type" name="type">
              <Select
                defaultValue="billed"
                options={[
                  {
                    value: "billed",
                    label: "Total Billed",
                  },
                  {
                    value: "collected",
                    label: "Total Collected",
                  },
                  {
                    value: "outstanding",
                    label: "Total Outstanding",
                  },
                ]}
              />
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
    user && localStorage.setItem("newUser", JSON.stringify(user));
  }, [user]);
  return (
    <div tw="max-w-screen-lg mx-auto">
        <div tw="grid grid-cols-1 gap-y-2 md:grid-cols-2 mx-5">
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
            <span tw="capitalize text-4xl font-bold">Revenue By Client</span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover placement="bottom" content={<MoreActionBackend myRef={myRef} excelRefetch={excelRefetch}/>} trigger="click">
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>
          <Popover placement="bottom" content={<SendEmailRevenue hide={hide} dataClients={dataClients} user={newUser}/>} trigger="click" visible={clicked}  onVisibleChange={handleClickChange}>
            <Button tw=" md:ml-2 bg-success text-white px-4  flex justify-center items-center ">
              <span tw="text-lg">Send...</span>
            </Button>
          </Popover>
          </div>

        </div>
      
      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5">
        <div ref={myRef} tw="md:col-span-9 mb-10 mt-10 md:mt-2">

        <CardReporting >
          <h1 tw="text-blueDefault">Revenue by Client</h1>
          <div tw="my-3 flex flex-col">
            <span tw="text-sm text-gray-600">               {user?.data?.company_name || newUser?.data?.company_name}
</span>
            <span tw="text-sm text-gray-600">Total {filter.type} ({filter.currency})</span>
            <span tw="text-sm text-gray-600">For {moment(new Date(filter.start_at)).format("MMM DD, YYYY")} - {moment(new Date(filter.finish_at)).format("MMM DD, YYYY")}</span>
          </div>
          <div tw="overflow-x-auto ">
            <table>
              <thead>
                <tr>
                  <th
                    tw="text-left py-4 cursor-pointer"
                    onClick={() => setSortState(!sortState)}
                  >
                    Primary Contact/ Organization{" "}
                    {sortState ? <CaretUpOutlined /> : <CaretDownOutlined />}
                  </th>

                  <th tw="py-4 ">Total</th>
                </tr>
              </thead>
              <tbody>
              {/* dummyList.sort(sortMethods[sortState].method).map((item,i) => ( */}
                {statusRevenue === "success" && dataRevenue?.data?.map((item,i) => (
                  <tr key={i} tw="text-right text-sm" style={{ display: "table-row" }}>
                    <th tw="pt-5 text-left flex items-center">
                      <span tw="rounded-full border border-orange-500 px-2 py-1 mr-2 ">
                        {item?.company[0]}
                      </span>
                    <div tw="grid">
                        <span tw="text-sm">{item.company}</span>
                        <span tw="text-xs text-gray-400">{item.client}</span>
                    </div>

                    </th>
                    <td tw="py-2  text-primary">{item.total_revenue && numberWithDot(item.total_revenue)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot tw='mt-2'>
                <tr className="double">
                  <td tw=" text-left font-semibold">Total</td>

                  <td tw="pt-3  flex flex-col items-end ">
                    <span tw="font-semibold ">{statusRevenue === "success" && dataRevenue?.data?.length > 0? getTotalGlobal(dataRevenue?.data?.map(item=>{
                        const splitAmount = item?.total_revenue?.split(".");
                        return parseInt(splitAmount[0]);
                    })) + ".00" : "0.00" }</span>
                    <span tw="text-gray-600 text-right">{filter.currency}</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardReporting>
        </div>

        <Filter
          Filtering={FilterRevenueByClient}
          setOpen={setOpen}
          open={open}
        />
      </div>
    </div>
  );
}
