import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <header className="flex h-16 items-center justify-between bg-slate-950 px-[4%] text-white">
      <div className="flex items-center gap-4">
        <a href="#">
          <img src="./netflix.png" className="w-24 sm:w-28" />
        </a>
        <a href="#">Phim</a>
        <a href="#">Truyền hình</a>
      </div>
      <FontAwesomeIcon icon={faMagnifyingGlass} className="cursor-pointer" />
    </header>
  );
};
export default Header;
