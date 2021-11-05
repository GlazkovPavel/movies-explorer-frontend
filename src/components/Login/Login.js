import React from "react";
import './Login.css';
import header__logo from "../../images/header__logo.svg";
import {Link} from "react-router-dom";

export function Login() {
  return(
    <section className='register'>
      <div className='auth__container'>
        <div className="auth__logo-container">
          <img src={header__logo} className="auth__logo" alt="Лого"/>
        </div>
        <h2 className="auth__title">Рады видеть!</h2>
        <form className='auth__form'>
          <fieldset className='auth__fields'>
            <p className='auth__input-name'>E-mail</p>
            <input className='auth__input' type='email' required/>
            <span className='auth__input-error'></span>
            <p className='auth__input-name'>Пароль</p>
            <input type="password" className="auth__input" required/>
            <span className='auth__error'></span>
          </fieldset>
          <button className='auth__button signin__button' type='submit'>Войти</button>
        </form>
        <h3 className='auth__transition'>Ещё не зарегистрированы?
          <Link className='auth__link' to="/signup">Регистрация</Link></h3>
      </div>
    </section>
  )
}
