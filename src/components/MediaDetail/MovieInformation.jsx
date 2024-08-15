import { useAppContext } from "@context/AppProvider";
import { formatNumber, getDisplayName } from "@utils";
import { useMemo } from "react";

const MovieInformation = ({ data = {} }) => {
  const { languages } = useAppContext();

  const {
    original_title,
    status,
    origin_country: origin_countries = [],
    revenue,
    budget,
    original_language,
  } = data;

  const language = useMemo(
    () => languages.find((lang) => lang.iso_639_1 === original_language) ?? {},
    [languages, original_language],
  );

  return (
    <div className="pl-10">
      <h3 className="text-xl font-bold">Information</h3>
      <div className="mt-5 flex flex-col gap-5 text-base font-light">
        <div>
          <p className="font-semibold">Original Name</p>
          <p>{original_title || <>&nbsp;-</>}</p>
        </div>
        <div>
          <p className="font-semibold">Status</p>
          <p>{status || <>&nbsp;-</>}</p>
        </div>
        <div>
          <p className="font-semibold">Original Countries</p>
          <div className="mt-1 flex gap-1">
            {origin_countries.length === 0 ? (
              <>&nbsp;-</>
            ) : (
              origin_countries.map((country_code) => (
                <img
                  key={country_code}
                  src={`https://flagcdn.com/32x24/${country_code.toLowerCase()}.png`}
                  width="32"
                  height="24"
                  alt={getDisplayName(country_code, "region")}
                  title={getDisplayName(country_code, "region")}
                />
              ))
            )}
          </div>
        </div>
        <div>
          <p className="font-semibold">Original Language</p>
          <p>{language.english_name || language.name || <>&nbsp;-</>}</p>
        </div>
        <div>
          <p className="font-semibold">Budget</p>
          <p>{budget ? formatNumber(budget, "currency") : <>&nbsp;-</>}</p>
        </div>
        <div>
          <p className="font-semibold">Revenue</p>
          <p>{revenue ? formatNumber(revenue, "currency") : <>&nbsp;-</>}</p>
        </div>
      </div>
    </div>
  );
};
export default MovieInformation;
