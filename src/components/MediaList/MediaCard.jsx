import { formatDate, getImageURL, imageSize } from "../../../utils";
import CircularProgressBar from "./CircularProgressBar";

const MediaCard = ({ data }) => {
  const {
    poster_path,
    vote_average,
    vote_count,
    name,
    original_name,
    title,
    original_title,
    release_date,
    first_air_date,
    media_type,
  } = data;

  return (
    <div className="flex cursor-pointer flex-col rounded-[9px] border border-slate-700">
      <div className="relative aspect-[342/513] rounded-b-2xl rounded-t-lg bg-gradient-to-b from-[#8e0e00] to-[#1f1c18]">
        <img
          src={getImageURL(poster_path, imageSize.poster.w342)}
          alt=""
          className="rounded-b-2xl rounded-t-lg"
        />
        <span
          className={`absolute ${media_type === "tv" || original_name ? "block" : "hidden"} right-0.5 top-0.5 rounded-md bg-black/95 px-2 py-1 text-sm font-semibold text-white shadow-lg`}
        >
          TV Show
        </span>
      </div>
      <div className="relative -top-5 flex flex-1 flex-col px-2">
        <div className="flex items-end justify-between">
          <CircularProgressBar percent={Math.round(vote_average * 10)} />
          <span className="text-[13px] text-slate-400">{`${vote_count} votes`}</span>
        </div>
        <p className="mt-2 flex-1 font-bold transition-colors duration-200 hover:text-netflix_red">
          {name || original_name || title || original_title}
        </p>
        <p className="mt-1 text-sm text-slate-400">
          {formatDate(release_date || first_air_date)}
        </p>
      </div>
    </div>
  );
};
export default MediaCard;