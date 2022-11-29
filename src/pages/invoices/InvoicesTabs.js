import { Tabs } from "antd";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";

export default function InvoiceTabs() {
  const { pathname } = useLocation();
  const history = useHistory();
  const handleClick = (key) => {
    switch (key) {
      case `/invoices/recurring-templates`:
        history.push(`/invoices/recurring-templates`);
        break;
      case `/invoices`:
        history.push(`/invoices`);
        break;

      default:
        history.push(`/invoices`);
        break;
    }
  };
  return (
    <Tabs
      defaultActiveKey={pathname}
      onChange={handleClick}
      tw="w-screen md:w-[60rem]"
    >
      <Tabs.TabPane tab="Invoices" key={`/invoices`} />
      <Tabs.TabPane
        tab="Recurring Templates"
        key={`/invoices/recurring-templates`}
      />
    </Tabs>
  );
}
