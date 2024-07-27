import React, { useState, useEffect } from "react";
import "../css/Movie_play.css";
import ReactLoading from "react-loading";
import MovieDetail from "./MovieDetail";
import SeriesDetail from "./SeriesDetail";
import { options, baseUrl } from "../api/apiConfig";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function Movie_play() {
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const movieId = useParams();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  function goBack() {
    navigate(-1);
  }

  function separateID(str) {
    const numberMatch = str.match(/\d+/);
    const letterMatch = str.match(/[A-Za-z]+/);
    const movieID = numberMatch ? numberMatch[0] : null;
    const movieType = letterMatch ? letterMatch[0] : null;
    return { movieID, movieType };
  }

  const { movieID, movieType } = separateID(movieId.movie);

  const getMovieData = async (type) => {
    try {
      const url = `${baseUrl}/${type}/${movieID}?language=en-US`;
      const response = await fetch(url, options);
      const detailData = await response.json();
      console.log("More Details", detailData);
      setMovie(detailData);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    if (movieType === "S") {
      getMovieData("tv");
    } else if (movieType === "M") {
      getMovieData("movie");
    }
  }, [movieId, movieType]);

  return (
    <div className="movieplay_container flex">
      <div className="backBtn" onClick={goBack}>
        <i className="fa-solid fa-arrow-left-long"></i>
      </div>
      {movie ? (
        <>
          {movieType === "M" ? (
            <MovieDetail props={movie} />
          ) : (
            <SeriesDetail props={movie} />
          )}
        </>
      ) : (
        <ReactLoading
          type={"spinningBubbles"}
          color={"#9b59b6"}
          height={80}
          width={80}
        />
      )}
    </div>
  );
}

export default Movie_play;
