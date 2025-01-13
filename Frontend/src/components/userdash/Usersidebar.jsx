import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import icon from "../../assets/images/account.png";

// Create a Context to manage the Sidebar state
const SidebarContext = createContext();

export default function Usersidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        {/* Logo and Toggle Button */}
        <div className="p-4 pb-2 flex justify-between items-center">
         
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* User Profile Section */}
        <div className="border-b flex items-center p-3">
          <img src={icon} alt="User Avatar" className="w-10 h-10 rounded-md" />
          <div
            className={`flex items-center overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold truncate">Gaurav</h4>
              <span className="text-xs text-gray-600 truncate">
                gaurav@gmail.com
              </span>
            </div>
            <MoreVertical size={20} className="ml-auto text-gray-600" />
          </div>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  );
}

export function UsersidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onclick}
      role="button"
      tabIndex={0}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <span
          className={`absolute right-2 w-2 h-2 rounded-full bg-red-500 ${
            expanded ? "" : "top-2"
          }`}
        ></span>
      )}
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-0 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          
          {text}
          
          
        </div>
      )}
    </li>
  );
}
