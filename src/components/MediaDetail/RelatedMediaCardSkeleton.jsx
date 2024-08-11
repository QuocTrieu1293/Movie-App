import CircularProgressBar from "@components/CircularProgressBar";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RelatedMediaCardSkeleton = () => {
  return (
    <div>
      <div className="relative aspect-video rounded-[7px] border border-slate-700">
        <img
          src="/assets/image_placeholder.svg"
          className="h-full w-full animate-pulse rounded-md object-cover object-center"
        />
        <div className="absolute inset-x-0 bottom-0 rounded-b-md bg-slate-950/90 p-2 py-[10px] text-sm">
          <div className="flex items-baseline gap-1.5">
            <FontAwesomeIcon icon={faCalendar} className="text-base" />
            <div className="h-3.5 w-16 animate-pulse rounded-lg bg-slate-300"></div>
          </div>
          <div className="absolute -top-[4px] right-0">
            <CircularProgressBar isRated={false} scale={0.7} />
          </div>
        </div>
      </div>
      <div className="relative left-1/2 mt-1 h-4 w-52 -translate-x-1/2 animate-pulse rounded-lg bg-slate-300"></div>
    </div>
  );
};
export default RelatedMediaCardSkeleton;
