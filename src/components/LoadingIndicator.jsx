const LoadingIndicator = () => {
  return (
    <div className="flex h-40 items-center justify-center">
      {/* <div className="inline-block h-11 w-11 rounded-full border-4 border-slate-300 border-t-netflix_red"></div> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={44}
        height={44}
        className="animate-spin"
      >
        <circle
          r={20}
          cx={22}
          cy={22}
          className="fill-none stroke-gray-300 stroke-[3.6px]"
        />
        <circle
          r={20}
          cx={22}
          cy={22}
          strokeLinecap="round"
          strokeDashoffset={0.8 * 40 * Math.PI}
          strokeDasharray={40 * Math.PI}
          className="fill-none stroke-netflix_red stroke-[4px]"
        />
      </svg>
    </div>
  );
};
export default LoadingIndicator;
