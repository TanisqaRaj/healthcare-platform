
import { IoMdSearch } from "react-icons/io";

const DashHeader = () => {
  return (
    <header className="h-16 flex px-10  w-[95vw]  right-0 z-50">
      <div className="h-full container mx-auto flex items-center px-4 py-3 justify-between">
        {/*----------- Dashboard Text ---------------*/}
        <div className="flex-none hidden lg:block">
          <h1 className="font-bold text-2xl text-gray-700">DASHBOARD</h1>
        </div>

        {/*----------- SearchBar and SearchLogo ---------------*/}
        <div className="flex  items-center flex-grow justify-end max-w-sm border rounded-full hover:border-emerald-500 pl-4">
          <input
            type="text"
            placeholder="Search Doctor here..."
            className="w-full h-8 pl-2 outline-none rounded-l-full"
          ></input>
          <div className="text-lg min-w-[40px] h-8 bg-emerald-400 flex items-center justify-center rounded-r-full">
            <IoMdSearch />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashHeader;
