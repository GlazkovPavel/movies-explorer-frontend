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
            <div className="profile__container-name">
              <input type="text" className="profile__input-name" value={name} placeholder="Имя"/>
            </div>
            <div className="profile__container-email">
              <input type="text" className="profile__input-email" value={email} placeholder="Email"/>
            </div>
          </fieldset>
        </form>
        <button className="profile__button profile__button_type_edit">Редактировать</button>
        <button className="profile__button profile__button_type_save">Сохранить</button>
        <button className="profile__button profile__button_type_signout">Выйти из аккаунта</button>


      </section>

    </>
  )
}
