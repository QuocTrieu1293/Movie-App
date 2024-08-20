import { formatDate, getImageURL, imageSize } from "@utils";
import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/ImageComponent";
import { Link } from "react-router-dom";

const MediaCard = ({ data }) => {
  const {
    id,
    poster_path,
    vote_average,
    vote_count,
    name,
    original_name,
    title,
    original_title,
    release_date,
    first_air_date,
  } = data;

  return (
    <div className="flex h-full w-full flex-col rounded-[9px] border border-slate-700">
      <Link to={`/${title || original_title ? "movie" : "tv"}/${id}`}>
        <div className="relative aspect-[2/3] rounded-b-2xl rounded-t-lg">
          <ImageComponent
            src={getImageURL(poster_path, imageSize.poster.w342)}
            alt={`${title || original_name || name || original_name} poster`}
            className="rounded-b-2xl rounded-t-lg"
            loading="lazy"
          />
          <span
            className={`absolute ${title || original_title ? "hidden" : "block"} right-0.5 top-0.5 rounded-md bg-black/95 px-2 py-1 text-sm font-semibold text-white shadow-lg`}
          >
            TV Show
          </span>
        </div>
      </Link>
      <div className="relative -top-5 flex flex-1 flex-col px-2">
        <div className="flex items-end justify-between">
          <CircularProgressBar
            percent={Math.round(vote_average * 10)}
            isRated={vote_count > 0}
          />
          <span className="text-[13px] text-slate-400">{`${vote_count} votes`}</span>
        </div>
        <p className="mt-2 font-bold">
          <Link
            to={`/${title || original_title ? "movie" : "tv"}/${id}`}
            className="transition-colors duration-200 hover:text-netflix_red"
          >
            {name || original_name || title || original_title}
          </Link>
        </p>
        <p className="mt-auto pt-1 text-sm text-slate-400">
          {/* mt-auto để đẩy flex item xuống cuối trong flex box */}
          {formatDate(release_date || first_air_date)}
        </p>
      </div>
    </div>
  );
};
export default MediaCard;
