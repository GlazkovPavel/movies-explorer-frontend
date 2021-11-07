import React from "react";
import './Login.css';
import header__logo from "../../images/header__logo.svg";
import {Link} from "react-router-dom";
import {useFormWithValidation} from "../../utils/formValidator";
import Preloader from "../Preloader/Preloader";

export function Login(props) {

    const {values, handleChange, errors, isValid} = useFormWithValidation();

    function handleLoginSubmit(e) {
      e.preventDefault();

      props.onLogin(values.password, values.email);
    }

  return(
    <section className='register'>
      {props.isLoading ? <Preloader/> :
        <div className='auth__container'>
          <div className="auth__logo-container">
            <img src={header__logo} className="auth__logo" alt="Лого"/>
          </div>
          <h2 className="auth__title">Рады видеть!</h2>
          <form className='auth__form' onSubmit={handleLoginSubmit}>
            <fieldset className='auth__fields'>
              <p className='auth__input-name'>E-mail</p>
              <input
                className='auth__input'
                name='email'
                value={values.email || ''}
                onChange={handleChange}
                type='email'
                required/>
              <span className='auth__error'>{errors.email}</span>
              <p className='auth__input-name'>Пароль</p>
              <input
                type="password"
                className="auth__input"
                name="password"
                value={values.password || ''}
                onChange={handleChange}
                minLength="8"
                required/>
              <span className='auth__error'>{errors.password}</span>
            </fieldset>
            <button className={`auth__button ${isValid ? '': 'auth__button_disabled'}`}
                    disabled={!isValid} type='submit'>Войти</button>
          </form>
          <h3 className='auth__transition'>Ещё не зарегистрированы?
            <Link className='auth__link' to="/signup">Регистрация</Link></h3>
        </div>
      }

    </section>
  )
}
