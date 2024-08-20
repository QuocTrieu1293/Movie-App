import { useEffect, useState } from "react";
import {
  formatDate,
  formatMediaDuration,
  getImageURL,
  imageSize,
} from "@utils";
import CircularProgressBar from "@components/CircularProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Backdrop from "@components/Backdrop";
import ImageComponent from "@components/ImageComponent";
import { Link } from "react-router-dom";

const DEFAULT_BKG_COLOR = "#0f172a";

const Banner = ({
  id,
  title,
  certification,
  crews = [],
  poster_path,
  backdrop_path,
  release_date,
  genres = [],
  runtime,
  vote_average,
  vote_count,
  tagline,
  overview,
  media_type,
}) => {
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_BKG_COLOR);

  // Get average color of media poster to setBackgroundColor
  // Reference code: https://github.com/deepeshrohilla/averageimagecolor.git
  useEffect(() => {
    // console.log("finding average color");

    if (!poster_path) return;

    const getAverageImageColor = (node) => {
      // console.log("getAverageImageColor run");
      const canvas = document.createElement("canvas");

      let height = (canvas.height = node.naturalHeight);
      let width = (canvas.width = node.naturalWidth);
      // console.log({ width, height });

      const context = canvas.getContext("2d");
      context.drawImage(node, 0, 0);

      let data, length;
      try {
        data = context.getImageData(0, 0, width, height)?.data;
        // console.log({ data });
        length = data.length;
      } catch (err) {
        console.error(">>> Error", err);
        return;
      }

      let i = -4,
        count = 0;
      const averageColor = { r: 0, g: 0, b: 0 };
      const ratio = 100; //1, 2, 3, ...
      const threshold = 150; //for not too white
      while ((i += ratio * 4) < length) {
        ++count;
        averageColor.r += Math.min(data[i], threshold);
        averageColor.g += Math.min(data[i + 1], threshold);
        averageColor.b += Math.min(data[i + 2], threshold);
      }

      averageColor.r = ~~(averageColor.r / count);
      averageColor.g = ~~(averageColor.g / count);
      averageColor.b = ~~(averageColor.b / count);

      Object.keys(averageColor).forEach(
        (color) =>
          (averageColor[color] = averageColor[color]
            .toString(16)
            .padStart(2, 0)),
      );
      setBackgroundColor(
        `#${averageColor.r}${averageColor.g}${averageColor.b}`,
      );
      // console.log({ averageColor });
    };

    const posterImage = new Image();
    posterImage.crossOrigin = "Anonymous";
    posterImage.width = 300;
    posterImage.height = 450;
    posterImage.onload = (e) => getAverageImageColor(e.target);

    posterImage.src = getImageURL(poster_path, imageSize.poster.w300_h450);

    return () => {
      posterImage.onload = null;
    };
  }, [poster_path]);

  // console.log(backgroundColor);

  return (
    <div
      className={`relative overflow-hidden`}
      style={{
        backgroundColor: backgroundColor,
        boxShadow: `${backgroundColor}85 0px 12px 25px 0px`,
      }}
    >
      <Backdrop
        alt={`${title} backdrop`}
        src={getImageURL(backdrop_path)}
        className="aspect-video max-w-[1920px] brightness-[.2]"
      />
      <div
        className={`relative px-10 py-8`}
        style={{ backgroundColor: `${backgroundColor}85` }}
      >
        <div className="relative mx-auto flex max-w-6xl gap-10 2xl:max-w-screen-xl">
          <div className="aspect-[2/3] w-[300px] min-w-52 self-start">
            <ImageComponent
              alt={`${title} poster`}
              src={getImageURL(poster_path, imageSize.poster.w300_h450)}
              className={`rounded-lg`}
            />
          </div>

          <div className="flex-1 leading-snug">
            <h2 className="text-xl font-bold leading-tight lg:text-[2.5vw]">
              <Link
                to={`/${media_type}/${id}`}
                className="transition-colors duration-200 hover:text-netflix_red"
              >
                {title + " "}
              </Link>
              <span className="font-normal text-slate-200">
                {!!release_date && `(${new Date(release_date).getFullYear()})`}
              </span>
            </h2>
            <div className="flex items-center">
              {certification && (
                <span className="mr-2 rounded-sm border border-gray-400 px-1 py-0.5 font-[300] text-gray-400">
                  {certification}
                </span>
              )}
              <span>{formatDate(release_date)}</span>
              <ul
                className={`flex items-center ${!!release_date && "before:px-2 before:text-xl before:leading-none before:content-['\\2022']"}`}
              >
                {genres.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href="#"
                      className="transition-colors hover:text-netflix_red"
                    >
                      {item.name}
                    </a>
                    {idx < genres.length - 1 && <>,&nbsp;</>}
                  </li>
                ))}
              </ul>
              {!!runtime && (
                <span className="before:px-2 before:text-xl before:leading-none before:content-['\2022']">
                  {formatMediaDuration(runtime)}
                </span>
              )}
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-5 font-bold">
                <CircularProgressBar
                  percent={Math.round(vote_average * 10)}
                  isRated={vote_count > 0}
                  scale={1.4}
                />{" "}
                <div className="flex flex-col justify-center">
                  <p>Rating</p>
                  <p className="text-xs font-light text-slate-300 lg:text-[1vw]">
                    {vote_count || 0} votes
                  </p>
                </div>
              </div>
              <button className="font-semibold transition-colors duration-500 hover:text-slate-200/60">
                <FontAwesomeIcon icon={faPlay} className="mr-1" /> Play Trailer
              </button>
            </div>
            <div className="mt-8">
              <p className="text-sm italic text-slate-300 lg:text-[1.4vw]">
                {tagline}
              </p>
              {overview && (
                <>
                  <h3 className="my-2 font-semibold lg:text-[1.5vw]">
                    Overview
                  </h3>
                  <p className="leading-normal">{overview}</p>
                </>
              )}
            </div>
            <ul className="mt-5 grid grid-cols-3 gap-5">
              {crews.map((crew) => (
                <li key={crew.id}>
                  <a
                    className="font-bold leading-normal transition-colors hover:text-netflix_red"
                    href="#"
                  >
                    {crew.name}
                  </a>
                  <ul className="flex text-xs font-light lg:text-[1.25vw]">
                    {crew.jobs.map((job, idx) => (
                      <li key={idx}>
                        {job}
                        {idx < crew.jobs.length - 1 && <>,&nbsp;</>}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
