const COLORS = {
  green: {
    primary: "#21d07a",
    secondary: "#204529",
  },
  yellow: {
    primary: "#d2d531",
    secondary: "#3e3b10",
  },
  red: {
    primary: "#db2360",
    secondary: "#571435",
  },
  notRated: {
    secondary: "#666666",
  },
};

const CircularProgressBar = ({ percent = 0, scale = 1, isRated = true }) => {
  const size = 44,
    strokeWidth = 4;

  if (!percent) percent = 0;
  percent = Math.min(percent, 100);
  const r = size / 2 - strokeWidth / 2;
  const color = !isRated
    ? COLORS.notRated
    : percent >= 70
      ? COLORS.green
      : percent >= 50
        ? COLORS.yellow
        : COLORS.red;
  return (
    <div className="cursor-default">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        transform={`scale(${scale})`}
      >
        <circle
          r={r}
          fill="rgba(4,14,17, 0.95)"
          cx={size / 2}
          cy={size / 2}
          stroke={color.secondary}
          strokeWidth={strokeWidth - 0.5}
        />
        <circle
          r={r}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          stroke={color.primary}
          strokeWidth={strokeWidth}
          strokeDasharray={r * 2 * Math.PI}
          strokeDashoffset={r * 2 * Math.PI * (1 - percent / 100)}
          strokeLinecap="round"
          transform="scale(-1,1) rotate(-90)"
          style={{ transformOrigin: "center" }}
        />
        <text
          x={size / 2}
          y={size / 2}
          fill="white"
          alignmentBaseline="middle"
          textAnchor="middle"
          className="text-sm font-bold"
        >
          {isRated ? percent : "NR"}
          {isRated && (
            <tspan
              fill="white"
              className="text-[9px] font-light"
              alignmentBaseline="after-edge"
            >
              %
            </tspan>
          )}
        </text>
        {/* <circle r={1} cx={25} cy={25} fill="red" /> */}
      </svg>
    </div>
  );
};
export default CircularProgressBar;
