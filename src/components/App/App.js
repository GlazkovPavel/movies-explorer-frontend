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

  const isLoggedIn = true

  const getMoviesList = () => {
    getMovies()
      .then((movies) => {
        setAllMovies(movies)
        console.log(movies)
      })
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
        />
        <ProtectedRoute
          exact path="/saved-movies"
          loggedIn={isLoggedIn}
          component={SavedMovies}
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
