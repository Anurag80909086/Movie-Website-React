import React from "react";
import RecommendSection from "./RecommendSection/Recommend_section";
import { useParams } from "react-router-dom";
import {
  popularMovie,
  popularSeries,
  topRatedMovie,
  topRatedSeries,
} from "../../../api/apiConfig";
function Recomendation_area() {
  const page = 1;
  const baseUrl = "https://api.themoviedb.org/3";
  const rawData = useParams();
  const Id = rawData.movie.match(/\d+/)[0];
  let type = rawData.movie.match(/[A-Za-z]+/);

  const similarMovie = {
    title: "Similar Movies",
    url: `${baseUrl}/movie/${Id}/similar?language=en-US&page=${page}`,
  };
  const similarSeries = {
    title: "Similar Series",
    url: `${baseUrl}/tv/${Id}/similar?language=en-US&page=${page}`,
  };
  const recommendedMovie = {
    title: "Recommended Movies",
    url: `${baseUrl}/movie/${Id}/recommendations?language=en-US&page=${page}`,
  };
  const recommendedSeries = {
    title: "Recommended Series",
    url: `${baseUrl}/tv/${Id}/recommendations?language=en-US&page=${page}`,
  };

  const similar = type[0] === "M" ? similarMovie : similarSeries;
  const popular = type[0] === "M" ? popularMovie : popularSeries;
  const topRated = type[0] === "M" ? topRatedMovie : topRatedSeries;
  const recommended = type[0] === "M" ? recommendedMovie : recommendedSeries;
  return (
    <>
      <RecommendSection title={similar.title} url={similar.url} />
      <RecommendSection title={recommended.title} url={recommended.url} />
      <RecommendSection title={popular.title} url={popular.url} />
      <RecommendSection title={topRated.title} url={topRated.url} />
    </>
  );
}

export default Recomendation_area;
