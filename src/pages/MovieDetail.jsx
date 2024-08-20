import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { GETRequestOption } from "@utils";
import Banner from "@components/MediaDetail/Banner";
import LoadingIndicator from "@components/LoadingIndicator";
import ActorList from "@components/MediaDetail/ActorList";
import MovieInformation from "@components/MediaDetail/movie/MovieInformation";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import Separator from "@components/Separator";

const MovieDetail = () => {
  const { id } = useParams();
  const media_type = "movie";
  const [movieInfo, setMovieInfo] = useState();
  const [recommends, setRecommends] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingRecommends, setIsFetchingRecommends] = useState(true);

  // fetch data
  useEffect(() => {
    setIsFetching(true);
    setIsFetchingRecommends(true);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=release_dates,credits`,
      GETRequestOption,
    )
      .then(async (res) => {
        if (!res.ok)
          throw new Error(
            `>>> Fetching MovieDetail id=${id} failed with status code ${res.status}`,
          );
        const data = await res.json();
        // console.log({ data });
        setMovieInfo(data);
        setIsFetching(false);
        return fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations`,
          GETRequestOption,
        );
      })
      .then(async (res) => {
        if (!res.ok)
          return new Error(
            `>>> Fetching RelatedMediaList of movie id=${id} failed with status code ${res.status}`,
          );
        const data = await res.json();
        setRecommends(data.results.slice(0, 20));
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setIsFetching(false);
        setIsFetchingRecommends(false);
      });
  }, [id]);
  // console.log("isFetching", isFetching);

  const {
    title,
    original_title,
    poster_path,
    backdrop_path,
    release_date,
    genres,
    runtime,
    vote_average,
    vote_count,
    tagline,
    overview,
    release_dates,
    origin_country = [],
    credits,
    status,
    revenue,
    budget,
    original_language,
  } = movieInfo ?? {};

  const { certification } = useMemo(
    () =>
      (
        (release_dates?.results ?? []).find((item) =>
          ["US", "VN", ...origin_country].includes(item.iso_3166_1),
        ) || (release_dates?.results ?? []).find((item) => item.iso_3166_1)
      )?.release_dates.find((item) => item.certification) ?? {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(release_date), JSON.stringify(origin_country)],
  );
  // console.log({ certification });

  const crews = useMemo(() => {
    const grouped = Object.groupBy(credits?.crew ?? [], (item) => item.id);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(credits?.crews)]);
  // console.log({ crews });

  return (
    <div className="relative">
      <div
        className={`${!isFetching ? "animate-fadeout" : "animate-fadein"} absolute inset-0`}
      >
        <LoadingIndicator />
      </div>
      {!isFetching && (
        <div className={`animate-fadein text-sm lg:text-[1.35vw]`}>
          <Banner
            id={id}
            title={title || original_title}
            certification={certification}
            crews={crews}
            poster_path={poster_path}
            backdrop_path={backdrop_path}
            release_date={release_date}
            genres={genres}
            runtime={runtime}
            vote_average={vote_average}
            vote_count={vote_count}
            tagline={tagline}
            overview={overview}
            media_type={media_type}
          />
          <div className="px-[4%]">
            <div className="mx-auto flex max-w-6xl py-5 sm:py-8 2xl:max-w-screen-xl">
              <div className="flex-1 overflow-hidden">
                <ActorList actors={(credits?.cast || []).slice(0, 32)} />
                <Separator />
                <RelatedMediaList
                  mediaList={recommends}
                  isFetching={isFetchingRecommends}
                />
              </div>
              <div className="w-[260px]">
                <MovieInformation
                  original_title={original_title}
                  status={status}
                  origin_countries={origin_country}
                  revenue={revenue}
                  budget={budget}
                  original_language={original_language}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MovieDetail;
