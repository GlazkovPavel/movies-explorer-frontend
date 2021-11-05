import React from "react";
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
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
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);


  const location = useLocation();
  //const history = useHistory();

  const isLoggedIn = true

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTgzZTA2YmU4Nzc3MGE5NjRiMjEyZTAiLCJpYXQiOjE2MzYwMzI2MzIsImV4cCI6MTYzNjYzNzQzMn0.OS-cZayElckT6exOSsHvJYFD1J7lppYBBX1FKXTFA90'

  const searchMovies = (word, isChecked) => {
    setIsLoading(true);
    setMovies([]);
    setNotFoundMovies(false);

      if(allMovies.length === 0 || word.length === 0) {
        getMovies()
          .then((movies) => {
              setAllMovies(movies)
              const searchResult = handleSearchMovies(movies, word, isChecked)
              if(searchResult.length === 0) {
                setNotFoundMovies(true);
                setMovies([]);
                setIsLoading(false);
              } else {
                localStorage.setItem('movies', JSON.stringify(movies))
                setMovies(JSON.parse(localStorage.getItem('movies')));
                setNotFoundMovies(false);
                setIsLoading(false);
              }})
          .catch(err => console.log(err, 'Обработка ошибок'))
          .finally(() => {
            setIsLoading(false);
          })
      } else {
        const searchResult = handleSearchMovies(allMovies, word, isChecked)
        if(searchResult.length === 0) {
          setNotFoundMovies(true);
          setMovies([]);
          setIsLoading(false);
        } else if(searchResult.length !== 0) {
          localStorage.setItem('movies', JSON.stringify(searchResult));
          setMovies(JSON.parse(localStorage.getItem('movies')));
          setIsLoading(false);
          setNotFoundMovies(false);
        }
      }
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
//функция удаления фильмов в сохраненных
  function handleDeleteMovie(movieId) {

    api.deleteMovie(token, movieId)
      .then(() => {
        const newSavedMovies = savedMovies.filter((deletedMovie) => {return deletedMovie._id !== movieId})
        setSavedMovies(newSavedMovies);
        localStorage.setItem('savedMovies', JSON.stringify(newSavedMovies));
        const movies = JSON.parse(localStorage.getItem('movies'))

        setMovies(movies)
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      })
  }

//фильтр названия фильмов
  const handleSearchMovies = (movies, word, isChecked) => {

    const filterRegex = new RegExp(word, 'gi');
    return movies.filter((movie) => {
      if (isChecked) {
        return movie.duration <= 40 && filterRegex.test(movie.nameRU)
      } else {
        return filterRegex.test(movie.nameRU)
      }
    })
  }

//поиск по сохраненным фильтрам
  function searchSavedMovies(word, isChecked) {
    const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const searchSavedResult = handleSearchMovies(allSavedMovies, word, isChecked);
    if (searchSavedResult.length === 0) {
      setNotFoundMovies(true)
      setIsLoading(false);
    }
    setSavedMovies(searchSavedResult);
    setIsLoading(false);
  }

  React.useEffect(() => {

    api.getSavedMovies(token)
      .then((movies) => {
        setSavedMovies(movies);
      })
  }, [location]);


    React.useEffect(() => {
      const movies = JSON.parse(localStorage.getItem('movies'))

      setMovies(movies)
    }, [] );

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
          movies={movies}
          onSearchMovies={searchMovies}
          onDeleteMovie={handleDeleteMovie}
          onMovieSave={handleSaveMovie}
          notFoundMovies={notFoundMovies}
          isLoading={isLoading}
        />
        <ProtectedRoute
          exact path="/saved-movies"
          loggedIn={isLoggedIn}
          component={SavedMovies}
          movies={savedMovies}
          onDeleteMovie={handleDeleteMovie}
          onSearchSavedMovies={searchSavedMovies}
          notFoundMovies={notFoundMovies}
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
