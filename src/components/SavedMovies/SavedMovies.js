import React from "react";
import './SavedMovies.css';
import {Header} from "../Header/Header";
import {SearchForm} from "../SearchForm/SearchForm";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";
import {Footer} from "../Footer/Footer";

export function SavedMovies(){

  const mainState = false
  const saved = true

  return(
    <>
      <Header
        main={mainState}
      />
      <SearchForm />
      <MoviesCardList saved={saved}/>
      <Footer />
    </>
  )
}
