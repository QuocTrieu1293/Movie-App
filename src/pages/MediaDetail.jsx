import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GETRequestOption } from "@utils";
import Banner from "@components/MediaDetail/Banner";
import LoadingIndicator from "@components/LoadingIndicator";
import ActorList from "@components/MediaDetail/ActorList";
import MovieInformation from "@components/MediaDetail/MovieInformation";
import RelatedMediaList from "@components/MediaDetail/RelatedMediaList";
import Separator from "@components/Separator";

const MediaDetail = () => {
  const { id } = useParams();
  const [mediaInfo, setMediaInfo] = useState();
  const [recommends, setRecommends] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingRecommends, setIsFetchingRecommends] = useState(false);

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
        setMediaInfo(data);
        setIsFetching(false);
        return fetch(
          `https://api.themoviedb.org/3/movie/${id}/recommendations`,
          GETRequestOption,
        );
      })
      .then(async (res) => {
        if (!res.ok)
          return new Error(
            `>>> Fetching RelatedMediaList id=${id} failed with status code ${res.status}`,
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

  return (
    <div className="relative">
      <div
        className={`${!isFetching ? "animate-fadeout" : "animate-fadein"} absolute inset-0`}
      >
        <LoadingIndicator />
      </div>
      {!isFetching && (
        <div className={`animate-fadein text-sm lg:text-[1.35vw]`}>
          <Banner mediaInfo={mediaInfo} />
          <div className="px-[4%]">
            <div className="mx-auto flex max-w-6xl py-5 sm:py-8 2xl:max-w-screen-xl">
              <div className="flex-1 overflow-hidden">
                <ActorList actors={mediaInfo?.credits?.cast.slice(0, 32)} />
                <Separator />
                <RelatedMediaList
                  mediaList={recommends}
                  isFetching={isFetchingRecommends}
                />
              </div>
              <div className="w-[260px]">
                <MovieInformation data={mediaInfo} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MediaDetail;
