import { Link } from "react-router-dom";
import "./Card.css";
function Card(props) {
  var type = props.type === "Movie" ? "M" : "S";
  return (
    <div className="movie_card">
      <img src={props.imgSrc} alt="movie_image" />
      <div className="movieInfo">
        <div className="movie_name">{props.name}</div>
        <div className="movie_year">{props.year}</div>
        <div className="movie_type">
          {props.type === "Movie" ? "Movie" : "Series"}
        </div>
        <div className="movie_language">{props.language}</div>

        <Link to={`${props.link}+${type}`}>
          <button type="submit" className="downloadBtn">
            Watch Now
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
