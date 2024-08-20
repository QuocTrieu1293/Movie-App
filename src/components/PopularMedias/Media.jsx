import { faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, getImageURL } from "@utils";
import { Link } from "react-router-dom";
import CircularProgressBar from "@components/CircularProgressBar";
import { useEffect, useState } from "react";
import Backdrop from "@components/Backdrop";

const Media = (props) => {
  const [ratingCircleScale, setRatingCircleScale] = useState(
    window.innerWidth >= 1024 ? 1.6 : window.innerWidth >= 640 ? 1.4 : 1.2,
  );

  const {
    data: {
      id,
      backdrop_path,
      original_title,
      title,
      release_date,
      overview,
      first_air_date,
      name,
      original_name,
      vote_average,
      vote_count,
    } = {},
    setAutoSlide,
  } = props;

  useEffect(() => {
    const handleResize = () =>
      setRatingCircleScale(
        window.innerWidth >= 1024 ? 1.6 : window.innerWidth >= 640 ? 1.4 : 1.2,
      );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-full w-full text-white">
      <Backdrop
        src={getImageURL(backdrop_path)}
        alt={`${title || original_title || name || original_name} backdrop`}
        className="brightness-50"
        maxImageWidth={3840}
        maxImageHeight={2160}
      />
      <div className="absolute bottom-[15%] left-[4%] right-[4%]">
        <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/3">
          <p className="text-xl font-bold lg:text-[2vw]">
            <Link
              to={`/${original_title ? "movie" : "tv"}/${id}`}
              className="transition-colors duration-200 hover:text-netflix_red"
              onMouseEnter={() => setAutoSlide(false)}
              onMouseLeave={() => setAutoSlide(true)}
            >
              {title || original_title || name || original_name}
            </Link>
          </p>
          <div className="my-3 block sm:my-10 sm:flex sm:items-center md:my-5 lg:my-10">
            <div className="inline-flex items-center">
              <div className="ml-2 flex items-center gap-3 font-bold sm:gap-5 lg:gap-6">
                <CircularProgressBar
                  percent={Math.round((vote_average ?? 0) * 10)}
                  isRated={vote_count > 0}
                  scale={ratingCircleScale}
                />
                <div className="flex flex-col justify-center">
                  <p>Rating</p>
                  <p className="text-sm font-light text-slate-300">
                    {vote_count} votes
                  </p>
                </div>
              </div>
              <span
                className={`${!original_name && "hidden"} text-base before:p-2 before:align-middle before:text-xl before:content-['\\2022']`}
              >
                TV Show
              </span>
            </div>
            <p className="mt-1 text-base sm:mt-0 sm:before:p-2 sm:before:align-middle sm:before:text-xl sm:before:content-['\2022'] lg:text-[1.2vw]">
              {formatDate(release_date || first_air_date)}
            </p>
          </div>
          <div className={`mb-4 hidden ${overview && "md:block"}`}>
            <p className="text-2xl font-bold lg:text-[1.75vw]">Overview</p>
            <p className="mt-2 line-clamp-5 text-ellipsis text-base leading-normal xl:text-[1.35vw]">
              {overview}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              className="flex items-center justify-center gap-1 rounded bg-white px-2 py-1 text-sm text-black sm:px-5 sm:py-2 sm:text-base"
              onMouseEnter={() => setAutoSlide(false)}
              onMouseLeave={() => setAutoSlide(true)}
            >
              <FontAwesomeIcon icon={faPlay} />
              Trailer
            </button>
            <Link
              className="flex items-center justify-center gap-1 rounded bg-slate-400/50 px-2 py-1 text-sm transition-colors duration-500 hover:bg-slate-400/65 sm:px-5 sm:py-2 sm:text-base"
              onMouseEnter={() => setAutoSlide(false)}
              onMouseLeave={() => setAutoSlide(true)}
              to={`/${original_title ? "movie" : "tv"}/${id}`}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="text-lg" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Media;
