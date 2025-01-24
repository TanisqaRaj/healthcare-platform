import React, { useState } from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { FaNotesMedical, FaListUl } from "react-icons/fa";
import { TbHistoryToggle } from "react-icons/tb";
import { AiTwotoneMedicineBox } from "react-icons/ai";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const sidebarItems = [
    { title: "Appointment Form", icon: <FaNotesMedical /> },
    { title: "Appointment List", icon: <FaListUl /> },
    { title: "Appointment History", icon: <TbHistoryToggle /> },
    { title: "Buy Medicine", icon: <AiTwotoneMedicineBox /> },
  ];

  return (
    <div
      className={`${
        open ? "w-[250px]" : "w-[60px]"
      } duration-400 p-4 flex flex-col h-[100vh] bg-emerald-500 text-black rounded-r-xl  justify-start sticky top-0`}
    >
      {/* Toggle Icon */}
      <div
        className={`${
          !open && "rotate-180 justify-center"
        } flex justify-end mb-6 cursor-pointer`}
        onClick={() => setOpen(!open)}
      >
        <BsLayoutSidebarInset />
      </div>

      {/* Profile Picture */}
      {open && (
        <div className="flex flex-col items-center mb-12">
          <div className="h-24 w-24 border shadow-lg rounded-full overflow-hidden">
            <img
              src={`data:image/png;base64,${user?.image}`}
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="mt-4 text-sm  text-gray-800 font-semibold">
            {user?.name}
          </h2>
        </div>
      )}

      {/* Sidebar Items */}
      <div className="space-y-6">
        {sidebarItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 cursor-pointer hover:bg-emerald-600 px-4 py-2 rounded-md ${
              !open && "justify-center"
            }`}
          >
            <div className="text-xl">{item.icon}</div>
            {open && (
              <span className="text-lg  text-gray-800 font-medium">
                {item.title}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
