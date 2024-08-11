import { useEffect, useState } from "react";
import Media from "@components/PopularMedias/Media";
import { GETRequestOption } from "@utils";
import LoadingIndicator from "@components/LoadingIndicator";

const LIST_LENGTH = 10;

const PopularMedias = () => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [preSelectedMediaIndex, setPreSelectedMediaIndex] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const [autoSlide, setAutoSlide] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // console.log("FeatureMovies rendering");
  // console.log(mediaList);

  // Gọi api lây các movie và TV show phổ biến
  useEffect(() => {
    setIsFetching(true);

    const fetchPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular",
        GETRequestOption,
      ).then((res) => {
        if (!res.ok)
          throw new Error(
            `fetchPopularMovies failed with status code ${res.status}`,
          );
        return res.json();
      });
      // console.log("hello");
      return data.results.slice(0, Math.ceil(LIST_LENGTH / 2));
    };

    const fetchPopularTVShows = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/popular",
        GETRequestOption,
      ).then((res) => {
        if (!res.ok)
          throw new Error(
            `fetchPopularTVShows failed with status code ${res.status}`,
          );
        return res.json();
      });
      return data.results.slice(0, Math.floor(LIST_LENGTH / 2));
    };

    Promise.all([fetchPopularMovies(), fetchPopularTVShows()])
      .then((rs) => setMediaList(rs.flat()))
      .catch((e) => console.error(`>>> ${e}`))
      .finally(() => setIsFetching(false));
  }, []);

  const changeSelectedMediaHandler = (idx) => {
    setSelectedMediaIndex(idx);
    setPreSelectedMediaIndex(selectedMediaIndex);
  };

  // Dùng timeout
  useEffect(() => {
    if (autoSlide && !isFetching) {
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
  }, [selectedMediaIndex, autoSlide, isFetching]);

  // Dùng interval
  // useEffect(() => {
  //   const intervalId = setInterval(
  //     () => setSelectedMovieIndex((prev) => (prev + 1) % LIST_LENGTH),
  //     5000,
  //   );
  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <div className="relative aspect-video w-full bg-slate-900">
      <div
        className={`${!isFetching ? "animate-fadeout" : "animate-fadein"} absolute inset-0`}
      >
        <LoadingIndicator />
      </div>
      <div
        // className="relative flex aspect-video overflow-hidden bg-slate-950"
        onMouseDownCapture={() => {
          console.log("mouse down PopularMedias");
          setAutoSlide(false);
        }}
        onMouseUpCapture={() => {
          console.log("mouse up PopularMedias");
          setAutoSlide(true);
        }}
        className={`${!isFetching ? "animate-fadein" : "hidden"}`}
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
    </div>
  );
};
export default PopularMedias;
