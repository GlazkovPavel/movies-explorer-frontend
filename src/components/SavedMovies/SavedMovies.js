import React from "react";
import './SavedMovies.css';
import {Header} from "../Header/Header";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";

export function SavedMovies(props){

  const mainState = false
  const saved = true
  const loggedIn = localStorage.getItem('loggedIn');


  return(
    <>
      <Header
        main={mainState}
        loggedIn={loggedIn}
      />
      <SearchForm
        onSearchSavedMovies={props.onSearchSavedMovies}
        saved={saved}
        onShortMoviesCheck={props.onShortMoviesCheck}
        isChecked={props.isShortMoviesChecked}
        onSearch={props.onSearch}
      />
      <MoviesCardList
        saved={saved}
        movies={props.movies}
        onDeleteMovie={props.onDeleteMovie}
        notFoundMovies={props.notFoundMovies}
      />
      <Footer />
    </>
  )
}
