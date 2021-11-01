import React from "react";
import './Profile.css';
import {Header} from "../Header/Header";

export function Profile() {

  const name = 'Павел'
  const email = 'email@mail.ru'

  return(
    <>
      <Header />
      <section className="profile">
        <h2 className='profile__title'>Привет, {name}!</h2>
        <form className="profile__form">
          <fieldset className="profile__fields">
            <div className="profile__container">
              <p className="profile__form-input-name">Имя</p>
              <input type="text" className="profile__form-input" value={name}/>
            </div>
            <hr/>
            <div className="profile__container">
              <p className="profile__form-input-name">E-mail</p>
              <input type="text" className="profile__form-input" value={email}/>
            </div>
          </fieldset>
          <button className="profile__button profile__button_type_edit">Редактировать</button>
          <button className="profile__button profile__button_type_save">Сохранить</button>
        </form>
        <button className="profile__button profile__button_type_signout">Выйти из аккаунта</button>


      </section>

    </>
  )
}
