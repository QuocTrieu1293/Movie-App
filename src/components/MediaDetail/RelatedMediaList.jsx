import { useEffect, useRef, useState } from "react";
import RelatedMediaCard from "./RelatedMediaCard";
import RelatedMediaCardSkeleton from "./RelatedMediaCardSkeleton";
import PlaceholderText from "@components/PlaceholderText";

const RelatedMediaList = ({ mediaList = [], isFetching }) => {
  // console.log({ mediaList });

  const gridContainerRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    gridContainerRef.current.scrollLeft = 0;
    gridContainerRef.current.addEventListener("scroll", (e) =>
      setScrollOffset(e.target.scrollLeft),
    );
  }, []);

  return (
    <div>
      <h3 className="text-lg font-bold lg:text-[1.4vw]">More like this</h3>
      <div className="relative">
        <div
          className="grid auto-cols-[252px] grid-flow-col gap-3 overflow-x-auto overscroll-x-contain p-3"
          ref={gridContainerRef}
        >
          {isFetching
            ? Array.from({ length: 8 }).map((_, idx) => (
                <RelatedMediaCardSkeleton key={idx} />
              ))
            : mediaList.map((media) => (
                <div
                  key={media.id}
                  className="animate-fadein transition-transform duration-300 hover:scale-[1.08]"
                >
                  <RelatedMediaCard data={media} />
                </div>
              ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 bg-gradient-to-l from-black transition-all duration-300"
          style={{
            opacity: 1 - scrollOffset / 80,
            width: (1 - scrollOffset / 80) * 60,
          }}
        ></div>
      </div>

      {mediaList.length === 0 && !isFetching && <PlaceholderText />}
    </div>
  );
};
export default RelatedMediaList;
