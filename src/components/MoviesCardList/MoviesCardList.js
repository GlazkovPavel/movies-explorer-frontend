import React from "react";
import "./MoviesCardList.css";
import {MoviesCard} from "../MoviesCard/MoviesCard";
import {initialCards} from "../../utils/bd"

export function MoviesCardList(props){

  return(
    <section className="movies">
      <ul className="movies__grid">
        {initialCards.map(card => (
          <MoviesCard
            key={card._id}
            card={card}
            saved={props.saved}
          />

        ))}
      </ul>
    </section>
  )
}
