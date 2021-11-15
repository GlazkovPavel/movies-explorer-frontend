import React from 'react';
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ component: Component, loggedIn ,...restProps}) => {

  if(!loggedIn){
    return <Redirect to="/" />
  }
  return <Route>
    <Component {...restProps} loggedIn={loggedIn}/>
  </Route>
}
