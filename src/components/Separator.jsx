import PropTypes from "prop-types";

const Separator = ({ type = "horizontal" }) => {
  return (
    <div
      className={`border-gray-500 ${type === "horizontal" ? `my-10 h-0 w-full border-t` : `my-10 h-full w-0 border-l`}`}
    ></div>
  );
};

Separator.propTypes = {
  type: PropTypes.oneOf(["horizontal", "vertical"]),
  space: PropTypes.number,
};

export default Separator;
