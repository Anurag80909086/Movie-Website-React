import React, { useEffect, useState } from "react";
import { posterUrl, convertRuntime, baseUrl, options } from "../api/apiConfig";
import ReactLoading from "react-loading";

const MovieDetail = ({ props }) => {
  const [imageKey, setImageKey] = useState(Date.now());
  const [showPlay, setShowPlay] = useState(false);
  const [video, setVideo] = useState();

  useEffect(() => {
    setImageKey(Date.now());
    hideTrailerPlay();
  }, [props]);

  const hideTrailerPlay = () => {
    setShowPlay(false);
    setVideo();
  };

  const showTrailerPlay = () => {
    setShowPlay(true);
  };

  const getTrailerVideo = async () => {
    try {
      const url = `${baseUrl}/movie/${props.id}/videos?language=en-US`;
      const response = await fetch(url, options);
      const trailerData = await response.json();
      const trailer = trailerData.results.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      setVideo(trailer);
    } catch (error) {
      console.log("Error fetching trailer video:", error);
    }
  };

  useEffect(() => {
    if (showPlay) {
      getTrailerVideo();
    }
  }, [showPlay]);

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
          <div className="movieName">{props.title}</div>
          <div className="movieGenere">
            {props.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <div className="movieRelease flex">
            <i className="fa-solid fa-calendar-days"></i>
            <span>{props.release_date}</span>
          </div>
          <div className="movieDuration flex">
            <i className="fa-solid fa-stopwatch"></i>
            <span>{convertRuntime(props.runtime)}</span>
          </div>
          <div className="movieRating flex">
            <i className="fa-regular fa-star"></i>
            <span>
              {parseFloat(props.vote_average.toFixed(1))}/10
              <span style={{ color: "yellow", marginLeft: "10px" }}>
                Votes: {props.vote_count}
              </span>
            </span>
          </div>
          <div className="movieStory">{props.overview}</div>
          <div className="buttonSection flex">
            <button type="button" className="btn btn-danger">
              Watch Now
            </button>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={showTrailerPlay}
            >
              Watch Trailer
            </button>
          </div>
        </div>
        <div className="bigCard">
          <img
            key={imageKey}
            src={posterUrl + props.poster_path}
            alt="movie_image"
          />
        </div>
        <div
          id="trailerContainer"
          className={showPlay ? "showContainer" : "hideContainer"}
        >
          <i
            className="fa-solid fa-x"
            id="crossIcon"
            onClick={hideTrailerPlay}
          ></i>
          {video ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.key}?rel=0&modestbranding=1`}
              title={video.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          ) : (
            <ReactLoading
              type={"spinningBubbles"}
              color={"#9b59b6"}
              height={80}
              width={80}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
