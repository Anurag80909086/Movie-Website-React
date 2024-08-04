import React from "react";
import "./EpisodeCard.css";
import { posterUrl, convertRuntime } from "../../api/apiConfig";
const EpisodeCard = ({ allEpisodes }) => {
  return (
    <div className="episodeCard">
      <img src={posterUrl + allEpisodes.still_path} alt="episodeImg" />
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <span style={{ color: "orange" }}>
          Episode : {allEpisodes.episode_number}
        </span>
        <span style={{ color: "yellow" }}>
          Duration : {convertRuntime(allEpisodes.runtime)}
        </span>
      </div>
      <span>{allEpisodes.name}</span>
    </div>
  );
};

export default EpisodeCard;
