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
import {CurrentUserContext} from "../../contexts/CurrentUserContext";


function App() {
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');


  const location = useLocation();
  const history = useHistory();

  //регистрация пользователя
  function handleRegister(name, password, email) {
    setIsLoading(true);
    api.register(name, password, email)
      .then((res) => {
        if(res.user) {
          setRegisterErrorMessage('')
          handleLogin(password, email);        }
      })
      .catch((res) => {
       if(res.statusText === 'Bad Request') {
          setRegisterErrorMessage('Введены невалидные данные');
        } else if(res.status === 409) {
          setRegisterErrorMessage('Такой E-mail уже существует');
        } else {
          setRegisterErrorMessage(`Что-то пошло не так...Ошибка ${res.status}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //функция входа пользователя
  function handleLogin(password, email) {
    setIsLoading(true);

    api.enter(password, email)
      .then((data) => {
        if(data.token) {
          localStorage.setItem('loggedIn', 'true');
          setLoggedIn(true);
          setLoginErrorMessage('');
          localStorage.setItem('jwt', data.token)
          console.log(localStorage.getItem('jwt'))
          history.push('/movies');
        }
      })
      .catch((res) => {
        if(res.statusText === 'Bad Request') {
          setRegisterErrorMessage('Введены невалидные данные');
        } else if(res.status === 409) {
          setRegisterErrorMessage('Такой E-mail уже существует');
        } else {
          setRegisterErrorMessage(`Что-то пошло не так...Ошибка ${res.status}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //поиск фильмов
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
    const token = localStorage.getItem('jwt')
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
    const token = localStorage.getItem('jwt')

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
    const token = localStorage.getItem('jwt')

    api.getSavedMovies(token)
      .then((movies) => {
        setSavedMovies(movies);
      })
  }, [location]);


    React.useEffect(() => {
      const movies = JSON.parse(localStorage.getItem('movies'))
      console.log(movies)
      setMovies(movies)
      const token = localStorage.getItem('jwt')
      api.getUserData(token)
        .then((user) => {
          setCurrentUser(user)
        })
    }, [loggedIn] );

  function handleOnSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    setAllMovies([]);
    setMovies([]);
    setLoggedIn(false)
    history.push('/');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Main />
          </Route>
          <ProtectedRoute
            exact path="/movies"
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
            component={SavedMovies}
            movies={savedMovies}
            onDeleteMovie={handleDeleteMovie}
            onSearchSavedMovies={searchSavedMovies}
            notFoundMovies={notFoundMovies}
          />
          <ProtectedRoute
            exact path="/profile"
            component={Profile}
            onSignOut={handleOnSignOut}
          />
          <Route exact path='/signup'>
            <Register
              onRegister={handleRegister}
              errorMessage={registerErrorMessage}
              isLoading={isLoading}
            />
          </Route>
          <Route exact path='/signin'>
            <Login
              onLogin={handleLogin}
              errorMessage={loginErrorMessage}
              isLoading={isLoading}
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
