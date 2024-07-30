export const accessToken = import.meta.env.MOVIE_APP_API_ACCESS_TOKEN;
export const imageBaseURL = "http://image.tmdb.org/t/p";
export const imageSize = {
  backdrop: {
    w300: "w300",
    w780: "w780",
    w1280: "w1280",
    original: "original"
  },
}

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth()).padStart(2, '0');
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
} 