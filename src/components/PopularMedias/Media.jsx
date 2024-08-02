import { faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, getImageURL } from "../../../utils";

const Media = (props) => {
  const {
    data: {
      backdrop_path,
      original_title,
      title,
      release_date,
      overview,
      first_air_date,
      name,
      original_name,
    } = {},
    setAutoSlide,
  } = props;

  return (
    <div className="relative w-full">
      <img
        src={getImageURL(backdrop_path)}
        alt={`${original_title} backdrop`}
        className="aspect-video w-full object-cover object-center brightness-50"
      />
      <div className="absolute bottom-[15%] left-[4%] right-[4%] text-white">
        <div className="w-full sm:w-full lg:w-1/2 2xl:w-1/3">
          <p className="text-xl font-bold lg:text-[2vw]">
            {title || original_title || name || original_name}
          </p>
          <div className="mt-5">
            <span className="border border-gray-400 p-1 text-base font-[300] text-gray-400 sm:p-1.5 sm:text-xl">
              PG
            </span>
            <span
              className={`${!original_name && "hidden"} text-base before:p-2 before:text-xl before:content-['•']`}
            >
              TV Show
            </span>
            <p className="inline text-base before:p-2 before:text-xl before:content-['•'] lg:mt-2 lg:block lg:text-[1.2vw] lg:before:p-0 lg:before:content-none">
              {formatDate(release_date || first_air_date)}
            </p>
          </div>
          <div className={`mt-4 hidden ${overview && "md:block"}`}>
            <p className="text-2xl font-bold lg:text-[1.75vw]">Overview</p>
            <p className="mt-2 text-base xl:text-[1.35vw]">{overview}</p>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              className="flex items-center justify-center gap-1 rounded bg-white px-5 py-2 text-sm text-black sm:text-base"
              onMouseEnter={() => setAutoSlide(false)}
              onMouseLeave={() => setAutoSlide(true)}
            >
              <FontAwesomeIcon icon={faPlay} />
              Trailer
            </button>
            <button
              className="flex items-center justify-center gap-1 rounded bg-slate-400/50 px-5 py-2 text-sm transition-colors duration-500 hover:bg-slate-400/65 sm:text-base"
              onMouseEnter={() => setAutoSlide(false)}
              onMouseLeave={() => setAutoSlide(true)}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="text-lg" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Media;
