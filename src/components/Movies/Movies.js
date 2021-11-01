import React from "react";
import './Movies.css';
import { Header } from "../Header/Header";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";

export function Movies() {

  const mainState = false
  const saved = false

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
