import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header className="flex h-14 items-center justify-between bg-slate-950 px-[4%] text-sm text-white sm:h-16 sm:text-lg lg:h-20 lg:text-xl">
      <div className="flex items-center gap-4 lg:gap-6">
        <a href="#">
          <img src="./netflix.png" className="w-24 sm:w-28" />
        </a>
        <a href="#">Movies</a>
        <a href="#">TV Shows</a>
      </div>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" />
    </header>
  );
};
export default Header;
