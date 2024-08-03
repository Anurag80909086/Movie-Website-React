import React from "react";
import "./EpisodeCard.css";
import { posterUrl } from "../../api/apiConfig";
const EpisodeCard = ({ allEpisodes }) => {
  return (
    <div className="episodeCard">
      <img src={posterUrl + allEpisodes.still_path} alt="episodeImg" />
      <span
        style={{ color: "orange" }}
      >{`Episode : ${allEpisodes.episode_number}`}</span>
      <span>{allEpisodes.name}</span>
    </div>
  );
};

export default EpisodeCard;
