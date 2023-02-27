import React from "react";
import { Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const withAdminRedirect = (Component) => {
  const WrappedComponent = (props) => {
    const { role } = useAuth();

    if (role !== "admin") {
      return <Redirect to="/dashboard" />;
    }

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export default withAdminRedirect;
