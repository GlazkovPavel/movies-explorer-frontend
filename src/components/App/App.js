import React from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Main } from "../Main/Main";
//import { Movies } from "../Movies/Movies";


function App() {
  return (
    <div className="page">
      {/*<Movies />*/}
      <Switch>
        <Route exact path='/main'>
          <Main />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
