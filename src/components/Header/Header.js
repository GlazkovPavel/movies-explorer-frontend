import React from "react";
import './Header.css';
import header__logo from '../../images/header__logo.png'
import {Link} from "react-router-dom";
import {Navigation} from "../Navigation/Navigation";

export function Header(props){

  const loggedIn = true

  return(

      <section className={props.main ? 'header' : 'header header__white'}>
        <Link to="/">
          <img src={header__logo} className="header__logo" alt="Лого"/>
        </Link>
        <Navigation loggedIn={loggedIn}/>

      </section>

  )
}
