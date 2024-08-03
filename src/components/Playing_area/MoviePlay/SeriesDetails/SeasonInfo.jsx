import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { posterUrl } from "../../../../api/apiConfig";
import SeasonCard from "../../../Card/SeasonCard";
import DetailsWrapper from "./DetailsWrapper";
const SeasonInfo = (prop) => {
  const [showWrapper, setShowWrapper] = useState(false);
  const [seasons, setSeasons] = useState();
  const updateSeason = (seasons) => {
    const filterSeason = seasons.filter((season) => season.name !== "Specials");
    setSeasons(filterSeason);
  };
  function openSeasonDetails() {
    setShowWrapper(true);
  }
  useEffect(() => {
    updateSeason(prop.seasonData);
  }, []);
  return (
    <div className="season_info" id={prop.class}>
      <RxCross2 className="closeBtn" onClick={prop.closeShow} />
      <h5>
        Seasons
        <span style={{ color: "orange", marginLeft: "10px" }}>
          {prop.seasonData.length}
        </span>
      </h5>
      <div className="seasons">
        <div className="wrapperSeason">
          {seasons
            ? seasons.map((elem) => {
                return (
                  <SeasonCard
                    url={posterUrl + elem.poster_path}
                    name={elem.name}
                    release_date={elem.air_date}
                    key={elem.id}
                    showDetails={openSeasonDetails}
                  />
                );
              })
            : "Loading..."}
        </div>

        <DetailsWrapper
          wrapperDisplay={showWrapper ? "showWrapper" : "hideWrapper"}
          seriesId={prop.seriesId}
          seriesName={prop.seriesName}
        />
      </div>
    </div>
  );
};

export default SeasonInfo;
