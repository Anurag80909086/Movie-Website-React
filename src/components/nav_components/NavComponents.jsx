import React, { useState, useEffect } from "react";
import CategoryRender from "./CategoryRender";
import { baseUrl, genre } from "../../api/apiConfig";

export const Trending = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Trending";
  const url = `${baseUrl}/trending/all/day?language=en-US&page=${page}&sort_by=popularity.desc`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const Movies = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Movies";
  const url = `${baseUrl}/discover/movie?include_adult=true&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const TvShows = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Series";
  const url = `${baseUrl}/discover/tv?include_adult=true&include_null_first_air_dates=true&language=en-US&page=${page}&sort_by=popularity.desc`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const LatestMovies = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Latest Movies";
  const url = `${baseUrl}/movie/now_playing?language=en-US&page=${page}`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const SearchResult = (props) => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Search Results";
  const url = `${baseUrl}/search/multi?query=${props.search}&include_adult=false&language=en-US&page=${page}`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const Horror = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Horror Movies";
  const url = `${baseUrl}/discover/movie?with_genres=${genre.Horror}&page=${page}`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const ScienceFiction = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Science Fiction Movies";
  const url = `${baseUrl}/discover/movie?with_genres=${genre.ScienceFiction}&page=${page}`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const Thriller = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Thriller Movies";
  const url = `${baseUrl}/discover/movie?with_genres=${genre.Thriller}&page=${page}`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const Romance = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Romantic Movies";
  const url = `${baseUrl}/discover/movie?with_genres=${genre.Romance}&page=${page}`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const Crime = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Crime Movies";
  const url = `${baseUrl}/discover/movie?with_genres=${genre.Crime}&page=${page}`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};

export const Animation = () => {
  const [page, setPages] = useState(1);
  const nextPage = (totalPages) => {
    if (page <= totalPages) {
      setPages(page + 1);
    }
  };
  const previousPage = (totalPages) => {
    if (page > 1) {
      setPages(page - 1);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);
  const title = "Animation Movies";
  const url = `${baseUrl}/discover/movie?with_genres=${genre.Animation}&page=${page}`;
  return (
    <CategoryRender
      title={title}
      url={url}
      nextPage={nextPage}
      previousPage={previousPage}
    />
  );
};
