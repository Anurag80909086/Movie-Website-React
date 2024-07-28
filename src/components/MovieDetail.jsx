import React, { useEffect, useState } from "react";
import {
  posterUrl,
  convertRuntime,
  baseUrl,
  options,
  trailerKey,
  extractAllYoutubeVideos,
  getTopActingLeads,
  getFilteredImages,
} from "../api/apiConfig";
import ReactLoading from "react-loading";

const MovieDetail = ({ props }) => {
  const [imageKey, setImageKey] = useState(Date.now());
  const [showPlay, setShowPlay] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [trailer, setTrailer] = useState();
  const [videos, setVideos] = useState();
  const [images, setImages] = useState();
  const [casts, setCasts] = useState();

  useEffect(() => {
    setImageKey(Date.now());
    hideTrailerPlay();
  }, [props]);

  const hideMoreDetails = () => {
    setShowDetails(false);
  };

  const showMoreDetails = () => {
    setShowDetails(true);
    hideTrailerPlay();
  };
  const hideTrailerPlay = () => {
    setShowPlay(false);
    setTrailer();
  };

  const showTrailerPlay = () => {
    setShowPlay(true);
    hideMoreDetails();
  };

  const getAllVideos = async () => {
    try {
      const url = `${baseUrl}/movie/${props.id}/videos?language=en-US`;
      const response = await fetch(url, options);
      const allVideos = await response.json();
      const filterVideos = extractAllYoutubeVideos(allVideos);
      setVideos(filterVideos);
      console.log("All Movie Videos", allVideos.results);
      setTrailer(trailerKey(allVideos));
    } catch (error) {
      console.log("Error fetching trailer video:", error);
    }
  };
  const getAllPhotos = async () => {
    try {
      setImages("");
      const url = `${baseUrl}/movie/${props.id}/images`;
      const response = await fetch(url, options);
      const allImages = await response.json();
      const filteredImages = getFilteredImages(allImages);
      setImages(filteredImages);
      console.log("All movie Images", allImages);
    } catch (error) {
      console.log("Error fetching Images", error);
    }
  };

  const getAllCasts = async () => {
    try {
      const url = `${baseUrl}/movie/${props.id}/credits?language=en-US`;
      const response = await fetch(url, options);
      const allCasts = await response.json();
      const topActing = getTopActingLeads(allCasts);
      setCasts(topActing);
      console.log("All Casts", topActing);
    } catch (error) {
      console.log("Error Getting Casts", error);
    }
  };

  useEffect(() => {
    if (showPlay) {
      getAllVideos();
    }
  }, [showPlay]);
  useEffect(() => {
    if (showDetails) {
      getAllVideos();
      getAllPhotos();
      getAllCasts();
    }
  }, [showDetails]);

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
            <button
              type="button"
              className="btn btn-danger"
              onClick={showMoreDetails}
            >
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
          {trailer ? (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`}
              title={trailer.name}
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
      <div
        id="moreDetailsContainer"
        className={showDetails ? "showMoreDetails" : "hideMoreDetails"}
      >
        <i
          className="fa-solid fa-x"
          id="crossIcon"
          onClick={hideMoreDetails}
        ></i>
        {props && images && videos && casts ? (
          <>
            <div className="deepDetailsContainer">
              <div className="photoContainer">
                <img src={posterUrl + props.poster_path} alt="Movie_Images" />
              </div>
              <div className="detailsContainer">
                <h3>{props.title}</h3>
                <div className="movieGenere">
                  {props.genres.map((genre) => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td className="dataTitle">Status</td>
                      <td>:</td>
                      <td className="dataResult">{props.status}</td>
                    </tr>
                    <tr>
                      <td className="dataTitle">Budget</td>
                      <td>:</td>
                      <td className="dataResult">{`$${props.budget}`}</td>
                    </tr>
                    <tr>
                      <td className="dataTitle">Revenue</td>
                      <td>:</td>
                      <td className="dataResult">{`$${props.revenue}`}</td>
                    </tr>
                    <tr>
                      <td className="dataTitle">Spoken Languages</td>
                      <td>:</td>
                      <td className="dataResult">
                        {props.spoken_languages.map((elem) => (
                          <span key={elem.english_name}>
                            {elem.english_name}
                          </span>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td className="dataTitle">Total Votes</td>
                      <td>:</td>
                      <td className="dataResult">{props.vote_count}</td>
                    </tr>
                    <tr>
                      <td className="dataTitle">IMDB ID</td>
                      <td>:</td>

                      <td className="dataResult">{props.imdb_id}</td>
                    </tr>
                    <tr>
                      <td className="dataTitle">Tagline</td>
                      <td>:</td>
                      <td className="dataResult">{props.tagline}</td>
                    </tr>
                    <tr>
                      <td className="dataTitle">Production Companies</td>
                      <td>:</td>
                      <td className="dataResult productionCom">
                        {props.production_companies.map((elem) => {
                          return <span key={elem.name}>{elem.name}</span>;
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="castContainer">
              <span className="detailsTitle">Casts</span>
              <div className="cardWrapper">
                {casts
                  ? casts.map((elem) => {
                      return (
                        <div className="castCard" key={elem.id}>
                          <img
                            src={posterUrl + elem.profile_path}
                            alt="Actor_image"
                          />
                          <span>{elem.original_name}</span>
                        </div>
                      );
                    })
                  : "Loading ..."}
              </div>
            </div>
            <div className="imagesContainer">
              <span className="detailsTitle">Images</span>
              <div className="imageWrapper">
                {casts
                  ? images.map((elem) => {
                      return <img src={posterUrl + elem} alt="movie_images" />;
                    })
                  : "Loading ..."}
              </div>
            </div>
            <div className="videosContainer">
              <span className="detailsTitle">Videos</span>
              <div className="videosWrapper">
                {videos ? (
                  videos.map((elem) => {
                    return (
                      <iframe
                        src={`https://www.youtube.com/embed/${elem.key}?rel=0&modestbranding=1`}
                        title={elem.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    );
                  })
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
        ) : (
          <ReactLoading
            type={"spinningBubbles"}
            color={"#9b59b6"}
            height={80}
            width={80}
          />
        )}
      </div>
    </>
  );
};

export default MovieDetail;
