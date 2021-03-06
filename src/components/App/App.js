import React from "react";
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom';
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
import {SHORT_MOVIE_DURATION} from "../../utils/constants";

function App() {
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [notFoundMovies, setNotFoundMovies] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = React.useState('');
  const [loginErrorMessage, setLoginErrorMessage] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState('');
  const [profileMessage, setProfileMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [isShortMoviesChecked, setIsShortMoviesChecked] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);


  const location = useLocation();
  const history = useHistory();

  //регистрация пользователя
  function handleRegister(name, password, email) {
    setRegisterErrorMessage('');
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
    setRegisterErrorMessage('');
    setIsLoading(true);

    api.enter(password, email)
      .then((data) => {
        if(data.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', data.token)
          setLoginErrorMessage('');

          api.getUserData(data.token)
            .then((userData) => {
              setCurrentUser(userData)
            })
            .catch((res) => {
              setLoginErrorMessage(`Что-то пошло не так...Ошибка ${res.status}`);
            })
          history.push('/movies');
        }
      })
      .catch((res) => {
        if(res.statusText === 'Bad Request') {
          setLoginErrorMessage('Введены невалидные данные');
        } else if(res.status === 409) {
          setLoginErrorMessage('Такой E-mail уже существует');
        } else {
          setLoginErrorMessage(`Что-то пошло не так...Ошибка ${res.status}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  //редактирование пользователя
  function handleUserInfo(name, email) {
    const token = localStorage.getItem('jwt')

    api.editUserData(token, name, email)
      .then((newUser) => {
        if(newUser) {
          setCurrentUser(newUser.user);
          setProfileMessage('Профиль успешно обновлен!');
          setIsSuccess(true);
        }
      })
      .catch((res) => {
        setIsSuccess(false);
        if(res.statusText === 'Bad Request') {
          setProfileMessage('Введены невалидные данные');
        } else if(res.status === 409) {
          setProfileMessage('Такой E-mail уже существует');
        } else {
          setProfileMessage(`При обновлении профиля произошла, ошибка ${res.status}`);
        }
      })
  }

  function handleShortMoviesChecked(e) {
    setIsShortMoviesChecked(e.target.checked);
  }

  //поиск фильмов
  const searchMovies = (word) => {
    setIsLoading(true);
    setMovies([]);
    setNotFoundMovies(false);

      if(allMovies.length === 0 ) {
        getMovies()
          .then((movies) => {
              setAllMovies(movies)
              const searchResult = handleSearchMovies(movies, word)
              if(searchResult.length === 0) {
                setNotFoundMovies(true);
                setMovies([]);
              } else {
                localStorage.setItem('movies', JSON.stringify(searchResult))
                setMovies(JSON.parse(localStorage.getItem('movies')));
                setNotFoundMovies(false);
              }})
          .catch((err) => {
            console.log(`Ошибка ${err}, попробуйте еще раз`)
          })
          .finally(() => {
            setIsLoading(false);
          })
      } else {
        const searchResult = handleSearchMovies(allMovies, word)
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
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      })
  }

//фильтр названия фильмов
  const handleSearchMovies = (movies, word) => {

    const filterRegex = new RegExp(word, 'gi');
    return movies.filter((movie) => {
      if (isShortMoviesChecked) {
        return movie.duration <= SHORT_MOVIE_DURATION && filterRegex.test(movie.nameRU)
      } else {
        return filterRegex.test(movie.nameRU)
      }
    })
  }

//поиск по сохраненным фильтрам
  function searchSavedMovies(word) {
    const allSavedMovies = JSON.parse(localStorage.getItem('savedMovies'));
    const searchSavedResult = handleSearchMovies(allSavedMovies, word);
    if (searchSavedResult.length === 0) {
      setNotFoundMovies(true);
      setSavedMovies([]);
      setIsLoading(false);
    } else {
      setSavedMovies(searchSavedResult);
      setIsLoading(false);
      setNotFoundMovies(false);
    }
  }

  //функция очистки сообщений об ошибки
  function clearErrorMessages() {
    setRegisterErrorMessage('');
    setLoginErrorMessage('');
  }

  //выход из аккаунта
  function handleOnSignOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    setLoggedIn(false);
    setAllMovies([]);
    setMovies([]);
    setSavedMovies([]);
    setNotFoundMovies(false);
    setCurrentUser('');
    history.push('/');
  }

  React.useEffect(() => {
    if(location.pathname === '/saved-movies') {
      const token = localStorage.getItem('jwt')
      setProfileMessage('');
      setIsSuccess(true);
        api.getSavedMovies(token)
          .then((movies) => {
            setSavedMovies(movies);
          })
          .catch((err) => {
            console.log(`Ошибка ${err}, попробуйте еще раз`);
          })
    }

  }, [location]);

  React.useEffect(() => {
    if(location.pathname === '/movies') {
      const token = localStorage.getItem('jwt');
      const searchedMovies = JSON.parse(localStorage.getItem('movies'));

      Promise.all([api.getUserData(token), api.getSavedMovies(token)])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
          setSavedMovies(movies);
          setMovies(searchedMovies);
          setLoggedIn(true)
        })
        .catch((err) => {
            console.log(`Ошибка ${err}, попробуйте еще раз`);
          }
        )
    }


  }, [history, location.pathname, loggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Main loggedIn={loggedIn}/>
          </Route>
          <ProtectedRoute
            exact path="/movies"
            component={Movies}
            movies={movies}
            loggedIn={loggedIn}
            onSearchMovies={searchMovies}
            onDeleteMovie={handleDeleteMovie}
            onMovieSave={handleSaveMovie}
            notFoundMovies={notFoundMovies}
            isLoading={isLoading}
            onShortMoviesCheck={handleShortMoviesChecked}
            isShortMoviesChecked={isShortMoviesChecked}
          />
          <ProtectedRoute
            exact path="/saved-movies"
            component={SavedMovies}
            movies={savedMovies}
            onDeleteMovie={handleDeleteMovie}
            onSearchSavedMovies={searchSavedMovies}
            notFoundMovies={notFoundMovies}
            onShortMoviesCheck={handleShortMoviesChecked}
            isShortMoviesChecked={isShortMoviesChecked}
            isLoading={isLoading}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            exact path="/profile"
            component={Profile}
            onSignOut={handleOnSignOut}
            isLoading={isLoading}
            onUserInfo={handleUserInfo}
            profileMessage={profileMessage}
            isSuccess={isSuccess}
            loggedIn={loggedIn}
          />
          <Route exact path='/signup'>
            {loggedIn ? <Redirect to='/'/> :
              <Register
                onRegister={handleRegister}
                errorMessage={registerErrorMessage}
                isLoading={isLoading}
                onClear={clearErrorMessages}
              />}
          </Route>
          <Route exact path='/signin'>
            {loggedIn ? <Redirect to='/'/> :
              <Login
                onLogin={handleLogin}
                errorMessage={loginErrorMessage}
                isLoading={isLoading}
                onClear={clearErrorMessages}
              />}
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
