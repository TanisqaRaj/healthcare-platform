import React from "react";
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
} from "lucide-react";

const UserDash = () => {
  return (
    <div className="flex">
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
  );
};

export default UserDash;
