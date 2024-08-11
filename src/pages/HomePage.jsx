import PopularMedias from "@components/PopularMedias";
import MediaList from "@components/MediaList";
import { TOP_RATED_TABS, TRENDING_TABS } from "@utils";

function HomePage() {
  return (
    <div>
      <PopularMedias />
      <MediaList title={"Trending"} tabs={TRENDING_TABS} />
      <MediaList title={"Top Rated"} tabs={TOP_RATED_TABS} />
    </div>
  );
}

export default HomePage;
