import { formatNumber, getDisplayName } from "@utils";

const MovieInformation = ({ data = {} }) => {
  const {
    original_title,
    status,
    origin_country: origin_countries = [],
    revenue,
    budget,
    original_language,
  } = data;

  return (
    <div className="pl-10">
      <h3 className="text-lg font-bold">Information</h3>
      <div className="mt-5 flex flex-col gap-5 text-base font-light">
        <div>
          <p className="font-semibold">Original Name</p>
          <p>{original_title || "-"}</p>
        </div>
        <div>
          <p className="font-semibold">Status</p>
          <p>{status || "-"}</p>
        </div>
        <div>
          <p className="font-semibold">Original Countries</p>
          <div className="mt-1 flex gap-1">
            {origin_countries.length === 0
              ? "-"
              : origin_countries.map((country_code) => (
                  <img
                    key={country_code}
                    src={`https://flagcdn.com/32x24/${country_code.toLowerCase()}.png`}
                    width="32"
                    height="24"
                    alt={getDisplayName(country_code, "region")}
                    title={getDisplayName(country_code, "region")}
                  />
                ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Original Language</p>
          <p>{original_language ? getDisplayName(original_language) : "-"}</p>
        </div>
        <div>
          <p className="font-semibold">Budget</p>
          <p>{budget ? formatNumber(budget, "currency") : "-"}</p>
        </div>
        <div>
          <p className="font-semibold">Revenue</p>
          <p>{revenue ? formatNumber(revenue, "currency") : "-"}</p>
        </div>
      </div>
    </div>
  );
};
export default MovieInformation;
