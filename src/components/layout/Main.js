import axios from "axios"

import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import TabsSettting from "./TabsSettting";
import {useQuery} from "react-query"
import tw from "twin.macro";
import AccordionInvoice from "../AccordionInvoice";
import { LayoutInvoice } from '../../pages/invoices/LayoutInvoice.style';
import HeaderInvoice from "./HeaderInvoice";

import React from "react";

const { Header: AntHeader, Content, Sider } = Layout;
export const MainContext = React.createContext();
function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("#0075DD");
  const [fixed, setFixed] = useState(false);
  const [user, setUser] = useState(null);
  const [setting, setSetting] = useState(null);


  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  const { data } = useQuery(
    "profile",
    () => axios.get("user/profile").then((res) => res.data)
  )
  const { data:settingData } = useQuery(
    "settings",
    () => axios.get("settings").then((res) => res.data)
  )
  useEffect(() => {
    data && setUser(data?.data?.user)
  }, [data])

  useEffect(() => {
    settingData && setSetting(settingData?.data?.setting)
  }, [settingData])
  return (
    
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={200}
        theme="light"
        className={`sider-primary ant-layout-sider-primary`}
        style={{ background: sidenavType }}
      >
        <Sidenav color={sidenavColor} user={user} setting={setting} />
      </Sider>
{!pathname.includes('invoice-detail') ?
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) :  (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        ) 
        }

        <Content className="content-ant" >{children}</Content>
        {/* <Footer /> */}
      </Layout>
    :<LayoutInvoice>
         {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <HeaderInvoice
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) :  (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <HeaderInvoice
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        ) 
        }

<AccordionInvoice/>

<Content tw="mx-auto " >{children}</Content>

    </LayoutInvoice>  
    
    }
    </Layout>
    
  );
}

export default Main;
