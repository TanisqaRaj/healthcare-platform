import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="w-full px-10 py-16 flex">
      <div className="w-full shadow-lg rounded-lg p-16 items-center justify-center border">
        <div className="h-28 w-28 mb-12 border shadow-2xl rounded-full overflow-hidden">
          <img
            src={`data:image/png;base64,${user?.image}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div><strong>Name : </strong>{user?.name}</div>
        <div><strong>Username : </strong>{user?.username}</div>
        <div><strong>Contact : </strong>{user?.phone}</div>
        <div><strong>Email : </strong>{user?.email}</div>
        <div><strong>Gender : </strong>{user?.gender}</div>

        <button className="mt-10 border px-5 text-gray-900 text-sm font-semibold py-1 rounded-lg bg-emerald-200">
          Edit
        </button>
      </div>
      <div className="w-full shadow-lg rounded-lg p-16 items-center justify-center border">
        <div className="h-28 w-28 mb-12 border shadow-2xl rounded-full overflow-hidden">
          <img
            src={`data:image/png;base64,${user?.image}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div><strong>Name : </strong>{user?.name}</div>
        <div><strong>Username : </strong>{user?.username}</div>
        <div><strong>Contact : </strong>{user?.phone}</div>
        <div><strong>Email : </strong>{user?.email}</div>
        <div><strong>Gender : </strong>{user?.gender}</div>

        <button className="mt-10 border px-5 text-gray-900 text-sm font-semibold py-1 rounded-lg bg-emerald-200">
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
