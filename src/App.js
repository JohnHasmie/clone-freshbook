
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import Home from "./pages/Home";
import Tables from "./pages/Tables";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import GlobalSetting from "./pages/setting/GlobalSetting";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import Business from "./pages/setting/Business";
import EmailNotification from "./pages/setting/EmailNotification";
import { useEffect } from "react";
import axios from "axios";
import useAuth from "./hooks/useAuth";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  let { pathname } = useLocation();
  const queryClient = new QueryClient();

  const { token } = useAuth()


  let history = useHistory();
  useEffect(() => {
    if (pathname === "/") {
      history.push("/dashboard");
    }
  }, [pathname]);

  axios.defaults.headers.common = {
    Authorization: `Bearer ${token}`,
    Accept: "Application/json",
  };
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/sign-in" exact component={SignIn} />
          <Main>
            <Route exact path="/dashboard" component={Home} />
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

            <Route exact path="/tables" component={Tables} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/rtl" component={Rtl} />
            <Route exact path="/profile" component={Profile} />
            {/* <Redirect from="*" to="/dashboard" /> */}
          </Main>
        </Switch>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </div>
  );
}

export default App;
