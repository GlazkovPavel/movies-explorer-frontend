import React from "react";
import "./MoviesCardList.css";
import {MoviesCard} from "../MoviesCard/MoviesCard";

export function MoviesCardList(props){

  React.useEffect(() => {
    window.addEventListener('resize', handleScreenWidth);
  }, []);

  const [initialCardsCurrent, setInitialCardsCurrent] = React.useState(() => {
    const windowSize = window.innerWidth;
    if(windowSize < 641) {
      return 5
    } else if(windowSize <= 970) {
      return 8
    } else if(windowSize < 1279) {
      return 12 }
    else if(windowSize > 1279) {
      return 12
    }
  } );
  const [moreCardsNumber, setMoreCardsNumber] = React.useState(() => {
    const windowSize = window.innerWidth;
     if(windowSize <= 970) {
      return 2
    } else if(windowSize >= 971) {
      return 3
    }
  });

  function handleScreenWidth () {
    const windowSize = window.innerWidth;
    if(windowSize < 641) {
      setInitialCardsCurrent(5)
    } else if(windowSize <= 970) {
      setInitialCardsCurrent(8)
    } else if(windowSize < 1279) {
      setInitialCardsCurrent(12)
    } else if(windowSize > 1279) {
      setInitialCardsCurrent(12)
    }
  }

  const displayedMovies = props.movies?.slice(0, initialCardsCurrent);

  function handleMoviesIncrease() {
    setInitialCardsCurrent(prevState => {return prevState + moreCardsNumber});
  }

  return(
    <section className="movies">
      <ul className="movies__grid">
        {displayedMovies?.map(movie => (
          <MoviesCard
            key={movie.id}
            movie={movie}
            saved={props.saved}
            onMovieSave={props.onMovieSave}
            onDeleteMovie={props.onDeleteMovie}
          />

        ))}
      </ul>
      <button className={props.saved ? 'movies__button-more movies__button-more_invisible' :
        `movies__button-more ${props.movies?.length === displayedMovies?.length ? 'movies__button-more_invisible' : ''}`}
              onClick={handleMoviesIncrease} >Еще</button>
    </section>
  )
}
