import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import ReactLoading from "react-loading";
import {
  options,
  posterUrl,
  checkMovieType,
  getLanguageName,
} from "../../api/apiConfig";
function CategoryRender(props) {
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const getMovieData = async () => {
    const url = props.url;
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(props.title, data);
      setPage(data.page);
      setMovie(data.results);
      setTotalPage(data.total_pages);
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    getMovieData();
  }, [props.url]);

  return (
    <div className="working_area">
      <center className="cards-title">{props.title}</center>
      <div className="card-container">
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
                language={getLanguageName(movie.original_language)}
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
      </div>
      <div className="pageNumWrapper flex">
        <span
          className="backBtn"
          onClick={() => {
            props.previousPage();
          }}
        >
          <i className="fa-solid fa-arrow-left" title="previous page"></i>
        </span>
        <span className="pageNum">{`${page}`}</span>
        <span
          className="nextBtn"
          onClick={() => {
            props.nextPage(totalPage);
          }}
        >
          <i className="fa-solid fa-arrow-right" title="next page"></i>
        </span>
      </div>
    </div>
  );
}

export default CategoryRender;
