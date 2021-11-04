import React from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Main } from "../Main/Main";
import { Movies } from "../Movies/Movies";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";
import { SavedMovies } from "../SavedMovies/SavedMovies";
import {ProtectedRoute} from "../ProtectedRoute/ProtectedRoute";
import { getMovies } from "../../utils/MoviesApi";
import api from "../../utils/MainApi";


function App() {
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);


  const isLoggedIn = true

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgxODE1OTA0ZjVlM2U0MzlmMDRjMzMiLCJpYXQiOjE2MzU4NzcyMjMsImV4cCI6MTYzNjQ4MjAyM30.wu7XJQPVIS6IaUoimeiCQen3AYhdfzAslmk1LR9nuSE'

  const getMoviesList = () => {
    getMovies()
      .then((movies) => {
        setAllMovies(movies)
        console.log(movies)
        localStorage.setItem('movies', JSON.stringify(movies))
      })
  }

  function handleSaveMovie(movie) {
    api.saveMovie(token, movie)
      .then((savedMovie) => {
        const films = [...savedMovies, savedMovie];
        localStorage.setItem('savedMovies', JSON.stringify(films));
        setSavedMovies(prevState => ([...prevState, savedMovie]));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      })
  }

  function handleDeleteMovie(movieId) {

    api.deleteMovie(token, movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter((deletedMovie) => {return deletedMovie._id !== movieId})
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      })
  }
  function searchSavedMovies() {
    const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    //const searchSavedResult = handleSearchMovies(allSavedMovies, keyWord);
    setSavedMovies(allSavedMovies);
  }

  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <ProtectedRoute
          exact path="/movies"
          loggedIn={isLoggedIn}
          component={Movies}
          allMovies={allMovies}
          onSearchMovies={getMoviesList}
          onDeleteMovie={handleDeleteMovie}
          onMovieSave={handleSaveMovie}
        />
        <ProtectedRoute
          exact path="/saved-movies"
          loggedIn={isLoggedIn}
          component={SavedMovies}
          movies={savedMovies}
          onDeleteMovie={handleDeleteMovie}
          onSearchSavedMovies={searchSavedMovies}

        />
        <ProtectedRoute
          exact path="/profile"
          loggedIn={isLoggedIn}
          component={Profile}
        />
        <Route exact path='/signup'>
          <Register />
        </Route>
        <Route exact path='/signin'>
          <Login />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
