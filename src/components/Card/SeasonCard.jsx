import "./SeasonCard.css";
const SeasonCard = (props) => {
  return (
    <div
      className="SeasonCard"
      onClick={() => {
        props.showDetails(props.sNo);
      }}
    >
      <img src={props.url} alt="SeasonCard" />
      <div className="seasonNo">{props.name}</div>
      <div className="seasonNo">{props.release_date}</div>
    </div>
  );
};

export default SeasonCard;
