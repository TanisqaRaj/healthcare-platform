import Usersidebar, { UsersidebarItem } from "./Usersidebar"; // Ensure `UsersidebarItem` is properly imported
import {
  Home,
  LayoutDashboard,
  Calendar,
  List,
  History,
  ShoppingBag,
  HelpCircle,
  LogOut,
  Search,
} from "lucide-react";

const UserDash = () => {
  const handleSearch = () => {
    // Handle the search logic here
    console.log("Search button clicked");
  };

  return (
    <div>
      {/* Header */}
      {/* <div className="flex items-center justify-between bg-gray-100 p-4 shadow-md"> */}
        {/* Logo */}
        {/* <div className="flex items-center">
          <img src="/path/to/logo.png" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-xl font-semibold ml-2">Medi mentor</h1>
        </div> */}

        {/* Search Box */}
        {/* <div className="flex items-center w-full max-w-md mx-auto bg-white rounded-full shadow-sm border border-gray-300 px-4 py-2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 px-2 text-gray-700 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white p-2 rounded-full ml-2"
          >
            <Search size={20} />
          </button>
        </div> */}
      {/* </div> */}

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <Usersidebar>
          {/* Sidebar Items */}
          <UsersidebarItem
            icon={<Home size={20} />}
            text="Home"
            alert="3" // Adding an alert for the Home item
          />
          <UsersidebarItem
            icon={<LayoutDashboard size={20} />}
            text="Dashboard"
            active // Mark this item as active
          />
          <UsersidebarItem
            icon={<Calendar size={20} />}
            text="Appointment"
          />
          <UsersidebarItem
            icon={<List size={20} />}
            text="Appointment List"
          />
          <UsersidebarItem
            icon={<History size={20} />}
            text="History"
          />
          <UsersidebarItem
            icon={<ShoppingBag size={20} />}
            text="Buy Medicines"
          />
          <UsersidebarItem
            icon={<HelpCircle size={20} />}
            text="Help"
          />
          <UsersidebarItem
            icon={<LogOut size={20} />}
            text="Logout"
          />
        </Usersidebar>
      </div>
    </div>
  );
};

export default UserDash;
