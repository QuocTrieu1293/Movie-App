export const accessToken = import.meta.env.MOVIE_APP_API_ACCESS_TOKEN;
export const imageBaseURL = "https://image.tmdb.org/t/p";
export const imageSize = {
  backdrop: {
    w300: "w300",
    w780: "w780",
    w1280: "w1280",
    original: "original"
  },

  poster: {
    w92: "w92",
    w154: "w154",
    w185: "w185",
    w300: "w300",
    w300_h450: "w300_and_h450_bestv2",
    w342: "w342",
    w500: "w500",
    w780: "w780",
    original: "original"
  },

  profile: {
    w45: "w45",
    w138: "w138_and_h175_face",
    w185: "w185",
    h632: "h632",
    origin: "original"
  },

  logo: {
    h30: "h30",
  }
}

export const formatDate = (dateStr) => {
  if (!dateStr)
    return "00-00-0000";
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
}

export const formatMediaDuration = (duration = 0) => `${~~(duration / 60)}h ${duration % 60}m`

export const getDisplayName = (code, type = "language") => {
  return new Intl.DisplayNames(["en"], { type }).of(code);
}

export const formatNumber = (number, style = "decimal") => {
  return new Intl.NumberFormat("en-US", { style, currency: "USD" }).format(number);
}

export const getImageURL = (image_path, size = "original") => {
  if (!image_path)
    return undefined;
  return `${imageBaseURL}/${size}${image_path}`;
}

export const GETRequestOption = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

export const TRENDING_TABS = [
  {
    id: "all",
    label: "All",
    url: "https://api.themoviedb.org/3/trending/all/day"
  },
  {
    id: "movie",
    label: "Movie",
    url: "https://api.themoviedb.org/3/trending/movie/day"
  },
  {
    id: "tv",
    label: "TV Show",
    url: "https://api.themoviedb.org/3/trending/tv/day"
  }
];

export const TOP_RATED_TABS = [
  {
    id: "movie",
    label: "Movie",
    url: "https://api.themoviedb.org/3/movie/top_rated"
  },
  {
    id: "tv",
    label: "TV Show",
    url: "https://api.themoviedb.org/3/tv/top_rated"
  }
]