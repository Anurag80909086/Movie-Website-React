import React from "react";
import "./EpisodeCard.css";
import no_episode_img from "./no-episode-img.jpg";
import { posterUrl, convertRuntime } from "../../api/apiConfig";

const EpisodeCard = ({ allEpisodes }) => {
  return (
    <div className="episodeCard">
      <img
        src={posterUrl + allEpisodes.still_path}
        alt="episodeImg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = no_episode_img;
        }}
      />
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <span style={{ color: "orange" }}>
          Epi : {allEpisodes.episode_number}
        </span>
        <span style={{ color: "yellow" }}>
          Dura :{" "}
          {allEpisodes.runtime === null
            ? "Unknown"
            : convertRuntime(allEpisodes.runtime)}
        </span>
      </div>
      <span>{allEpisodes.name}</span>
    </div>
  );
};

export default EpisodeCard;
