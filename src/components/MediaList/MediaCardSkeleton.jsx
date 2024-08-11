import imagePlaceholder from "/assets/image_placeholder.svg";
import CircularProgressBar from "@components/CircularProgressBar";

const MediaCardSkeleton = () => {
  return (
    <div className="flex-col rounded-[9px] border border-slate-700">
      <div className="aspect-[342/513] rounded-b-2xl rounded-t-lg">
        <img
          src={imagePlaceholder}
          alt="image placeholder"
          className="h-full w-full animate-pulse rounded-b-2xl rounded-t-lg object-cover object-center"
        />
      </div>
      <div className="relative -top-5 flex flex-1 flex-col px-2">
        <CircularProgressBar isRated={false} />
        <div className="mt-1.5 h-4 animate-pulse rounded-lg bg-slate-300"></div>
        <div className="mt-1.5 h-4 animate-pulse rounded-lg bg-slate-300"></div>
      </div>
    </div>
  );
};
export default MediaCardSkeleton;
