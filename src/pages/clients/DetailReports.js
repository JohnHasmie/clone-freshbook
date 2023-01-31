import { Checkbox, Table, Typography } from "antd";
import React, { useContext } from "react";
import tw from "twin.macro";

import { Link, useHistory, useParams } from "react-router-dom";
import ClientInfo from "../../components/ClientsComponent/ClientInfo";
import ClientTabs from "../../components/ClientsComponent/ClientTabs";
import {
  AppstoreAddOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  FileDoneOutlined,
  PieChartOutlined,
  PlusOutlined,
  SnippetsOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import CardReport from "../../components/CardReport";
import AppContext from "../../components/context/AppContext";

export default function DetailReports() {
  const { clientId } = useParams();
  const { globalDetailClient } = useContext(AppContext);
  const data = [
    {
      icon: <PieChartOutlined />,
      title: <h1>Account Statement</h1>,
      path:`/dashboard/reports/account-statement?clientId=${clientId}`,
      desc: (
        <span>
          A breakdown of {globalDetailClient?.company_name}'s activity over a period of time
        </span>
      ),
    },
    {
      icon: <FileDoneOutlined />,
      title: <h1>Invoice Details</h1>,
      path:'/dashboard/reports/invoice-detail',

      desc: (
        <span>A summary of the invoices you've sent over a period of time</span>
      ),
    },
    {
      icon: <AppstoreAddOutlined />,
      title: <h1>Revenue by Client</h1>,
      path:`/dashboard/reports/revenue-by-client?clientId=${clientId}`,

      desc: (
        <span>A breakdown of how much revenue {globalDetailClient?.company_name} is bringing in</span>
      ),
    },

    {
      icon: <SyncOutlined />,
      title: <h1>Recurring Revenue Annual</h1>,
      path:'/dashboard/reports/recurring-revenue',

      desc: <span>An annual summary of your recurring revenue</span>,
    },
    {
      icon: <DollarCircleOutlined />,
      title: <h1>Payments Collected</h1>,
      path:'/dashboard/reports/payments-collected',

      desc: <span>Payments you have collected over a period of time</span>,
    }
  ];
  return (
    <>
      <div className="layout-content">
        <ClientInfo clientId={clientId}/>
        <div tw="max-w-screen-xl mr-5 mb-10 mt-20" >
          <ClientTabs />
          <div tw="flex items-center mb-5 ">
            <span tw="text-xl font-bold text-black">Reports for {globalDetailClient?.company_name} </span>
          </div>
          <div tw="grid grid-cols-2 gap-3">
            {data.map((item, i) => (
             <Link key={i} to={item.path}>
               <CardReport>
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
