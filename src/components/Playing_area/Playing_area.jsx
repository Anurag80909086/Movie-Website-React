import MoviePlay from "./MoviePlay/Movie_play";
import RecomendationArea from "./RecomendationArea/Recomendation_area";
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
