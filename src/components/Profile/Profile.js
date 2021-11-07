import React from "react";
import './Profile.css';
import {Header} from "../Header/Header";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {useFormWithValidation} from "../../utils/formValidator";

export function Profile(props) {

  const [isFormDisabled, setIsFormDisabled] = React.useState(true);

  const currentUser = React.useContext(CurrentUserContext)
  const loggedIn = localStorage.getItem('loggedIn');

  const {values, handleChange, errors, isValid, setValues} = useFormWithValidation();


  function disabledButton(e) {
    e.preventDefault();
    setIsFormDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUserInfo(values.name, values.email);
  }

  React.useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  React.useEffect(() => {
    if(props.isLoading) {
      setIsFormDisabled(true);
    }
  }, [props.isLoading]);

  React.useEffect(() => {
    setIsFormDisabled(props.isSuccess);
  },[props.isSuccess,  props.onUserInfo]);

  return(
    <>
      <Header loggedIn={loggedIn}/>
      <section className="profile">
        <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <fieldset className="profile__fields">
            <div className="profile__container">
              <p className="profile__form-input-name">Имя</p>
              <input
                type="text"
                name="name"
                className="profile__form-input"
                onChange={handleChange}
                disabled={isFormDisabled}
                value={values.name || ''}/>
            </div>
            <span className='auth__error'>{errors.name}</span>
            <hr/>
            <div className="profile__container">
              <p className="profile__form-input-name">E-mail</p>
              <input
                type="email"
                name="email"
                className="profile__form-input"
                onChange={handleChange}
                disabled={isFormDisabled}
                value={values.email || ''}/>
            </div>
            <span className='auth__error'>{ errors.email }</span>
          </fieldset>
          <span
            className={`profile__message ${props.isSuccess ? 'profile__message_type_success' : 'profile__message_type_error'}`}>
                        { props.profileMessage}</span>
          {isFormDisabled ?
            <button className="profile__button profile__button_type_edit" onClick={disabledButton}>Редактировать</button> :
            <button disabled={!isValid} className={`profile__button profile__button_type_save
            ${isValid ? '': 'auth__button_disabled'}`}>Сохранить</button>}
        </form>
        <button className="profile__button profile__button_type_signout" onClick={props.onSignOut}>Выйти из аккаунта</button>
      </section>

    </>
  )
}
