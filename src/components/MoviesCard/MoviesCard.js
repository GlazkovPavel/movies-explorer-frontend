import React from "react";
import "./MoviesCard.css";

export function MoviesCard() {
  return(
    <li className="movies__item">
      <div className="movies__photo-container">
        <img className="movies__photo" alt="None" />
      </div>
      <div className="movies__item-description">
        <p className="movies__item-title">Тут будет название фильма</p>
        <button className="movies__item-like-button" />
      </div>
      <p className="movies__item-duration">будет время</p>
    </li>
  )
}
