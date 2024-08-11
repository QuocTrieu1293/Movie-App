import { useEffect, useMemo, useRef, useState } from "react";
import {
  formatDate,
  formatMediaDuration,
  getImageURL,
  imageSize,
} from "@utils";
import CircularProgressBar from "@components/CircularProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const Banner = ({ mediaInfo }) => {
  const [backgroundColor, setBackgroundColor] = useState("#0f172a");
  const posterRef = useRef(null);

  const { certification } = useMemo(
    () =>
      mediaInfo?.release_dates.results
        .find((item) => ["US", "VN"].includes(item.iso_3166_1))
        ?.release_dates.find((item) => item.certification) ?? {},
    [mediaInfo],
  );
  // console.log({ release_date, certification });

  const crews = useMemo(() => {
    const grouped = Object.groupBy(
      mediaInfo?.credits.crew ?? [],
      (item) => item.id,
    );
    let rs = [];
    for (let group in grouped) {
      const jobs = grouped[group].map((item) => item.job);
      const filteredJobs = jobs.filter((job) =>
        [
          "Director",
          "Writer",
          "Characters",
          "Story",
          "Screenplay",
          "Story",
          "Novel",
        ].includes(job),
      );
      if (filteredJobs.length > 0)
        rs.push({
          id: group,
          name: grouped[group][0].name,
          jobs: filteredJobs,
        });
    }
    return rs;
  }, [mediaInfo]);
  // console.log({ crews });

  // Get average color of media poster to setBackgroundColor
  // Reference code: https://github.com/deepeshrohilla/averageimagecolor.git
  useEffect(() => {
    // console.log("finding average color");

    if (!posterRef.current) return;

    const getAverageImageColor = () => {
      // console.log("getAverageImageColor run");
      const canvas = document.createElement("canvas");

      let height = (canvas.height = posterRef.current.naturalHeight);
      let width = (canvas.width = posterRef.current.naturalWidth);
      // console.log({ width, height });

      const context = canvas.getContext("2d");
      context.drawImage(posterRef.current, 0, 0);

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
    if (posterRef.current.complete) {
      // console.log("getAverageImageColor run in complete");
      getAverageImageColor();
    } else {
      // console.log("getAverageImageColor run in onload");
      posterRef.current.addEventListener("load", getAverageImageColor);
    }
  }, []);

  // console.log(backgroundColor);

  return (
    <div
      className={`relative overflow-hidden`}
      style={{
        backgroundColor: backgroundColor,
        boxShadow: `${backgroundColor}85 0px 12px 25px 0px`,
      }}
    >
      <div className="absolute inset-0">
        <img
          alt={`${mediaInfo?.title || mediaInfo?.original_title} backdrop`}
          src={
            mediaInfo?.backdrop_path
              ? getImageURL(mediaInfo?.backdrop_path)
              : undefined
          }
          className={`h-full w-full object-cover object-top brightness-[.2] ${!mediaInfo?.backdrop_path && "opacity-0"}`}
        />
      </div>
      <div
        className={`relative px-10 py-8`}
        style={{ backgroundColor: `${backgroundColor}85` }}
      >
        <div className="relative mx-auto flex max-w-6xl gap-10 2xl:max-w-screen-xl">
          <div className="aspect-[2/3] w-[300px] min-w-52 self-start rounded-[9px] bg-[url('/assets/image_placeholder.svg')] bg-cover bg-center bg-no-repeat">
            <img
              ref={posterRef}
              alt={`${mediaInfo?.title || mediaInfo?.original_title} poster`}
              src={
                mediaInfo?.poster_path
                  ? getImageURL(
                      mediaInfo?.poster_path,
                      imageSize.poster.w300_h450,
                    )
                  : undefined
              }
              crossOrigin="anonymous"
              className={`h-full w-full rounded-lg ${!mediaInfo?.poster_path && "opacity-0"} object-cover`}
            />
          </div>

          <div className="flex-1 leading-snug">
            <h2 className="text-xl font-bold leading-tight transition-colors duration-200 hover:text-netflix_red lg:text-[2.5vw]">
              <a href="#">
                {(mediaInfo?.title || mediaInfo?.original_title) + " "}
                <span className="font-normal text-slate-200">
                  {!!mediaInfo?.release_date &&
                    `(${new Date(mediaInfo.release_date).getFullYear()})`}
                </span>
              </a>
            </h2>
            <div className="flex items-center">
              {certification && (
                <span className="mr-2 rounded-sm border border-gray-400 px-1 py-0.5 font-[300] text-gray-400">
                  {certification}
                </span>
              )}
              <span>
                {!!mediaInfo?.release_date &&
                  formatDate(mediaInfo.release_date)}
              </span>
              <ul
                className={`flex items-center ${!!mediaInfo?.release_date && "before:px-2 before:text-xl before:leading-none before:content-['\\2022']"}`}
              >
                {mediaInfo?.genres.map((item, idx) => (
                  <li key={item.id}>
                    <a
                      href="#"
                      className="transition-colors hover:text-netflix_red"
                    >
                      {item.name}
                    </a>
                    {idx < mediaInfo.genres.length - 1 && <>,&nbsp;</>}
                  </li>
                ))}
              </ul>
              {mediaInfo?.runtime > 0 && (
                <span className="before:px-2 before:text-xl before:leading-none before:content-['\2022']">
                  {formatMediaDuration(mediaInfo?.runtime)}
                </span>
              )}
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-5 font-bold">
                <CircularProgressBar
                  percent={Math.round((mediaInfo?.vote_average ?? 0) * 10)}
                  isRated={mediaInfo?.vote_count > 0}
                  scale={1.4}
                />{" "}
                <div className="flex flex-col justify-center">
                  <p>Rating</p>
                  <p className="text-xs font-light text-slate-300 lg:text-[1vw]">
                    {mediaInfo?.vote_count} votes
                  </p>
                </div>
              </div>
              <button className="font-semibold transition-colors duration-500 hover:text-slate-200/60">
                <FontAwesomeIcon icon={faPlay} className="mr-1" /> Play Trailer
              </button>
            </div>
            <div className="mt-8">
              <p className="text-sm italic text-slate-300 lg:text-[1.4vw]">
                {mediaInfo?.tagline}
              </p>
              {mediaInfo?.overview && (
                <>
                  <h3 className="my-2 font-semibold lg:text-[1.5vw]">
                    Overview
                  </h3>
                  <p className="leading-normal">{mediaInfo?.overview}</p>
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
