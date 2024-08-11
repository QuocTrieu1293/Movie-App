import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex h-10 items-center justify-between bg-slate-950 px-[4%] text-base text-white sm:h-14">
      <div className="flex items-center gap-4 lg:gap-6">
        <Link to="/">
          <img src="/netflix.png" className="w-24 sm:w-28" alt="netflix logo" />
        </Link>
        <a href="#">Movies</a>
        <a href="#">TV Shows</a>
      </div>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="cursor-pointer text-lg"
      />
    </header>
  );
};
export default Header;
