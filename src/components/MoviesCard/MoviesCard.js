import React from "react";
import "./MoviesCard.css";

export function MoviesCard(props) {
  return(
    <li className="movies__item">
      <div className="movies__photo-container">
        <img className="movies__photo" alt={props.card.name} src={props.card.link}/>
      </div>
      <div className="movies__item-description">
        <p className="movies__item-title">{props.card.name}</p>
        {props.saved ? <button className="movies__item-button movies__item-delete-button" /> :
          <button className="movies__item-button movies__item-like-button" />}
      </div>
      <p className="movies__item-duration">будет время</p>
    </li>
  )
}
