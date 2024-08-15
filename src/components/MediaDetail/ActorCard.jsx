import { Link } from "react-router-dom";
import { getImageURL, imageSize } from "@utils";
import ImageComponent from "@components/ImageComponent";

const ActorCard = ({ data = {} }) => {
  const { id, profile_path, name, original_name, character } = data;

  return (
    <div className="h-full w-full max-w-[140px] rounded-lg border-[1.5px] border-slate-700 shadow-lg">
      <Link to={`/person/${id}`}>
        <div className="aspect-[185/278] rounded-t-[7.5px] bg-slate-200 bg-[url('/assets/avatar_placeholder.svg')] bg-contain bg-center bg-no-repeat">
          <ImageComponent
            src={getImageURL(profile_path, imageSize.profile.w185)}
            fallback_src="/assets/person_placeholder.jpg"
            className="aspect-[185/278] rounded-t-[6.5px]"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-3">
        <p className="text-base font-bold leading-normal lg:text-[1.25]">
          <Link
            to={`/person/${id}`}
            className="transition-colors hover:text-netflix_red"
          >
            {name || original_name}
          </Link>
        </p>
        <p className="text-xs font-light leading-normal text-gray-200 lg:text-[1.1vw]">
          {character}
        </p>
        {/* <p className="text-xs font-light leading-normal text-gray-400 lg:text-[1.2vw]">
          16 Episodes
        </p> */}
      </div>
    </div>
  );
};
export default ActorCard;
