import { useEffect, useState } from "react";
import Media from "./Media";
import { GETRequestOption } from "../../../utils";

const LIST_LENGTH = 10;

const PopularMedias = () => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [preSelectedMediaIndex, setPreSelectedMediaIndex] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [autoSlide, setAutoSlide] = useState(true);

  // console.log("FeatureMovies rendering");
  // console.log(mediaList);

  // Gọi api lây các movie và TV show phổ biến
  useEffect(() => {
    const fetchPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular",
        GETRequestOption,
      )
        .then((res) => res.json())
        .catch((e) => console.error(`>>> Error in fetchPopularMovies: ${e}`));
      return data.results.slice(0, Math.ceil(LIST_LENGTH / 2));
    };

    const fetchPopularTVShows = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/popular",
        GETRequestOption,
      )
        .then((res) => res.json())
        .catch((e) => console.error(`>>> Error in fetchPopularTVShows: ${e}`));
      return data.results.slice(0, Math.floor(LIST_LENGTH / 2));
    };

    Promise.all([fetchPopularMovies(), fetchPopularTVShows()])
      .then((rs) => setMediaList(rs.flat()))
      .catch((e) => console.error(e));
  }, []);

  const changeSelectedMediaHandler = (idx) => {
    setSelectedMediaIndex(idx);
    setPreSelectedMediaIndex(selectedMediaIndex);
  };

  // Dùng timeout
  useEffect(() => {
    if (autoSlide) {
      const timeoutId = setTimeout(
        () =>
          changeSelectedMediaHandler((selectedMediaIndex + 1) % LIST_LENGTH),
        5000,
      );
      return () => {
        // console.log("clear timeout");
        clearTimeout(timeoutId);
      };
    }
  }, [selectedMediaIndex, autoSlide]);

  // Dùng interval
  // useEffect(() => {
  //   const intervalId = setInterval(
  //     () => setSelectedMovieIndex((prev) => (prev + 1) % LIST_LENGTH),
  //     5000,
  //   );
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div
      // className="relative flex aspect-video overflow-hidden bg-slate-950"
      className="relative aspect-video w-full bg-slate-900"
      onMouseDownCapture={() => {
        console.log("mouse down PopularMedias");
        setAutoSlide(false);
      }}
      onMouseUpCapture={() => {
        console.log("mouse up PopularMedias");
        setAutoSlide(true);
      }}
    >
      {/* {mediaList.map((media, idx) => (
        <div
          key={media.id}
          className={`shrink-0 basis-full ${idx === selectedMediaIndex ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
          style={{ translate: `${-100 * selectedMediaIndex}%` }}
        >
          <Media data={media} setAutoSlide={setAutoSlide} />
        </div>
      ))} */}
      {mediaList.map((media, idx) => (
        <div
          key={media.id}
          className={`absolute w-full ${idx === selectedMediaIndex ? "animate-fadein" : idx === preSelectedMediaIndex ? "animate-fadeout" : "hidden"}`}
        >
          <Media data={media} setAutoSlide={setAutoSlide} />
        </div>
      ))}

      {/* Pagination indicators */}
      <ul className="absolute bottom-[5%] right-[4%] flex gap-2">
        {mediaList.map((_, idx) => (
          <li
            key={idx}
            className={`h-2 w-2 cursor-pointer rounded sm:h-1.5 ${idx === selectedMediaIndex ? "bg-slate-100" : "bg-slate-600"} hover:opacity-80 sm:w-8`}
            onClick={() => changeSelectedMediaHandler(idx)}
          ></li>
        ))}
      </ul>
    </div>
  );
};
export default PopularMedias;
