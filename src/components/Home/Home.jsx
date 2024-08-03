import React, { useState } from "react";
import Header from "../Header/Header";
import { Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PlayingArea from "../Playing_area/Playing_area";
import Error from "../nav_components/Error";
import {
  Movies,
  TvShows,
  Trending,
  LatestMovies,
  SearchResult,
  Horror,
  ScienceFiction,
  Thriller,
  Romance,
  Crime,
  Animation,
} from "../nav_components/NavComponents";
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
        <Route path="/horror/:type" element={<Horror />} />
        <Route path="/science_fiction/:type" element={<ScienceFiction />} />
        <Route path="/thriller/:type" element={<Thriller />} />
        <Route path="/romance/:type" element={<Romance />} />
        <Route path="/crime/:type" element={<Crime />} />
        <Route path="/animation/:type" element={<Animation />} />
        <Route path="/search" element={<SearchResult search={searchData} />} />
        <Route path="/:movie" element={<PlayingArea />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default Home;
