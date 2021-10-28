import React from "react";
import "./MoviesCardList.css";
import {MoviesCard} from "../MoviesCard/MoviesCard";
import {initialCards} from "../../utils/bd"

export function MoviesCardList(){
  return(
    <section className="movies">
      <ul className="movies__grid">
        {initialCards.map(card => (
          <MoviesCard
            key={card._id}
            card={card}
          />

        ))}
      </ul>
    </section>
  )
}
