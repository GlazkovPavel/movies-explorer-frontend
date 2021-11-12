import React from "react";
import './Movies.css';
import { Header } from "../Header/Header";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";

export function Movies(props) {

  const mainState = false
  const saved = false
  const loggedIn = localStorage.getItem('loggedIn');

  return(
    <>
      <Header
      main={mainState}
      loggedIn={loggedIn}
      />
      <SearchForm
        onSearchMovies={props.onSearchMovies}
        onShortMoviesCheck={props.onShortMoviesCheck}
        isChecked={props.isShortMoviesChecked}
        saved={saved}
        onSearch={props.onSearch}
      />
      <MoviesCardList
        saved={saved}
        movies={props.movies}
        onMovieSave={props.onMovieSave}
        onDeleteMovie={props.onDeleteMovie}
        notFoundMovies={props.notFoundMovies}
        isLoading={props.isLoading}
      />
      <Footer />
    </>

  )
}
