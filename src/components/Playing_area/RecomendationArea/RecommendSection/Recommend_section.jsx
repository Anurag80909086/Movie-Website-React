import React, { useEffect, useState } from "react";
import Card from "../../../Card/Card";
import ReactLoading from "react-loading";
import { options, posterUrl, checkMovieType } from "../../../../api/apiConfig";

function Recommend_section(props) {
  const [movie, setMovie] = useState();
  const getMovieData = async () => {
    const url = props.url;
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(props.title, data.results);
      setMovie(data.results);
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    getMovieData();
  }, [props.url]);
  return (
    <div className="recommend-container">
      <h3>{props.title}</h3>
      <section className="scroll-container">
        {movie ? (
          movie.map((movie, index) => {
            return (
              <Card
                key={movie.id}
                name={
                  movie.original_title
                    ? movie.original_title
                    : movie.original_name
                }
                type={checkMovieType(movie)}
                year={
                  movie.first_air_date
                    ? movie.first_air_date
                    : movie.release_date
                }
                language={
                  movie.original_language === "en"
                    ? "English"
                    : movie.original_language
                }
                imgSrc={`${posterUrl}${movie.poster_path}`}
                link={`/${movie.id}`}
              />
            );
          })
        ) : (
          <ReactLoading
            type={"spinningBubbles"}
            color={"#9b59b6"}
            height={80}
            width={80}
          />
        )}
      </section>
    </div>
  );
}

export default Recommend_section;
