import React from "react";
import CategoryRender from "./CategoryRender";
import { Movie, Series, trendingAll, latestMovies } from "../../api/apiConfig";
import { baseUrl, genre } from "../../api/apiConfig";
export const Movies = () => {
  return <CategoryRender title={Movie.title} url={Movie.url} />;
};

export const TvShows = () => {
  return <CategoryRender title={Series.title} url={Series.url} />;
};

export const Trending = () => {
  return <CategoryRender title={trendingAll.title} url={trendingAll.url} />;
};
export const LatestMovies = () => {
  return <CategoryRender title={latestMovies.title} url={latestMovies.url} />;
};

export const SearchResult = (props) => {
  const searchUrl = `${baseUrl}/search/multi?query=${props.search}&include_adult=false&language=en-US&page=1`;
  return <CategoryRender title="Your search Results" url={searchUrl} />;
};
export const Horror = () => {
  const genreUrl = `${baseUrl}/discover/movie?with_genres=${genre.Horror}`;
  return <CategoryRender title={"Horror Movies"} url={genreUrl} />;
};
export const ScienceFiction = () => {
  const genreUrl = `${baseUrl}/discover/movie?with_genres=${genre.ScienceFiction}`;
  return <CategoryRender title={"Sci-Fi Movies"} url={genreUrl} />;
};
export const Thriller = () => {
  const genreUrl = `${baseUrl}/discover/movie?with_genres=${genre.Thriller}`;
  return <CategoryRender title={"Thriller Movies"} url={genreUrl} />;
};
export const Romance = () => {
  const genreUrl = `${baseUrl}/discover/movie?with_genres=${genre.Romance}`;
  return <CategoryRender title={"Romance Movies"} url={genreUrl} />;
};
export const Crime = () => {
  const genreUrl = `${baseUrl}/discover/movie?with_genres=${genre.Crime}`;
  return <CategoryRender title={"Crime Movies"} url={genreUrl} />;
};
export const Animation = () => {
  const genreUrl = `${baseUrl}/discover/movie?with_genres=${genre.Animation}`;
  return <CategoryRender title={"Animation Movies"} url={genreUrl} />;
};
