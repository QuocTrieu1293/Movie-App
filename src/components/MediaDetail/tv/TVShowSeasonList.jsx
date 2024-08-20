import TVShowSeason from "./TVShowSeason";

const TVShowSeasonList = ({ seasons = [], tvShow }) => {
  // const cnt = useRef(0);
  // cnt.current += 1;
  // console.log("parent comp render", cnt.current);

  return (
    <div>
      <h3 className="text-lg font-bold lg:text-[1.65vw]">Seasons</h3>
      <div className="my-3 space-y-6 sm:mt-5">
        {seasons.map((season) => (
          <TVShowSeason key={season.id} data={season} tvShow={tvShow} />
        ))}
        {/* <TVShowSeason key={seasons[2].id} data={seasons[2]} tvShow={tvShow} /> */}
      </div>
    </div>
  );
};
export default TVShowSeasonList;
