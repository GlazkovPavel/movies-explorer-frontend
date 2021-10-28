import React from "react";
import './Header.css';
import header__logo from '../../images/header__logo.png'

export function Header(){
  return(

      <section className="header">
        <img src={header__logo} className="header__logo" alt="Лого"/>
        {/*<Route path="/signup">*/}
        {/*  <Link to="/signin" className="header__button">Войти</Link>*/}
        {/*</Route>*/}
        {/*<Route path="/signin">*/}
        {/*  <Link to="/signup" className="header__button">Регистрация</Link>*/}
        {/*</Route>*/}
        {/*<Route exact path="/">*/}
        {/*  <div className="header__container">*/}
        {/*    <p className="header__email">{props.email}</p>*/}
        {/*    <button className="header__button" >Выйти</button>*/}
        {/*  </div>*/}
        {/*</Route>*/}

      </section>

  )
}
