import MoviePlay from "./Movie_play";
import RecomendationArea from "./Recomendation_area";
function Playing_area() {
  return (
    <div className="playing_area">
      <MoviePlay />
      <br />
      <RecomendationArea />
    </div>
  );
}

export default Playing_area;
