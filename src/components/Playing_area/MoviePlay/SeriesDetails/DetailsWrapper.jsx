import React, { useState, useEffect } from "react";
import {
  posterUrl,
  fetchApi,
  getSeasonVideos,
  getSeasonCast,
} from "../../../../api/apiConfig";
import ReactLoading from "react-loading";
import EpisodeCard from "../../../Card/EpisodeCard";

const DetailsWrapper = (props) => {
  const [seasonData, setSeasonData] = useState();
  const [episodes, setEpisodes] = useState();
  const [trailer, setTrailer] = useState();
  const [videos, setVideos] = useState();
  const [casts, setCasts] = useState();
  const getSeasonData = () => {
    const url = `/tv/${props.seriesId}/season/${"1"}`;
    fetchApi(url).then((res) => {
      // console.log("Single season Data", res);
      setSeasonData(res);
      setEpisodes(res.episodes);
    });
  };

  const getSeasonClips = () => {
    const url = `/tv/${props.seriesId}/season/${"1"}/videos`;
    fetchApi(url).then((res) => {
      // console.log("Season Videos", res);
      const allVideos = getSeasonVideos(res.results);
      setVideos(allVideos.allVideos);
      setTrailer(allVideos.trailer);
    });
  };
  const getSeasonCredits = () => {
    const url = `/tv/${props.seriesId}/season/${"1"}/credits`;
    fetchApi(url).then((res) => {
      // console.log("Season Casts", res);
      setCasts(getSeasonCast(res.cast));
    });
  };
  useEffect(() => {
    getSeasonData();
    getSeasonClips();
    getSeasonCredits();
  }, [props.wrapperDisplay]);
  return (
    <div className="detailsWrapper" id={props.wrapperDisplay}>
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
              <h2>{props.seriesName}</h2>
              <h3 style={{ color: "orange" }}>{seasonData.name}</h3>
              <table>
                <tbody>
                  <tr>
                    <td className="dataTitle">Release Date</td>
                    <td>:</td>
                    <td className="dataResult">{seasonData.air_date}</td>
                  </tr>
                  <tr>
                    <td className="dataTitle">Total Votes</td>
                    <td>:</td>
                    <td className="dataResult">{props.vote_average}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <div className="episodesSection">
            <h3>Episodes</h3>
            <div className="episodeWrapper">
              {episodes
                ? episodes.map((elem) => {
                    return <EpisodeCard allEpisodes={elem} key={elem.id} />;
                  })
                : "Loading..."}
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

          <div className="trailerContainer">
            <span className="detailsTitle">Trailer</span>
            <div className="videosWrapper">
              {trailer ? (
                trailer.map((elem) => {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${elem}?rel=0&modestbranding=1`}
                      title={elem.name}
                      key={elem}
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

          <div className="videosContainer">
            <span className="detailsTitle">Videos</span>
            <div className="videosWrapper">
              {videos ? (
                videos.map((elem) => {
                  return (
                    <iframe
                      src={`https://www.youtube.com/embed/${elem}?rel=0&modestbranding=1`}
                      key={elem}
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
  );
};

export default DetailsWrapper;
