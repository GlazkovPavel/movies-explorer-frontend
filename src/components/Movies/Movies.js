import React from "react";
import './Movies.css';
import { Header } from "../Header/Header";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";
import {MoviesCardList} from "../MoviesCardList/MoviesCardList";

export function Movies(props) {

  const [isChecked, setIsShortMoviesChecked] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [searchWord, setSearchWord] = React.useState('');
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const mainState = false
  const saved = false
  const loggedIn = localStorage.getItem('loggedIn');


  React.useEffect(() => {
    setMovies(props.movies)
    setNotFoundMovies(props.notFoundMovies)
    setIsLoading(props.isLoading)
  }, [props.isLoading, props.movies, props.notFoundMovies])

  function handleSearch(searchWord) {
    setSearchWord(searchWord);
  }

  const handleSearchCheck = (movies, ef, searchWord) => {

    const filterRegex = new RegExp(searchWord, 'gi');
    return movies.filter((movie) => {
      if (ef) {
        return movie.duration <= 40 && filterRegex.test(movie.nameRU)
      } else {
        return filterRegex.test(movie.nameRU)
      }
    })
  }

  function handleShortMoviesChecked(e) {
    const ef = e.target.checked
    if (ef){
      const allMovies = JSON.parse(localStorage.getItem('movies'));
      const searchSavedResult = handleSearchCheck(allMovies, ef, searchWord);
      setIsShortMoviesChecked(true);
      if (searchSavedResult.length === 0) {
        setNotFoundMovies(true);
        setMovies([]);
        setIsLoading(false);
      } else {
        setMovies(searchSavedResult)
        setNotFoundMovies(false);
      }
    } else {
      const allMovies = JSON.parse(localStorage.getItem('movies'));
      const searchSavedResult = handleSearchCheck(allMovies, ef, searchWord);
      setIsShortMoviesChecked(false);
      if (searchSavedResult.length === 0) {
        setNotFoundMovies(true);
        setMovies([]);
        setIsLoading(false);
      } else {
        setMovies(searchSavedResult)
        setNotFoundMovies(false);
      }
    }}

  return(
    <>
      <Header
      main={mainState}
      loggedIn={loggedIn}
      />
      <SearchForm
        onSearchMovies={props.onSearchMovies}
        onShortMoviesCheck={handleShortMoviesChecked}
        isChecked={isChecked}
        saved={saved}
        onSearch={handleSearch}
      />
      <MoviesCardList
        saved={saved}
        movies={movies}
        onMovieSave={props.onMovieSave}
        onDeleteMovie={props.onDeleteMovie}
        notFoundMovies={notFoundMovies}
        isLoading={isLoading}
      />
      <Footer />
    </>

  )
}
