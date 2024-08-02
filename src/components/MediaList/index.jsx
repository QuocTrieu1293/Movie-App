import { useEffect, useState } from "react";
import MediaCard from "./MediaCard";
import { GETRequestOption } from "../../../utils";

const MediaList = ({ title, tabs }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [mediaList, setMediaList] = useState([]);

  const LIST_LENGTH = 18;

  useEffect(() => {
    fetch(selectedTab.url, GETRequestOption)
      .then((res) => res.json())
      .then((res) => setMediaList(res.results.slice(0, LIST_LENGTH)))
      .catch((e) =>
        console.error(
          `>>> Error in fetching ${selectedTab} in MediaList ${title}: ${e}`,
        ),
      );
  }, [selectedTab]);

  console.log(mediaList);

  return (
    <div className="bg-black px-[4vw] py-5 text-sm text-white sm:py-10 xl:text-[1.2vw]">
      <div className="mb-6 flex items-center gap-4">
        <h1 className="text-lg font-bold sm:text-2xl xl:text-[2vw]">{title}</h1>
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
      <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 sm:gap-x-3.5 sm:gap-y-6 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8">
        {mediaList.map((media) => (
          <MediaCard key={media.id} data={media} />
        ))}
      </div>
    </div>
  );
};
export default MediaList;
