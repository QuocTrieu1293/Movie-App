import { useState } from "react";
import MediaCard from "@components/MediaList/MediaCard";
import { Link } from "react-router-dom";
import MediaCardSkeleton from "@components/MediaList/MediaCardSkeleton";
import useFetch from "@hooks/useFetch";

const MediaList = ({ title, tabs }) => {
  const LIST_LENGTH = 18;

  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  const { data = {}, isFetching } = useFetch({
    url: selectedTab.url,
    errorMsg: `>>> Error fetching ${JSON.stringify(selectedTab)} in MediaList ${title} failed`,
  });
  const mediaList = (data.results ?? []).slice(0, LIST_LENGTH);

  // console.log(mediaList);

  return (
    <>
      {/* <button
        className="rounded-md border bg-white px-1 py-0.5"
        onClick={() => setIsFetching(!isFetching)}
      >
        Fetch
      </button> */}
      <div className="px-[4vw] py-5 text-sm text-white sm:py-10 xl:text-[1.2vw]">
        <div className="mb-6 flex items-center gap-4">
          <h1 className="text-lg font-bold sm:text-2xl xl:text-[2vw]">
            {title}
          </h1>
          <ul className="flex rounded-lg border border-white font-semibold">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`cursor-pointer rounded-md px-1.5 py-1 sm:px-2 sm:py-1.5 ${selectedTab.id === tab.id ? "bg-white text-black" : "hover:bg-slate-400/20"} transition-colors duration-200`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>

        {isFetching ? (
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-3.5 sm:gap-y-6 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
            {Array.from({ length: 12 }).map((_, idx) => (
              <MediaCardSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div className="animate-fadein">
            <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-3.5 sm:gap-y-6 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
              {mediaList.map((media) => (
                <Link key={media.id} to={`/movie/${media.id}`}>
                  <MediaCard data={media} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default MediaList;
