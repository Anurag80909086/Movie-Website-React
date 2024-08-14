import React, { useEffect, useState } from "react";
import Card from "../../../Card/Card";
import ReactLoading from "react-loading";
import { options, posterUrl, checkMovieType } from "../../../../api/apiConfig";

const Recommend_section = ({ title, url }) => {
  const [movies, setMovies] = useState([]);

  const getMovieData = async () => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [url]);

  return (
    <div className="recommend-container">
      <h3>{title}</h3>
      <section className="scroll-container">
        {movies ? (
          movies.length > 0 ? (
            movies.map((movie) => (
              <Card
                key={movie.id}
                name={movie.original_title || movie.original_name}
                type={checkMovieType(movie)}
                year={movie.first_air_date || movie.release_date}
                language={
                  movie.original_language === "en"
                    ? "English"
                    : movie.original_language
                }
                imgSrc={`${posterUrl}${movie.poster_path}`}
                link={`/${movie.id}`}
              />
            ))
          ) : (
            "No Recomendation"
          )
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
};

export default Recommend_section;
