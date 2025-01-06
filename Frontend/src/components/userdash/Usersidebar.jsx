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
          <img
            src="data:image/jpeg;base64,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"
            alt="Logo"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {/* Sidebar Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        {/* User Profile Section */}
        <div className="border-t flex items-center p-3">
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
      </nav>
    </aside>
  );

}

export function UsersidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
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
