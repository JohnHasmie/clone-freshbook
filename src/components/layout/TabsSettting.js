import { Col, Row, Tabs, Typography } from 'antd'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import  tw  from 'twin.macro';

export default function TabsSettting() {
    const {Title}= Typography
    const {pathname}= useLocation()

    const history= useHistory()
    const handleClick =(key)=>{
        history.push(`${key}`) 
        // console.log(key,"key");
    }
  return (
    <>
         <Row gutter={[24, 0]}>
        <Col span={24} md={6} >
   
          <div className="ant-page-header-heading">
            <Title level={1} style={{ textTransform: "capitalize" }}>
            Settings
            </Title>
          </div>
          <Tabs defaultActiveKey={pathname} onChange={handleClick} tw="w-screen md:w-[60rem]">
    <Tabs.TabPane tab="Account" key="/global-settings"/>
    
    <Tabs.TabPane tab="Business" key="/global-settings/business" />
    
    <Tabs.TabPane tab="Email Notifications" key="/global-settings/email-notifications" />
     
  </Tabs>
        </Col>
        </Row>
    {/* <div style={{paddingTop:"20px"}}>
    <Title level={1}>Settings</Title>
    <Tabs defaultActiveKey={pathname} onChange={handleClick}>
    <Tabs.TabPane tab="Account" key="/global-settings"/>
    
    <Tabs.TabPane tab="Business" key="/global-settings/business" />
    
    <Tabs.TabPane tab="Email Notifications" key="/global-settings/email-notifications" />
     
  </Tabs>
  </div> */}
    </>
  )
}
