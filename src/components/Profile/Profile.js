import React from "react";
import './Profile.css';
import {Header} from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

export function Profile(props) {

  const currentUser = React.useContext(CurrentUserContext)

  const loggedIn = localStorage.getItem('loggedIn');


  return(
    <>
      <Header loggedIn={loggedIn}/>
      <section className="profile">
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form className="profile__form">
          <fieldset className="profile__fields">
            <div className="profile__container">
              <p className="profile__form-input-name">Имя</p>
              <input type="text" className="profile__form-input" value={currentUser.name}/>
            </div>
            <hr/>
            <div className="profile__container">
              <p className="profile__form-input-name">E-mail</p>
              <input type="text" className="profile__form-input" value={currentUser.email}/>
            </div>
          </fieldset>
          <button className="profile__button profile__button_type_edit">Редактировать</button>
          <button className="profile__button profile__button_type_save">Сохранить</button>
        </form>
        <button className="profile__button profile__button_type_signout" onClick={props.onSignOut}>Выйти из аккаунта</button>


      </section>

    </>
  )
}
