import { useEffect, useRef, useState } from "react";
import ActorCard from "@components/MediaDetail/ActorCard";
import PlaceholderText from "@components/PlaceholderText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const ActorList = ({ actors = [] }) => {
  const CARD_WIDTH = 140;
  const ITEM_GAP = 12;
  // const INIT_LENGTH = 6;

  const [isShowMore, setIsShowMore] = useState(false);
  // const [isFirstRender, setIsFirstRender] = useState(true);
  // const isFirstRenderRef = useRef(true);
  const [clicked, setClicked] = useState(false);
  const gridContainerRef = useRef(null);
  const [initLength, setInitLength] = useState();
  const [showMoreLabel, setShowMoreLabel] = useState("Show more");

  // Dùng useState -> không được do gây ra rerender
  // useEffect(() => {
  //   setIsFirstRender(false);
  // }, []);
  // console.log(isFirstRender);

  //Dùng useRef -> không gây rerender
  // useEffect(() => {
  //   if (initLength)
  //     //Sau khi initLength đã được set
  //     isFirstRenderRef.current = false;
  // }, [initLength]);
  // console.log(isFirstRenderRef.current);

  // Tính toán initlength để fill trên một dòng
  useEffect(() => {
    // console.log("get width");
    setInitLength(
      ~~(gridContainerRef.current.offsetWidth / (CARD_WIDTH + ITEM_GAP)),
    );
    window.addEventListener("resize", () => {
      if (gridContainerRef.current)
        setInitLength(
          ~~(gridContainerRef.current.offsetWidth / (CARD_WIDTH + ITEM_GAP)),
        );
    });
  }, []);
  // console.log({ initLength });

  return (
    <div>
      <h3 className="text-lg font-bold lg:text-[1.65vw]">Actors</h3>
      <div
        className={`my-3 grid grid-cols-[repeat(auto-fill,140px)] justify-center sm:mt-5`}
        style={{ gap: ITEM_GAP }}
        ref={gridContainerRef}
      >
        {actors.map((actor, idx) => (
          <div
            key={actor.id}
            className={`${idx >= initLength && (!clicked ? "hidden" : isShowMore ? "animate-fadein" : "animate-fadeout")}`}
          >
            <ActorCard data={actor} />
          </div>
        ))}
        {actors.length > initLength && (
          <div className="col-span-full">
            <button
              // key={isShowMore.toString()}
              className={`${clicked && (isShowMore ? "animate-fadein" : "animate-[fadeout_700ms_ease-out]")} transition-colors duration-200 hover:text-slate-300 lg:text-[1.2vw]`}
              onClick={() => {
                setClicked(true);
                setIsShowMore(!isShowMore);
              }}
              onAnimationEnd={() =>
                setShowMoreLabel(isShowMore ? "Show less" : "Show more")
              }
            >
              <FontAwesomeIcon
                icon={showMoreLabel === "Show less" ? faAngleUp : faAngleDown}
                className="mr-2"
              />
              {showMoreLabel}
            </button>
          </div>
        )}
      </div>
      {actors.length === 0 && <PlaceholderText />}
    </div>
  );
};
export default ActorList;
