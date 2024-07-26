import React from "react";
import CategoryRender from "./CategoryRender";
import { Movie, Series, trendingAll } from "../../api/apiConfig";

export const Movies = () => {
  return <CategoryRender title={Movie.title} url={Movie.url} />;
};

export const Tv_Shows = () => {
  return <CategoryRender title={Series.title} url={Tv_Shows.url} />;
};

export const Trending = () => {
  return <CategoryRender title={trendingAll.title} url={trendingAll.url} />;
};

export const SearchResult = (props) => {
  const searchUrl = `https://api.themoviedb.org/3/search/multi?query=${props.search}&include_adult=false&language=en-US&page=1`;
  return <CategoryRender title="Your search Results" url={searchUrl} />;
};
