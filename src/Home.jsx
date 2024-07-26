import React, { useState } from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import PlayingArea from "./components/Playing_area";
import Error from "./components/nav_components/Error";
import {
  Movies,
  TvShows,
  Trending,
  LatestMovies,
  SearchResult,
} from "./components/nav_components/NavComponents";
const Home = () => {
  const [searchData, setSearchData] = useState("");
  function checkSomething(search) {
    setSearchData(search);
  }

  return (
    <>
      <Header />
      <Navbar check={checkSomething} />
      <Routes>
        <Route path="/" element={<Trending />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/series" element={<TvShows />} />
        <Route path="/latest_movies" element={<LatestMovies />} />
        <Route path="search" element={<SearchResult search={searchData} />} />
        <Route path="*" element={<Error />} />
        <Route path="/:movie" element={<PlayingArea />} />
      </Routes>
    </>
  );
};

export default Home;
