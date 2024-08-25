import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { posterUrl } from "../../../../api/apiConfig";
import SeasonCard from "../../../Card/SeasonCard";
import DetailsWrapper from "./DetailsWrapper";
const SeasonInfo = (prop) => {
  const [showWrapper, setShowWrapper] = useState(false);
  const [seasons, setSeasons] = useState([]);
  const [seasonNum, setSeasonNum] = useState(null);

  const updateSeason = (seasons) => {
    const filteredSeasons = seasons.filter(
      (season) => season.name !== "Specials"
    );
    setSeasons(filteredSeasons);
  };

  const openSeasonDetails = (sNum) => {
    setSeasonNum(sNum);
    setShowWrapper(true);
  };

  useEffect(() => {
    updateSeason(prop.seasonData);
  }, [prop.seasonData]);

  return (
    <div className="season_info" id={prop.class}>
      <RxCross2 className="closeBtn" onClick={prop.closeShow} />
      <h5>
        Seasons
        <span style={{ color: "orange", marginLeft: "10px" }}>
          {seasons.length}
        </span>
      </h5>
      <div className="seasons">
        <div
          className="wrapperSeason"
          id={showWrapper ? "wrapperSeasonScroll" : ""}
        >
          {seasons.length > 0
            ? seasons.map((elem) => (
                <SeasonCard
                  url={posterUrl + elem.poster_path}
                  name={elem.name}
                  release_date={elem.air_date}
                  sNo={elem.season_number}
                  key={elem.id}
                  showDetails={() => openSeasonDetails(elem.season_number)}
                />
              ))
            : "Loading..."}
        </div>
        {showWrapper && seasonNum && (
          <DetailsWrapper
            seasonNum={seasonNum}
            seriesId={prop.seriesId}
            seriesName={prop.seriesName}
            key={seasonNum}
          />
        )}
      </div>
    </div>
  );
};

export default SeasonInfo;
