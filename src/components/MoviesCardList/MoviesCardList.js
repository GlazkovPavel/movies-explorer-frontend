import React from "react";
import "./MoviesCardList.css";
import {MoviesCard} from "../MoviesCard/MoviesCard";

export function MoviesCardList(){
  return(
    <section className="movies">
      <ul className=movies__grid>
        <MoviesCard />
      </ul>
    </section>
  )
}
