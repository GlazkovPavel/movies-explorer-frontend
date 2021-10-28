import React from "react";
import "./MoviesCard.css";

export function MoviesCard({card}) {
  return(
    <li className="movies__item">
      <div className="movies__photo-container">
        <img className="movies__photo" alt={card.name} src={card.link}/>
      </div>
      <div className="movies__item-description">
        <p className="movies__item-title">{card.name}</p>
        <button className="movies__item-like-button" />
      </div>
      <p className="movies__item-duration">будет время</p>
    </li>
  )
}
