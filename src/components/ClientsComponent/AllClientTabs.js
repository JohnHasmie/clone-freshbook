import { Tabs } from "antd";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import tw from "twin.macro";

export default function AllClientTabs() {
  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();
  const handleClick = (key) => {
    switch (key) {
      case "clients":
        history.push(`/clients`);
        break;

      case "sent-email":
        history.push(`/clients/sent-email`);

        break;

      default:
        history.push(`/clients`);
        break;
    }

    // console.log(key,"key");
  };
  return (
    <Tabs
    type="card"
      defaultActiveKey={
        pathname.includes("sent-email") ? "sent-email" : "clients"
      }
      onChange={handleClick}
      tw="w-full"
    >
      <Tabs.TabPane tab="Clients" key="clients" />

      <Tabs.TabPane tab="Sent Emails" key="sent-email" />
    </Tabs>
  );
}
