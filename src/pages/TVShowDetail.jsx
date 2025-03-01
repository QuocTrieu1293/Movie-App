import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { GETRequestOption } from "@utils";
import Banner from "@components/MediaDetail/Banner";
import LoadingIndicator from "@components/LoadingIndicator";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import Separator from "@components/Separator";
import TVShowInformation from "@components/MediaDetail/tv/TVShowInformation";
import TVShowSeasonList from "@components/MediaDetail/tv/TVShowSeasonList";

const TVShowDetail = () => {
  const { id } = useParams();
  const media_type = "tv";
  const [tvShowInfo, setTVShowInfo] = useState();
  const [recommends, setRecommends] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [isFetchingRecommends, setIsFetchingRecommends] = useState(true);

  // const cnt = useRef(0);
  // cnt.current += 1;
  // console.log("grand parent comp render", cnt.current);

  // fetch data
  useEffect(() => {
    setIsFetching(true);
    setIsFetchingRecommends(true);
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&append_to_response=content_ratings,aggregate_credits,videos`,
      GETRequestOption,
    )
      .then(async (res) => {
        if (!res.ok)
          throw new Error(
            `>>> Fetching TVShowDetail id=${id} failed with status code ${res.status}`,
          );
        const data = await res.json();
        // console.log({ data });
        setTVShowInfo(data);
        setIsFetching(false);
        return fetch(
          `https://api.themoviedb.org/3/tv/${id}/recommendations`,
          GETRequestOption,
        );
      })
      .then(async (res) => {
        if (!res.ok)
          return new Error(
            `>>> Fetching RelatedMediaList of tv show id=${id} failed with status code ${res.status}`,
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

  // console.log({ tvShowInfo });

  const {
    name,
    original_name,
    poster_path,
    backdrop_path,
    first_air_date,
    genres,
    vote_average,
    vote_count,
    tagline,
    overview,
    status,
    original_language,
    origin_country = [],
    networks = [],
    created_by = [],
    content_ratings,
    aggregate_credits,
    seasons = [],
  } = tvShowInfo ?? {};

  const certification = useMemo(
    () =>
      (
        (content_ratings?.results ?? []).find((item) =>
          ["US", "VN", ...origin_country].includes(item.iso_3166_1),
        ) || (content_ratings?.results ?? []).find((item) => item.iso_3166_1)
      )?.rating,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(content_ratings)],
  );

  const crews = useMemo(
    () =>
      created_by.map((crew) => ({
        id: crew.id,
        name: crew.name || crew.original_name,
        jobs: ["Creator"],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(created_by)],
  );

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
            title={name || original_name}
            certification={certification}
            crews={crews}
            poster_path={poster_path}
            backdrop_path={backdrop_path}
            release_date={first_air_date}
            genres={genres}
            vote_average={vote_average}
            vote_count={vote_count}
            tagline={tagline}
            overview={overview}
            media_type={media_type}
          />
          <div className="px-[4%]">
            <div className="mx-auto flex max-w-6xl py-5 sm:py-8 2xl:max-w-screen-xl">
              <div className="flex-1 overflow-hidden">
                <ActorList
                  actors={(aggregate_credits?.cast || []).slice(0, 32)}
                />
                <Separator />
                <TVShowSeasonList seasons={seasons} tvShow={name} />
                <Separator />
                <RelatedMediaList
                  mediaList={recommends}
                  isFetching={isFetchingRecommends}
                />
              </div>
              <div className="w-[260px]">
                <TVShowInformation
                  original_name={original_name}
                  status={status}
                  origin_countries={origin_country}
                  networks={networks}
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
export default TVShowDetail;
