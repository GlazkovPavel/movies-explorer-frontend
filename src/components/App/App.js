import React from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import {Header} from "../Header/Header";
import {Main} from "../Main/Main";


function App() {
  return (
    <div className="page">
      <Main />

    </div>
  );
}

export default App;
