import CircularProgressBar from "@components/CircularProgressBar";
import ImageComponent from "@components/ImageComponent";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, getImageURL, imageSize } from "@utils";
import { Link } from "react-router-dom";

const RelatedMediaCard = ({ data }) => {
  const {
    id,
    backdrop_path,
    title,
    original_title,
    name,
    original_name,
    first_air_date,
    media_type,
    vote_average,
    vote_count,
    release_date,
  } = data;

  // console.log({ data });

  return (
    <div>
      <Link to={`/${media_type}/${id}`}>
        <div className="relative aspect-video cursor-pointer rounded-[7px] border border-slate-700 bg-[url('/assets/image_placeholder.svg')] bg-cover bg-center bg-no-repeat">
          <ImageComponent
            src={getImageURL(backdrop_path, imageSize.backdrop.w780)}
            alt={`${title || original_title || name || original_name}`}
            className={`rounded-md`}
            loading="lazy"
          />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100">
            <div className="absolute inset-x-0 bottom-0 rounded-b-md bg-slate-950/90 p-2 py-[10px] text-sm">
              <span>
                <FontAwesomeIcon
                  icon={faCalendar}
                  className="mr-1.5 text-base"
                />
                {formatDate(release_date || first_air_date)}
              </span>
              <div className="absolute -top-[2px] right-0">
                <CircularProgressBar
                  percent={Math.round(vote_average ?? 0) * 10}
                  isRated={vote_count > 0}
                  scale={0.7}
                />
              </div>
            </div>
          </div>
          <span
            className={`absolute ${media_type === "tv" || original_name ? "block" : "hidden"} right-0.5 top-0.5 rounded-md bg-black/95 px-2 py-1 text-sm font-semibold text-white shadow-lg`}
          >
            TV Show
          </span>
        </div>
      </Link>
      <p className="mt-1 text-center text-base font-semibold">
        <Link
          to={`/${media_type}/${id}`}
          className="transition-colors hover:text-netflix_red"
        >
          {title || original_title}
        </Link>
      </p>
    </div>
  );
};
export default RelatedMediaCard;
