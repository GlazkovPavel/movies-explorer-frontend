import React from "react";
import './SearchForm.css';
import search__icon from '../../images/search__icon.svg'
import {FilterCheckbox} from "../FilterCheckbox/FilterCheckbox";

export function SearchForm(props) {

  const [search, setSearch] = React.useState('')
  const [isChecked, setIsShortMoviesChecked] = React.useState(false);

  function handleSearchChange(e){
    setSearch(e.target.value);
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    props.onSearchMovies(search, isChecked);
  }

  function handleSearchSavedMovies(e) {
    e.preventDefault();
    props.onSearchSavedMovies(search, isChecked);
  }

  function handleShortMoviesCheck(e) {
    setIsShortMoviesChecked(e.target.checked);
  }

  return(
    <section className="search">
      <form className="search__form" onSubmit={props.saved ? handleSearchSavedMovies : handleSearchMovies}>
        <img src={search__icon} className="search__icon" alt="Icon"/>
        <fieldset className="search__form-fields">
          <input
            className="search__form-input"
            placeholder="Фильм"
            value={search || ''}
            onChange={handleSearchChange}
          />
        </fieldset>
        <button type="submit" className="search__form-button" />
        <span className="search__form-button_border" />
        <div className="search__toggle-box">
          <FilterCheckbox onChange={handleShortMoviesCheck} isChecked={isChecked}/>
          <h3 className="search__toggle-text">Короткометражки</h3>
        </div>
      </form>
    </section>
  )
}
