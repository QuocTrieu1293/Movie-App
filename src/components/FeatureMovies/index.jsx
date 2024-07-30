import { useEffect, useState } from "react";
import Movie from "./Movie";
import { accessToken } from "../../../utils";

const LIST_LENGTH = 5;

const FeatureMovies = () => {
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  const [autoSlide, setAutoSlide] = useState(true);

  // console.log("FeatureMovies rendering");
  // console.log(movies);

  useEffect(() => {
    // Gọi api lây dữ liệu trending movies trong tuần
    fetch("https://api.themoviedb.org/3/trending/movie/week?language=vi-VN", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => setMovies(res.results.slice(0, LIST_LENGTH)))
      .catch((err) => console.error(err));
  }, []);

  // Dùng timeout
  useEffect(() => {
    if (autoSlide) {
      const timeoutId = setTimeout(
        () => setSelectedMovieIndex((selectedMovieIndex + 1) % LIST_LENGTH),
        5000,
      );
      return () => {
        // console.log("clear timeout");
        clearTimeout(timeoutId);
      };
    }
  }, [selectedMovieIndex, autoSlide]);

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
      className="relative flex aspect-video overflow-hidden bg-slate-950"
      onMouseDownCapture={() => {
        console.log("mouse down feature movies");
        setAutoSlide(false);
      }}
      onMouseUpCapture={() => {
        console.log("mouse up feature movies");
        setAutoSlide(true);
      }}
    >
      {/* {movies.map((movie, idx) => (
        <div
          key={movie.id}
          className={`shrink-0 basis-full ${idx === selectedMovieIndex ? "opacity-100" : "opacity-0"} transition-opacity duration-700`}
          style={{ translate: `${-100 * selectedMovieIndex}%` }}
        >
          <Movie data={movie} setAutoSlide={setAutoSlide} />
        </div>
      ))} */}

      {movies.map((movie, idx) => (
        <Movie
          key={movie.id}
          data={movie}
          setAutoSlide={setAutoSlide}
          active={idx === selectedMovieIndex}
        />
      ))}

      {/* Pagination indicators */}
      <ul className="absolute bottom-[5%] right-[4%] flex gap-2">
        {movies.map((_, idx) => (
          <li
            key={idx}
            className={`h-1.5 w-4 cursor-pointer rounded ${idx === selectedMovieIndex ? "bg-slate-100" : "bg-slate-600"} hover:opacity-80 sm:w-8`}
            onClick={() => setSelectedMovieIndex(idx)}
          ></li>
        ))}
      </ul>
    </div>
  );
};
export default FeatureMovies;
