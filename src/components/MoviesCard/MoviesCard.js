import React from "react";
import "./MoviesCard.css";
import {useLocation} from "react-router-dom";

export function MoviesCard(props) {

  const [isMoviesSaved, setIsMoviesSaved] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const movie = {
    country : props.movie.country || 'Не найдено',
    director: props.movie.director || 'Не найдено',
    duration: props.movie.duration || 0,
    year: props.movie.year || 'Не найдено',
    description: props.movie.description || 'Не найдено',
    image: `https://api.nomoreparties.co${props.movie.image?.url}`,
    trailer: props.movie?.trailerLink,
    nameRU: props.movie.nameRU || 'Не найдено',
    nameEN: props.movie.nameEN || 'Не найдено',
    thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
    movieId: props.movie.id,
  }

  const editedDuration = `${Math.trunc(movie.duration/60)}ч${movie.duration % 60}м`;
  const image = `https://api.nomoreparties.co${props.movie.image?.url}`;
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const currentMovie = savedMovies.find((movie) => movie.nameRU === props.movie.nameRU);

  const location = useLocation();

  function handleLikeButtonCLick() {
    props.onMovieSave(movie);
    setIsLiked(true);
  }

  function handleDisLike() {
    setIsLiked(false);
    console.log(currentMovie)
    props.onDeleteMovie(currentMovie._id);
  }

  function handleDeleteMovie() {
    props.onDeleteMovie(props.movie._id);
    setIsLiked(false);
  }

  React.useEffect(() => {
    if(currentMovie) {
      setIsLiked(true)
    }

  }, [currentMovie, location])

  function onMouseOver(){
    setIsMoviesSaved(true)
  }
  function onMouseOut(){
    setIsMoviesSaved(false)
  }



  return(
    <li className="movies__item" >
      <div className="movies__photo-container" >
        <a href={props.saved ? props.movie.trailer : props.movie.trailerLink}
           className="movies__trailer-link"
           rel="noreferrer"
           target="_blank">
          <img className="movies__photo" alt={props.movie.nameRU} src={props.saved ? props.movie.image : image}/>
        </a>
      </div>
      <div className="movies__item-description" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <p className="movies__item-title">{props.movie.nameRU}</p>
        {props.saved ?
          <button
            className={`movies__item-button ${isMoviesSaved ? 'movies__item-delete-button' : ''}`}
            onClick={handleDeleteMovie}
          /> :
          <button className={`movies__item-button ${isLiked ? 'movies__item-like-button-active'
            : 'movies__item-like-button'}`} onClick={isLiked ? handleDisLike : handleLikeButtonCLick}/>}
      </div>
      <p className="movies__item-duration">{editedDuration}</p>
    </li>
  )
}
