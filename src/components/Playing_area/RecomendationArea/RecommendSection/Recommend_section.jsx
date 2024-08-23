import React, { useEffect, useState } from "react";
import Card from "../../../Card/Card";
import ReactLoading from "react-loading";
import { options, posterUrl, checkMovieType } from "../../../../api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Recommend_section = ({ title, url }) => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  const getMovieData = async () => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [url]);

  return (
    <div className="recommend-container">
      <h3>{title}</h3>
      <section className="scroll-container">
        <Swiper
          slidesPerView={4}
          spaceBetween={0}
          navigation
          className="mySwiper"
        >
          {error ? (
            <p>Error loading recommendations</p>
          ) : !movies ? (
            <ReactLoading
              type={"spinningBubbles"}
              color={"#9b59b6"}
              height={80}
              width={80}
            />
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <SwiperSlide key={movie.id}>
                <Card
                  name={movie.original_title || movie.original_name}
                  type={checkMovieType(movie)}
                  year={movie.first_air_date || movie.release_date || "Unknown"}
                  language={
                    movie.original_language === "en"
                      ? "English"
                      : movie.original_language
                  }
                  imgSrc={
                    movie.poster_path
                      ? `${posterUrl}${movie.poster_path}`
                      : "path_to_placeholder_image"
                  }
                  link={`/${movie.id}`}
                />
              </SwiperSlide>
            ))
          ) : (
            <p>No Recommendations</p>
          )}
        </Swiper>
      </section>
    </div>
  );
};

export default Recommend_section;
