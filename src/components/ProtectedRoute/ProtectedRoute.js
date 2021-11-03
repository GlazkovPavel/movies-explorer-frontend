import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ loggedIn, component: Component ,...restProps}) => {

  if(!loggedIn){
    return <Redirect to="/signin" />
  }
  return <Route>
    <Component {...restProps} />
  </Route>
}
