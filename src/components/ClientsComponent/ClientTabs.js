import { Tabs } from "antd";
import React from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import tw from "twin.macro";

export default function ClientTabs() {
  const { pathname } = useLocation();
  const { clientId: id } = useParams();
  const history = useHistory();
  const handleClick = (key) => {
    switch (key) {
      case `/clients/${id}/client-detail`:
        history.push(`/clients/${id}/client-detail`);
        break;
      case `/clients/${id}/client-detail/invoices`:
        history.push(`/clients/${id}/client-detail/invoices`);
        break;
      case `/clients/${id}/client-detail/reports`:
        history.push(`/clients/${id}/client-detail/reports`);
        break;

      case `/clients/${id}/client-detail/recurring-templates`:
        history.push(`/clients/${id}/client-detail/recurring-templates`);

        break;

      default:
        history.push(`/clients/${id}`);
        break;
    }
  };
  return (
    <Tabs
    type="card"
      defaultActiveKey={pathname}
      onChange={handleClick}
      tw="w-screen md:w-[60rem]"
    >
      <Tabs.TabPane tab="Contacts" key={`/clients/${id}/client-detail`} />
      <Tabs.TabPane tab="Invoices" key={`/clients/${id}/client-detail/invoices`} />
      <Tabs.TabPane
        tab="Recurring Templates"
        key={`/clients/${id}/client-detail/recurring-templates`}
      />

      <Tabs.TabPane tab="Reports" key={`/clients/${id}/client-detail/reports`} />
    </Tabs>
  );
}
