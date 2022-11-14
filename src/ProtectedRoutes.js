import React from 'react'
import Billing from './pages/Billing'
import Clients from './pages/clients/Clients'
import Home from './pages/Home'
import Items from './pages/item-service/Items'
import Business from './pages/setting/Business'
import EmailNotification from './pages/setting/EmailNotification'
import GlobalSetting from './pages/setting/GlobalSetting'
import Tables from './pages/Tables'
import Rtl from "./pages/Rtl";
import Profile from './pages/Profile'
import { Route } from 'react-router-dom'
import Main from './components/layout/Main';

export default function ProtectedRoutes() {
  return (
    <Main>
    <Route exact path="/dashboard" component={Home} />
    <Route exact path="/clients" component={Clients} />

    <Route exact path="/global-settings" component={GlobalSetting} />
    <Route
      exact
      path="/global-settings/business"
      component={Business}
    />
    <Route
      exact
      path="/global-settings/email-notifications"
      component={EmailNotification}
    />
    <Route exact path="/items" component={Items} />

    <Route exact path="/tables" component={Tables} />
    <Route exact path="/billing" component={Billing} />
    <Route exact path="/rtl" component={Rtl} />
    <Route exact path="/profile" component={Profile} />
    {/* <Redirect from="*" to="/dashboard" /> */}
  </Main>
  )
}
