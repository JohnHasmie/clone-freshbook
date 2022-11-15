import { Tabs } from 'antd'
import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import  tw  from 'twin.macro';


export default function ClientTabs() {
    const { pathname } = useLocation();
    const { id } = useParams();
    const history = useHistory();
    const handleClick = (key) => {
      switch (key) {
        case "contacts":
          history.push(`/clients/${id}`);
          break;
  
        case "reports":
          history.push(`/clients/${id}/reports`);
  
          break;
  
        default:
          history.push(`/clients/${id}`);
          break;
      }
  
      // console.log(key,"key");
    };
  return (
    <Tabs
            defaultActiveKey={
             pathname.includes('reports') ? 'reports' :'contacts'
            }
            onChange={handleClick}
            tw="w-screen md:w-[60rem]"
          >
            <Tabs.TabPane tab="Contacts" key="contacts" />

            <Tabs.TabPane tab="Reports" key="reports" />
          </Tabs>
  )
}
