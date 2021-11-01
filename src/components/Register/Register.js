import React from "react";
import './Register.css';
import header__logo from "../../images/header__logo.png";
import {Link} from "react-router-dom";

export function Register(){
  return(
    <section className='register'>
      <div className='auth__container'>
        <img src={header__logo} className="auth__logo" alt="Лого"/>
        <h2 className="auth__title">Добро пожаловать!</h2>
          <form className='auth__form'>
            <fieldset className='auth__fields'>
              <p className='auth__input-name'>Имя</p>
              <input className='auth__input' type='text'/>
              <span className='auth__input-error'></span>
              <p className='auth__input-name'>E-mail</p>
              <input className='auth__input' type='email'/>
              <span className='auth__input-error'></span>
              <p className='auth__input-name'>Пароль</p>
              <input type="password" className="auth__input"/>
              <span className='auth__error'></span>
            </fieldset>
            <span className='auth__error'></span>
            <button className='auth__button' type='submit'>Зарегистрироваться</button>
          </form>
        <h3 className='auth__transition'>Уже зарегистрированы?
        <Link className='auth__link' to="/signin">Войти</Link></h3>
      </div>
    </section>
  )
}
