import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component ,...restProps}) => {
  const loggedIn = localStorage.getItem('loggedIn');

  if(!loggedIn){
    return <Redirect to="/" />
  }
  return <Route>
    <Component {...restProps} />
  </Route>
}
