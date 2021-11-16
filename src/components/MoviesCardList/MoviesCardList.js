import React from "react";
import "./MoviesCardList.css";
import {MoviesCard} from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import {ADDING_CARDS, NUMBER_OF_CARD, WINDOW_WIDTH} from "../../utils/constants";

export function MoviesCardList(props){

  React.useEffect(() => {
    window.addEventListener('resize', handleScreenWidth);
  }, []);

  const [initialCardsCurrent, setInitialCardsCurrent] = React.useState(() => {
    const windowSize = window.innerWidth;
    if(windowSize < WINDOW_WIDTH.SMALL) {
      return NUMBER_OF_CARD.MIN
    } else if(windowSize <= WINDOW_WIDTH.MEDIUM) {
      return NUMBER_OF_CARD.MEAN
    } else if(windowSize < WINDOW_WIDTH.LARGE) {
      return NUMBER_OF_CARD.MAX }
    else if(windowSize > WINDOW_WIDTH.LARGE) {
      return NUMBER_OF_CARD.MAX
    }
  } );
  const [moreCards] = React.useState(() => {
    const windowSize = window.innerWidth;
     if(windowSize <= WINDOW_WIDTH.MEDIUM) {
      return ADDING_CARDS.MIN
    } else if(windowSize >= WINDOW_WIDTH.MEDIUM + 1) {
      return ADDING_CARDS.MAX
    }
  });

  function handleScreenWidth () {
    const windowSize = window.innerWidth;
    if(windowSize < WINDOW_WIDTH.SMALL) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MIN)
    } else if(windowSize <= WINDOW_WIDTH.MEDIUM) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MEAN)
    } else if(windowSize < WINDOW_WIDTH.LARGE) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MAX)
    } else if(windowSize > WINDOW_WIDTH.LARGE) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MAX)
    }
  }

  const displayMovies = props.movies?.slice(0, initialCardsCurrent);

  function handleMoviesIncrease() {
    setInitialCardsCurrent(prevState => {return prevState + moreCards});
  }

  return(
    <section className="movies">
      {props.isLoading && <Preloader />}
      {props.notFoundMovies && <span>Ничего не найдено</span>}

      <ul className="movies__grid">
        {displayMovies?.map(movie => (
          <MoviesCard
            key={props.saved ? movie._id : movie.id}
            movie={movie}
            saved={props.saved}
            onMovieSave={props.onMovieSave}
            onDeleteMovie={props.onDeleteMovie}
          />

        ))}
      </ul>
      <button className={props.saved ? 'movies__button-more movies__button-more_invisible' :
        `movies__button-more ${props.movies?.length === displayMovies?.length ? 'movies__button-more_invisible' : ''}`}
              onClick={handleMoviesIncrease} >Еще</button>
    </section>
  )
}
