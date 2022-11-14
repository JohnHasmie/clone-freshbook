import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { isAuthenticated } from '../helpers';

const RouteAuthenticated = ({ component: Component, path }: RouteProps) => {
  if (!isAuthenticated()) {
    return <Redirect to="/login" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteAuthenticated;