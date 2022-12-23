import { Checkbox, Table, Typography } from "antd";
import React from "react";
import tw from "twin.macro";

import { Link, useHistory, useParams } from "react-router-dom";
import ClientInfo from "../../components/ClientsComponent/ClientInfo";
import ClientTabs from "../../components/ClientsComponent/ClientTabs";
import {
  AppstoreAddOutlined,
  ColumnHeightOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  FundProjectionScreenOutlined,
  PieChartOutlined,
  PlusOutlined,
  SnippetsOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import CardReport from "../../components/CardReport";

export default function Accounting() {

  const data = [
    {
      icon: <FundProjectionScreenOutlined />,
      title: <h1>Balance Sheet</h1>,
      path:'/dashboard/reports/balance',
      desc: (
        <span tw="-mt-2" >
         A snapshot of your company's assets, liabilities, and equity at any given point in time
        </span>
      ),
    },
    {
      icon: <ColumnHeightOutlined />,
      title: <h1>Trial Balance</h1>,
      path:'/dashboard/reports/trial-balance',

      desc: (
        <span tw="-mt-2">A quick gut check to make sure your books are balanced</span>
      ),
    },
    {
      icon: <DollarCircleOutlined />,
      title: <h1>Payments Collected</h1>,
      path:'/dashboard/reports/payments-collected',

      desc: <span tw="-mt-2">Payments you have collected over a period of time</span>,
    }
  ];
  return (
    <>
      <div className="layout-content">
        <div tw="max-w-screen-xl mr-5 mb-10" >
          <div tw="flex items-center mb-5 ">
            <span tw="text-xl font-bold text-black">Accounting Reports </span>

          </div>
          <div tw="grid md:grid-cols-2 gap-3">
            {data.map((item, i) => (
             <Link key={i} to={item.path}>
               <CardReport tw="min-h-[7rem]  ">
                 <div tw="flex items-center">
                   {item.icon}
                   <div tw="grid gap-y-0 ml-5">
                     {item.title}
                     {item.desc}
                   </div>
                 </div>
               </CardReport>
             </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
