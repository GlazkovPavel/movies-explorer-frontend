import React from "react";
import './SavedMovies.css';
import {Header} from "../Header/Header";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";

export function SavedMovies(props){

  const mainState = false
  const saved = true
  const loggedIn = true

  return(
    <>
      <Header
        main={mainState}
        loggedIn={loggedIn}
      />
      <SearchForm
        onSearchSavedMovies={props.onSearchSavedMovies}
        saved={saved}
      />
      <MoviesCardList
        saved={saved}
        movies={props.movies}
        onDeleteMovie={props.onDeleteMovie}
      />
      <Footer />
    </>
  )
}
