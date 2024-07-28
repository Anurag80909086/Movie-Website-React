export const API_KEY = "d7842d4e2f0bce6affa5474474495a03";
export const baseUrl = "https://api.themoviedb.org/3";
export const posterUrl = "https://image.tmdb.org/t/p/original";
let page = 1;
export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNzg0MmQ0ZTJmMGJjZTZhZmZhNTQ3NDQ3NDQ5NWEwMyIsIm5iZiI6MTcyMTc2MTIwNS4wODg2MTEsInN1YiI6IjY2ODNlZDU2OWM5OGIzNGY5NjliMjVlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xQMsRmKfUZqbbAZ9DcAj-BiPgWfbDUaQWyBrVCiIyS4",
  },
};

export const fetchApi = async (prop) => {
  const url = `${baseUrl}${prop}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    return "Error Fetching Data!!";
  }
};

export const trendingAll = {
  title: "Trending",
  url: `${baseUrl}/trending/all/day?language=en-US&page=${page}&sort_by=popularity.desc`,
};
export const Movie = {
  title: "Movies",
  url: `${baseUrl}/discover/movie?include_adult=true&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc`,
};
export const Series = {
  title: "Series",
  url: `${baseUrl}/discover/tv?include_adult=true&include_null_first_air_dates=true&language=en-US&page=${page}&sort_by=popularity.desc`,
};

export const popularMovie = {
  title: "Popular Movies",
  url: `${baseUrl}/movie/popular?language=en-US&page=${page}`,
};
export const popularSeries = {
  title: "Popular Series",
  url: `${baseUrl}/tv/popular?language=en-US&page=${page}`,
};
export const topRatedMovie = {
  title: "Top Rated Movies",
  url: `${baseUrl}/movie/top_rated?language=en-US&page=${page}`,
};
export const topRatedSeries = {
  title: "Top Rated Series",
  url: `${baseUrl}/tv/top_rated?language=en-US&page=${page}`,
};

export const onTheAirSeries = {
  title: "On The Air Series",
  url: `${baseUrl}/tv/on_the_air?language=en-US&page=${page}`,
};

export const latestMovies = {
  title: "Latest Movies",
  url: `${baseUrl}/movie/now_playing?language=en-US&page=${page}`,
};
export const upcommingMovie = {
  title: "Upcomming Movie",
  url: `${baseUrl}/movie/upcoming?language=en-US&page=${page}`,
};

export const genre = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  Horror: 27,
  Mystery: 9648,
  Romance: 10749,
  ScienceFiction: 878,
  Thriller: 53,
  War: 10752,
  Western: 37,
  Kids: 10762,
};
// functions to use

export const checkMovieType = (movie) => {
  if (movie.type === "tv") {
    return "Series";
  } else if (movie.type === "movie") {
    return "Movie";
  } else if (movie.original_title) {
    return "Movie";
  } else if (movie.original_name) {
    return "Series";
  } else {
    return "Unknown";
  }
};

export const convertRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const trailerKey = (props) => {
  const trailer = props.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailer;
};

export const extractAllYoutubeVideos = (props) => {
  return props.results
    .filter((video) => video.site === "YouTube" && video.official)
    .slice(0, 6)
    .map((video) => ({
      name: video.name,
      key: video.key,
      site: video.site,
      type: video.type,
      published_at: video.published_at,
    }));
};
export const getTopActingLeads = (castData) => {
  const filteredCast = castData.cast
    .filter(
      (member) =>
        member.known_for_department === "Acting" &&
        member.order >= 0 &&
        member.order <= 20
    )
    .sort((a, b) => a.order - b.order);

  return filteredCast;
};

export const getFilteredImages = (imagesData) => {
  const filteredImages = imagesData.backdrops
    .filter((image) => image.vote_count >= 0 && image.vote_count <= 20)
    .sort((a, b) => a.vote_count - b.vote_count)
    .slice(0, 20)
    .map((image) => image.file_path);

  return filteredImages;
};
