import React from "react";
import './Register.css';
import header__logo from "../../images/header__logo.svg";
import { Link } from "react-router-dom";
import {useFormWithValidation} from "../../utils/formValidator";

export function Register(props){

  const {values, handleChange, errors, isValid} = useFormWithValidation();

  function handleRegisterSubmit(e) {
    e.preventDefault();

    props.onRegister(values.name, values.password, values.email);
  }
  return(
    <section className='register'>
      <div className='auth__container'>
        <div className="auth__logo-container">
          <img src={header__logo} className="auth__logo" alt="Лого"/>
        </div>
        <h2 className="auth__title">Добро пожаловать!</h2>
          <form className='auth__form' onSubmit={handleRegisterSubmit}>
            <fieldset className='auth__fields'>
              <p className='auth__input-name'>Имя</p>
              <input
                className='auth__input'
                type='text'
                name='name'
                value={values.name || ''}
                onChange={handleChange}
                pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
                required/>
              <span className='auth__error'>{errors.name}</span>
              <p className='auth__input-name'>E-mail</p>
              <input
                className='auth__input'
                type='email'
                name='email'
                value={values.email || ''}
                onChange={handleChange}
                required/>
              <span className='auth__error'>{errors.email}</span>
              <p className='auth__input-name'>Пароль</p>
              <input
                type="password"
                className="auth__input"
                name='password'
                value={values.password || ''}
                onChange={handleChange}
                required/>
              <span className='auth__error'>{errors.password}</span>
            </fieldset>
            <span className='auth__submit-error'>{props.errorMessage}</span>
            <button className={`auth__button ${isValid ? '': 'auth__button_disabled'}`}
                    disabled={!isValid} type='submit'>Зарегистрироваться</button>
          </form>
        <h3 className='auth__transition'>Уже зарегистрированы?
        <Link className='auth__link' to="/signin">Войти</Link></h3>
      </div>
    </section>
  )
}
