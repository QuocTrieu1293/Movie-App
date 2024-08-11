const PlaceholderText = ({ text = "No data to display" }) => {
  return <p className="text-center text-base italic text-slate-500">{text}</p>;
};
export default PlaceholderText;
