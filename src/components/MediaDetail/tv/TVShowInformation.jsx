import { useAppContext } from "@context/AppProvider";
import { getDisplayName, getImageURL, imageSize } from "@utils";
import { useMemo } from "react";

const TVShowInformation = ({
  original_name,
  status,
  origin_countries = [],
  networks = [],
  original_language,
}) => {
  const { languages } = useAppContext();

  const language = useMemo(
    () => languages.find((lang) => lang.iso_639_1 === original_language) ?? {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(languages), original_language],
  );

  return (
    <div className="pl-10">
      <h3 className="text-xl font-bold">Information</h3>
      <div className="mt-5 flex flex-col gap-5 text-base font-light">
        <div>
          <p className="font-semibold">Original Name</p>
          <p>{original_name || <>&nbsp;-</>}</p>
        </div>
        <div>
          <p className="font-semibold">Status</p>
          <p>{status || <>&nbsp;-</>}</p>
        </div>
        <div>
          <p className="font-semibold">
            {origin_countries.length > 1
              ? "Original Countries"
              : "Original Country"}
          </p>
          <div className="mt-1 flex gap-2">
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
          <p className="mb-2 font-semibold">
            {networks.length > 1 ? "Networks" : "Network"}
          </p>
          {networks.length > 0 ? (
            <ul className="mx-auto w-11/12 flex-col rounded-lg bg-[#F0EFEF] p-2 py-3 font-semibold text-black shadow-md">
              {networks.length > 0 ? (
                networks.map((network) => (
                  <li key={network.id} className="mb-2 h-[30px]">
                    {network.logo_path ? (
                      <img
                        alt={network.name}
                        src={getImageURL(network.logo_path, imageSize.logo.h30)}
                        className="h-[30px]"
                        loading="lazy"
                      />
                    ) : (
                      network.name
                    )}
                  </li>
                ))
              ) : (
                <>&nbsp;-</>
              )}
            </ul>
          ) : (
            <>&nbsp;-</>
          )}
        </div>
      </div>
    </div>
  );
};
export default TVShowInformation;
