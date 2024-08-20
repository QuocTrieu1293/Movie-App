import ImageComponent from "@components/ImageComponent";
import { faAngleDown, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getImageURL, imageSize } from "@utils";
import { useEffect, useRef, useState } from "react";

const TVShowSeason = ({ data, tvShow }) => {
  const CARD_HEIGHT = 200;

  const {
    air_date,
    episode_count,
    name,
    overview,
    poster_path,
    season_number,
    vote_average,
  } = data ?? {};

  const [isShowMore, setIsShowMore] = useState(false);
  const overviewRef = useRef(null);
  const [overviewState, setOverviewState] = useState({
    expanseCardHeight: null,
    isOverflow: false,
    lineClamp: null,
  });

  // const cnt = useRef(0);
  // cnt.current += 1;
  // console.log("rendered", cnt.current);

  useEffect(() => {
    const cutOffTextHandler = () => {
      const clientHeight = overviewRef.current.clientHeight;
      const offsetTop = overviewRef.current.parentNode.offsetTop;
      const remainingCardHeight = CARD_HEIGHT - offsetTop - 20; //20 là padding bottom của container

      let lineHeight, numOfLineClamp;

      if (clientHeight > remainingCardHeight) {
        // overflow
        lineHeight = parseFloat(
          window.getComputedStyle(overviewRef.current).lineHeight,
        );
        numOfLineClamp = ~~(remainingCardHeight / lineHeight);
        setOverviewState({
          ...overviewState,
          expanseCardHeight:
            CARD_HEIGHT + clientHeight - remainingCardHeight + 24, //24 là height của div chứa icon sổ xuống
          isOverflow: true,
          lineClamp: numOfLineClamp,
        });
      } else {
        setOverviewState({ ...overviewState, isOverflow: false });
      }
    };

    cutOffTextHandler();
    window.addEventListener("resize", cutOffTextHandler);
    return () => window.removeEventListener("resize", cutOffTextHandler);
  }, [overviewState]);

  console.log(name, { overviewState });

  return (
    <div
      className={`duration-400 flex border border-slate-700 shadow-lg transition-[height] ease-linear`}
      style={
        !overviewState.isOverflow || !isShowMore
          ? { height: CARD_HEIGHT + 2, borderRadius: 9 }
          : {
              height: overviewState.expanseCardHeight + 2,
              borderLeft: "transparent",
              borderRight: "transparent",
            }
      }
    >
      <div
        className={`aspect-[2/3] ${overviewState.isOverflow && isShowMore && "translate-y-5"} duration-400 transition-all`}
        style={{ maxHeight: CARD_HEIGHT, height: CARD_HEIGHT }}
      >
        <ImageComponent
          src={getImageURL(poster_path, imageSize.poster.w154)}
          alt=""
          loading="lazy"
          className={`${overviewState.isOverflow && isShowMore ? "rounded-lg" : "rounded-l-lg"} transition-all duration-500`}
        />
      </div>
      <div className="relative flex-1 p-5">
        <h2 className="text-xl font-bold lg:text-[1.75vw]">{name}</h2>
        <div className="mt-0.5 flex items-center text-sm font-semibold lg:text-[1.1vw]">
          {vote_average > 0 && (
            <div className="mr-2 rounded-md bg-[rgb(3,37,65)] px-1.5 py-0.5">
              <FontAwesomeIcon icon={faStar} className="mr-1 text-sm" />
              <span>{Math.round(vote_average * 10)}</span>
              <span className="align-top text-xs lg:text-[0.8vw]">%</span>
            </div>
          )}
          <span>{air_date ? new Date(air_date).getFullYear() : "-"}</span>
          <span className="mx-1.5 text-base">&bull;</span>
          <span>{episode_count} Episodes</span>
        </div>
        {air_date && (
          <p className="mt-2.5 text-base font-semibold italic text-slate-400 lg:text-[1.25vw]">
            {`Season ${season_number} of ${tvShow} premiered on ${new Date(air_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}.`}
          </p>
        )}

        <div className="relative mt-4">
          <div
            className={`relative text-sm font-light leading-normal lg:text-[1.25vw]`}
          >
            <div
              style={
                overviewState.isOverflow && !isShowMore
                  ? {
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: overviewState.lineClamp,
                      lineClamp: overviewState.lineClamp,
                      overflow: "hidden",
                    }
                  : undefined
              }
            >
              {overview.split("\n\n").map((para, idx) => (
                <p key={idx}>
                  {idx > 0 && <br />}
                  {para}
                </p>
              ))}
            </div>
            {overviewState.isOverflow && (
              <div
                className={`${!isShowMore && "absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-black"} transition-all duration-500`}
              >
                <div
                  className={`${!isShowMore && "absolute inset-x-0 -bottom-5 top-0"} cursor-pointer text-center text-base text-netflix_red2 transition-colors duration-200 hover:text-netflix_red`}
                  onClick={() => setIsShowMore(!isShowMore)}
                >
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className={`${isShowMore ? "rotate-180" : "absolute bottom-1.5"} transition-transform duration-500`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Virtual Element */}
          <div
            className={`invisible absolute inset-x-0 top-0 text-sm font-light leading-normal lg:text-[1.25vw]`}
            ref={overviewRef}
          >
            {overview.split("\n\n").map((para, idx) => (
              <p key={idx}>
                {idx > 0 && <br />}
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default TVShowSeason;
