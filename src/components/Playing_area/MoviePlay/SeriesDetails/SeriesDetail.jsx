import React, { useState, useEffect } from "react";
import { posterUrl, fetchApi, trailerKey } from "../../../../api/apiConfig";
import "./SeriesDetails.css";
import SeasonInfo from "./SeasonInfo";

const MovieDetail = ({ props }) => {
  const [imageKey, setImageKey] = useState(Date.now());
  const [showSeason, setShowSeason] = useState(false);
  const [trailer, setTrailer] = useState();
  const updateShow = () => setShowSeason((prev) => !prev);
  const closeSeason = () => setShowSeason(false);

  function getTrailer() {
    const url = `/tv/${props.id}/videos?language=en-US`;
    fetchApi(url).then((res) => {
      // console.log("Trailer",res );
      setTrailer(trailerKey(res));
    });
  }
  getTrailer();
  useEffect(() => {
    setImageKey(Date.now());
  }, [props.backdrop_path, props.poster_path]);

  return (
    <>
      <img
        key={imageKey}
        src={posterUrl + props.backdrop_path}
        className="poster_img"
        alt="movie_poster"
      />
      <div className="bigCard_wrapper flex">
        <div className="cDetails">
          <div className="movieName">{props.name}</div>
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
            <button
              type="button"
              className="btn btn-danger"
              onClick={updateShow}
            >
              Watch Now
            </button>
            <button type="button" className="btn btn-outline-light">
              Watch Trailer
            </button>
          </div>
        </div>
        <div className="bigCard" onClick={updateShow}>
          <img
            key={imageKey}
            src={posterUrl + props.poster_path}
            alt="movie_image"
          />
        </div>

        {showSeason && (
          <SeasonInfo
            class={showSeason ? "season_show" : "season_hide"}
            seasonData={props.seasons}
            seriesId={props.id}
            seriesName={props.name}
            closeShow={closeSeason}
          />
        )}
      </div>
    </>
  );
};

export default MovieDetail;
