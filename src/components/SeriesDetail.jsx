import React from "react";
import { posterUrl } from "../api/apiConfig";
const MovieDetail = ({ props }) => {
  return (
    <>
      <img
        src={posterUrl + props.backdrop_path}
        className="poster_img"
        alt="movie_poster"
      />
      <div className="bigCard_wrapper flex">
        <div className="cDetails">
          <div className="movieName">{props.original_name} </div>
          <div className="movieGenere">
            {props.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <div className="movieRelease flex">
            <i className="fa-solid fa-calendar-days"></i>
            <span>{props.first_air_date}</span>
          </div>
          <div className="movieDuration flex">
            <span>{props.seasons.length}</span>
            <span>Seasons</span>
          </div>
          <div className="movieRating flex">
            <i className="fa-regular fa-star"></i>
            <span>
              {parseFloat(props.vote_average.toFixed(1))}/10
              {` (${props.vote_count})`}
            </span>
          </div>
          <div className="movieStory">{props.overview}</div>
          <div className="buttonSection flex">
            <button type="button" className="btn btn-danger">
              Watch Now
            </button>
            <button type="button" className="btn btn-outline-light">
              Watch Trailer
            </button>
          </div>
        </div>
        <div className="bigCard">
          <img src={posterUrl + props.poster_path} alt="movie_image" />
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
