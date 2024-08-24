import React, { useEffect, useState } from "react";
import Card from "../../../Card/Card";
import ReactLoading from "react-loading";
import { options, posterUrl, checkMovieType } from "../../../../api/apiConfig";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";

const Recommend_section = ({ title, url }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const cssStyle = {
    width: "max-content",
    overflow: "scroll",
    borderRadius: "13px",
  };

  const getMovieData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movie data:", error);
      setError("Failed to load movie data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();
  }, [url]);

  return (
    <div className="recommend-container">
      <h3>{title}</h3>
      <section className="scroll-container">
        {loading ? (
          <ReactLoading
            type={"spinningBubbles"}
            color={"#9b59b6"}
            height={80}
            width={80}
          />
        ) : error ? (
          <p>{error}</p>
        ) : movies.length > 0 ? (
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode]}
            className="mySwiper"
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie.id} style={cssStyle}>
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
            ))}
          </Swiper>
        ) : (
          <p>No Recommendations</p>
        )}
      </section>
    </div>
  );
};

export default Recommend_section;
