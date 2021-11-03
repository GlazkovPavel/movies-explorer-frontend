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

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <ProtectedRoute exact path="/movies" loggedIn={isLoggedIn} component={Movies} />
        <ProtectedRoute exact path="/saved-movies"  loggedIn={isLoggedIn} component={SavedMovies} />
        <ProtectedRoute exact path="/profile" loggedIn={isLoggedIn} component={Profile} />
        <Route exact path='/signup'>
          <Register />
        </Route>
        <Route exact path='/signin'>
          <Login />
        </Route>

        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
