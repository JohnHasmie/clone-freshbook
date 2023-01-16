import { DownOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Divider, Form, Popover, Row, Select, Typography } from "antd";
import React, { useState,useRef,useContext,useEffect } from "react";
import { useHistory } from "react-router-dom";
import tw from "twin.macro";
import CardReporting from "../../components/CardReporting";
import ButtonMore from "../../components/Reports/ButtonMore";
import Filter from "../../components/Reports/Filter";
import MoreAction from "../../components/Reports/MoreAction";
import SendEmail from "../../components/Reports/SendEmail";
import { bell, toggler } from '../../components/Icons';
import ButtonCustom from '../../components/Button/index';
import AppContext from "../../components/context/AppContext";
import moment from "moment";
import { useQuery } from "react-query";
import axios from "axios";
export default function RecurringRevenue() {
  const { Title } = Typography;
const dateFormat = "DD/MM/YYYY";

  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [newSetting, setNewSetting] = useState(JSON.parse(localStorage.getItem("newSetting")) || {data:""});
  const [filter, setFilter] = useState({
    start_at:"",
    finish_at:"",
    currency: "USD",
  });
  const [localFilter, setLocalFilter] = useState({
    start_at:"",
    finish_at:"",
    currency: "USD",
  });
  const { setting } = useContext(AppContext);
  const myRef=useRef()
  const handleClickChange = (open) => {
    setClicked(open);
  };
  const hide = () => {
    setClicked(false);
  };

  let history = useHistory();
  const onFinish = (values) => {
    setFilter(localFilter)
  };
console.log("filter,",filter);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const FilterRecurringRevenue = (
    <div>
      <div tw="flex justify-between ">
        <Title level={3}>Filters</Title>
        <p tw="text-base text-primary">Reset All</p>
      </div>
      <span tw="text-black ">DATE RANGE</span>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        size={"large"}
        tw="mt-5"
        fields={[
          {name:["start_at"],
        value: localFilter.start_at  && moment(localFilter.start_at, dateFormat) 
        },
        {name:["finish_at"],
        value: localFilter.finish_at && moment(localFilter.finish_at, dateFormat) 
        },
        {name:["currency"],
        value:localFilter.currency
        }
        ]}
      >
        <Row gutter={24}>
          <Col span={24}>
          <Form.Item
                    name="start_at"
                
                  >

                    <DatePicker
                      onChange={(date, dateString) =>
                        setLocalFilter({ ...localFilter, start_at: dateString })
                      }
                      placeholder="start"
                      tw="rounded-md"
                   
                      format={dateFormat}
                    />
                  </Form.Item>
          </Col>
          <Col span={24}>
          <Form.Item
                    name="finish_at"
                
                  >

                    <DatePicker
                      onChange={(date, dateString) =>
                        setLocalFilter({ ...localFilter, finish_at: dateString })
                      }
                      placeholder="finish"

                      tw="rounded-md"
                     
                      format={dateFormat}
                    />
                  </Form.Item>
          </Col>

          <Col span={24}>
          <Form.Item    name="currency">
                <Select
            
                 
                 onChange={(e) =>
                  setLocalFilter({ ...localFilter, currency: e })
                }
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
            <Button tw="text-lg px-8" onClick={() => setOpen(false)}>Close</Button>
          </Col>
          <Col span={12}>
            <Button htmlType="submit" tw="text-lg text-white bg-success px-8">Apply</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
  const { data: dataRecurring, status: statusRecurring } = useQuery(
    ["balance-sheet", filter],
    async (key) =>
      axios
        .get("reports/payment-collection", {
          params: key.queryKey[1],
        })
        .then((res) => res.data)
  );
  const items = Array.from({length: 12-dataRecurring?.data?.data?.length}, (_, index) => (index + 1)*0);
  console.log(items,"recurring");
  useEffect(() => {
    setting &&
      localStorage.setItem("newSetting",JSON.stringify(setting))
  }, [setting]);

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
            <span tw="capitalize text-4xl font-bold text-black">Recurring Revenue Annual</span>
          </div>
          <div tw="grid gap-y-2  md:flex items-center md:justify-self-end">
          <Popover placement="bottom" content={<MoreAction myRef={myRef} />} trigger="click">
            <ButtonMore tw="w-full">
              <span>More Actions</span>
              <DownOutlined />
            </ButtonMore>
          </Popover>
          <Popover placement="bottom" content={<SendEmail hide={hide}/>} trigger="click" visible={clicked}  onVisibleChange={handleClickChange}>
            <Button tw=" md:ml-2 bg-success text-white px-4  flex justify-center items-center ">
              <span tw="text-lg">Send...</span>
            </Button>
          </Popover>
          </div>

        </div>
      
      <div tw="grid grid-cols-1 md:grid-cols-12 gap-5 mx-5">
      <div ref={myRef} tw="md:col-span-9 mb-10 mt-10 md:mt-2">
          <CardReporting >
            <h1 tw="text-blueDefault">Recurring Revenue Annual</h1>
            <div tw="my-3 flex flex-col">
            <span tw="text-sm text-gray-600">        {setting?.data?.company_name || newSetting?.data?.company_name}</span>

              <span tw="text-sm text-gray-600">
                Recurring Revenue Annual - Billed 
              </span>
            <span tw="text-sm text-gray-600"> As of {moment(new Date()).format("MMMM DD, YYYY")}</span>
            </div>
            {statusRecurring === "loading" && (
            <div
              role="status"
              tw="flex flex-col w-full h-full items-center justify-center"
            >
              <svg
                tw="inline mr-2 w-52 h-52 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
          {statusRecurring === "success" &&  <div tw="overflow-x-auto ">
              <table style={{ minWidth: "1000px" }}>
                <thead>
                  <tr>
                    <th tw="text-left py-4 ">All Client</th>
                  </tr>
                </thead>
                <tbody tw="overflow-scroll">
                  <tr tw="text-left text-xs font-bold  border-b border-gray-200">
                    <th tw="py-4">Revenue Stream</th>
                    <td>Jan</td>
                    <td>Feb</td>
                    <td>Mar</td>
                    <td>Apr</td>
                    <td>May</td>
                    <td>Jun</td>
                    <td>Jul</td>
                    <td>Aug</td>
                    <td>Sept</td>
                    <td>Oct</td>
                    <td>Nov</td>
                    <td>Dec</td>
                  </tr>
                  <tr tw="text-left text-xs border-b border-dotted border-gray-200">
                    <th tw="py-4">Recurring</th>

                  {dataRecurring?.data?.data?.map((item,i)=>(
                    <td>{filter?.currency == "GBP" ? '£' : "$"}{item.amount}</td>

                  ))  }
                {items.map(item=>(

                    <td>{filter?.currency == "GBP" ? '£' : "$"}{item}</td>))}
                    
                  </tr>
                  <tr tw="text-left text-xs border-b border-dotted  border-gray-200">
                    <th tw="py-4">Non-Recurring Invoices</th>
                    {dataRecurring?.data?.data?.map((item,i)=>(
                    <td>{filter?.currency == "GBP" ? '£' : "$"}{item.amount}</td>

                  ))  }
                      {items.map(item=>(

<td>{filter?.currency == "GBP" ? '£' : "$"}{item}</td>))}

                    
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="double" tw="font-bold text-xs">
                    <th tw="text-left py-4 ">Total</th>
                      {dataRecurring?.data?.data?.map((item,i)=>(
                    <td tw="text-left">{filter?.currency == "GBP" ? '£' : "$"}{item.amount}</td>

                  ))  }
                    {items.map(item=>(

<td tw='text-left'>{filter?.currency == "GBP" ? '£' : "$"}{item}</td>))}
                   
                  </tr>
                </tfoot>
              </table>
            </div>}
        
            {/* <div tw="overflow-x-auto mt-10 ">
              <table style={{ minWidth: "1000px" }}>
                <thead>
                  <tr>
                    <th tw="text-left py-4 ">
                      <span tw="rounded-full border border-orange-500 px-2 py-1 mr-0.5 ">
                        C
                      </span>
                      Company Name
                    </th>
                  </tr>
                </thead>
                <tbody tw="overflow-scroll">
                  <tr tw="text-left text-xs font-bold  border-b border-gray-200">
                    <th tw="py-1">Revenue Stream</th>
                    <td>Jan</td>
                    <td>Feb</td>
                    <td>Mar</td>
                    <td>Apr</td>
                    <td>May</td>
                    <td>Jun</td>
                    <td>Jul</td>
                    <td>Aug</td>
                    <td>Sept</td>
                    <td>Oct</td>
                    <td>Dec</td>
                    <td>Nov</td>
                  </tr>
                  <tr tw="text-left text-xs border-b border-dotted border-gray-200">
                    <th tw="py-1">Recurring</th>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$6,000.00 </td>
                    <td>$6,000.00 </td>
                    <td>$6,000.00 </td>
                  </tr>
                  <tr tw="text-left text-xs border-b border-dotted  border-gray-200">
                    <th tw="py-1">Non-Recurring Invoices</th>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00</td>
                    <td>$0.00 </td>
                    <td>$0.00 </td>
                    <td>$0.00 </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="double" tw="font-bold">
                    <th tw="text-left text-xs">Total</th>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00</td>
                    <td tw="text-left text-xs">$0.00 </td>
                    <td tw="text-left text-xs">$0.00 </td>
                    <td tw="text-left text-xs">$0.00 </td>
                  </tr>
                </tfoot>
              </table>
            </div> */}
          </CardReporting>
      </div>
        <Filter Filtering={FilterRecurringRevenue} setOpen={setOpen} open={open} />
      </div>
    </div>
  );
}
