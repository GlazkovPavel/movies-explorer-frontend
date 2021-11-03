import React from "react";
import "./MoviesCard.css";

export function MoviesCard(props) {

  const [isMoviesSaved, setIsMoviesSaved] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const image = `https://api.nomoreparties.co${props.movie.image?.url}`

  function onMouseOver(){
    setIsMoviesSaved(true)
  }
  function onMouseOut(){
    setIsMoviesSaved(false)
  }
  function onClickButtonLike() {
    (setIsLiked(setIsLiked => !setIsLiked))

  }


  return(
    <li className="movies__item" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      <div className="movies__photo-container" >
        <img className="movies__photo" alt={props.movie.nameRU} src={image}/>
      </div>
      <div className="movies__item-description">
        <p className="movies__item-title">{props.movie.nameRU}</p>
        {props.saved ? <button className={`movies__item-button ${isMoviesSaved ? 'movies__item-delete-button' : ''}`} /> :
          <button className={`movies__item-button ${isLiked ? 'movies__item-like-button-active'
            : 'movies__item-like-button'}`} onClick={onClickButtonLike}/>}
      </div>
      <p className="movies__item-duration">{new Date().toLocaleTimeString()}</p>
    </li>
  )
}
