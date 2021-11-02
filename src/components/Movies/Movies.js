import React from "react";
import './Movies.css';
import { Header } from "../Header/Header";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";

export function Movies() {

  const mainState = false
  const saved = false
  const loggedIn = true

  return(
    <>
      <Header
      main={mainState}
      loggedIn={loggedIn}
      />
      <SearchForm />
      <MoviesCardList saved={saved}/>
      <Footer />
    </>

  )
}
