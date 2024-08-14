import "./SeasonCard.css";
import no_photo_card from "./no-photo-card.jpg";
const SeasonCard = (props) => {
  return (
    <div
      className="SeasonCard"
      onClick={() => {
        props.showDetails(props.sNo);
      }}
    >
      <img
        src={props.url}
        alt="SeasonCard"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = no_photo_card;
        }}
      />
      <div className="seasonNo">{props.name}</div>
      <div className="seasonNo">{props.release_date}</div>
    </div>
  );
};

export default SeasonCard;
