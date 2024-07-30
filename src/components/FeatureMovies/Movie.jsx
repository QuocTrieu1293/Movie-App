import { faInfoCircle, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatDate, imageBaseURL, imageSize } from "../../../utils";

const Movie = (props) => {
  const {
    data: { backdrop_path, original_title, release_date, overview } = {},
    setAutoSlide,
    active,
  } = props;

  return (
    // <div className="relative">
    <div
      className={`absolute ${active ? "animate-fadein" : "animate-fadeout"}`}
    >
      <img
        src={`${imageBaseURL}/${imageSize.backdrop.original}/${backdrop_path}`}
        className="aspect-video brightness-50"
      />
      <div className="absolute bottom-[10%] left-[4%] right-[4%] text-white">
        <div className="w-full sm:w-2/3 lg:w-1/3">
          <p className="text-xl font-bold lg:text-[2vw]">{original_title}</p>
          <div className="mt-4">
            <p className="inline-block border border-gray-400 p-1.5 text-xl font-[300] text-gray-400">
              PG
            </p>
            <p className="mt-1 text-base lg:text-[1.2vw]">
              {formatDate(release_date)}
            </p>
          </div>
          <div className="mt-4 hidden md:block">
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
              Thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;
