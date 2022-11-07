import { Tabs, Typography } from 'antd'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'

export default function TabsSettting() {
    const {Title}= Typography
    const {pathname}= useLocation()

    const history= useHistory()
    const handleClick =(key)=>{
        history.push(`${key}`) 
        // console.log(key,"key");
    }
  return (
    <div style={{paddingTop:"20px"}}>
    <Title level={1}>Settings</Title>
    <Tabs defaultActiveKey={pathname} onChange={handleClick}>
    <Tabs.TabPane tab="Account" key="/global-settings"/>
    
    <Tabs.TabPane tab="Business" key="/global-settings/business" />
    
    <Tabs.TabPane tab="Email Notifications" key="/global-settings/email-notifications" />
     
  </Tabs>
  </div>
  )
}
