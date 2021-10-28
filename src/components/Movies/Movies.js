import React from "react";
import './Movies.css';
import { Header } from "../Header/Header";
import { SearchForm } from "../SearchForm/SearchForm";
import { Footer } from "../Footer/Footer";

export function Movies() {
  return(
    <>
      <Header />
      <SearchForm />
      {/*<Movies />*/}
      <Footer />
    </>

  )
}
