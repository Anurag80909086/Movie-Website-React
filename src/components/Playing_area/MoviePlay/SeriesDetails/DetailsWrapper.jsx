import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import EpisodeCard from "../../../Card/EpisodeCard";
import {
  posterUrl,
  fetchApi,
  getSeasonVideos,
  getSeasonCast,
} from "../../../../api/apiConfig";

const DetailsWrapper = ({ seriesId, seasonNum, seriesName }) => {
  const [seasonData, setSeasonData] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [videos, setVideos] = useState([]);
  const [casts, setCasts] = useState([]);

  const getSeasonData = () => {
    const url = `/tv/${seriesId}/season/${seasonNum}`;
    fetchApi(url)
      .then((res) => {
        setSeasonData(res);
        setEpisodes(res.episodes || []);
      })
      .catch((error) => console.error("Error fetching season data:", error));
  };

  const getSeasonClips = () => {
    const url = `/tv/${seriesId}/season/${seasonNum}/videos`;
    fetchApi(url)
      .then((res) => {
        const allVideos = getSeasonVideos(res.results);
        setVideos(allVideos.allVideos || []);
        setTrailer(allVideos.trailer || []);
      })
      .catch((error) => console.error("Error fetching season videos:", error));
  };

  const getSeasonCredits = () => {
    const url = `/tv/${seriesId}/season/${seasonNum}/credits`;
    fetchApi(url)
      .then((res) => {
        setCasts(getSeasonCast(res.cast) || []);
      })
      .catch((error) => console.error("Error fetching season credits:", error));
  };

  useEffect(() => {
    getSeasonData();
    getSeasonClips();
    getSeasonCredits();
  }, [seriesId, seasonNum]);

  return (
    <div className="detailsWrapper">
      {seasonData ? (
        <>
          <div className="overviewSection">
            <div className="posterContainer">
              <img
                src={posterUrl + seasonData.poster_path}
                alt="Season Poster"
              />
            </div>
            <div className="detailsContainer">
              <p>{seriesName}</p>
              <h3>{seasonData.name}</h3>
              <table>
                <tbody>
                  <tr>
                    <td className="dataTitle">Release Date</td>
                    <td>:</td>
                    <td className="dataResult">{seasonData.air_date}</td>
                  </tr>
                  <tr>
                    <td className="dataTitle">Rating</td>
                    <td>:</td>
                    <td className="dataResult">{`${seasonData.vote_average} / 10`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="episodesSection">
            <span className="detailsTitle">Episodes</span>
            <div className="episodeWrapper">
              {episodes.length > 0
                ? episodes.map((elem) => (
                    <EpisodeCard allEpisodes={elem} key={elem.id} />
                  ))
                : "Loading..."}
            </div>
          </div>

          <div className="castContainer">
            <span className="detailsTitle">Casts</span>
            <div className="cardWrapper">
              {casts.length > 0
                ? casts.map((elem) => (
                    <div className="castCard" key={elem.profile_path}>
                      <img
                        src={posterUrl + elem.profile_path}
                        alt="Actor_image"
                      />
                      <span>{elem.original_name}</span>
                    </div>
                  ))
                : "Loading ..."}
            </div>
          </div>

          <div className="trailerContainer">
            <span className="detailsTitle">Trailer</span>
            <div className="videosWrapper">
              {trailer.length > 0 ? (
                trailer.map((elem) => (
                  <iframe
                    src={`https://www.youtube.com/embed/${elem}?rel=0&modestbranding=1`}
                    title={elem.name}
                    key={elem}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                ))
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

          <div className="videosContainer">
            <span className="detailsTitle">Videos</span>
            <div className="videosWrapper">
              {videos.length > 0 ? (
                videos.map((elem) => (
                  <iframe
                    src={`https://www.youtube.com/embed/${elem}?rel=0&modestbranding=1`}
                    key={elem}
                    title={elem.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                ))
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
  );
};

export default DetailsWrapper;
