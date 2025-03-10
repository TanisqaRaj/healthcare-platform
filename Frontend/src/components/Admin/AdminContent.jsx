import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import axios from "axios";
const AdminContent = () => {

    const [totalDoctors, setTotalDoctors] = useState(0);
    const [totalUsers, setTotalusers] = useState(0);
  
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/doctors/totalusers"
        );
        const success = response?.data?.success;
  
        if (success) {
          const total = response.data.totalUsers;
          setTotalusers(total);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error("❌ Error fetching total doctors:", error);
      }
    };
  
    const fetchTotalDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/doctors/totaldoctors"
        );
        const success = response?.data?.success;
  
        if (success) {
          const total = response.data.totalDoctors;
          setTotalDoctors(total);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        console.error("❌ Error fetching total doctors:", error);
      }
    };
  
    useEffect(() => {
      fetchTotalUsers();
      fetchTotalDoctors();
      
    }, []);

  return (
    <div className="w-full">
      <div className="pt-20 px-4 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-[30vh]">
          <div className="border shadow-lg rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:shadow-2xl duration-300">
            <div className="text-4xl font-bold text-emerald-700 mb-4">45</div>
            <div className="bg-emerald-200 text-emerald-700 w-full text-center py-2 rounded-md font-medium">
              Number of Appointments
            </div>
          </div>

          <div className="border shadow-lg rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:shadow-2xl duration-300">
            <div className="text-4xl font-bold text-emerald-700 mb-4">12</div>
            <div className="bg-emerald-200 text-emerald-700 w-full text-center py-2 rounded-md font-medium">
              Completed Appointments
            </div>
          </div>

          <div className="border shadow-lg rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:shadow-2xl duration-300">
            <div className="font-bold text-4xl text-emerald-700">
              <CountUp end={totalDoctors} duration={4} />+
            </div>
            <div className="bg-emerald-200 text-emerald-700 w-full text-center py-2 rounded-md font-medium">
              Total Doctors
            </div>
          </div>

          <div className="border shadow-lg rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:shadow-2xl duration-300">
          <div className="font-bold text-4xl text-emerald-700">
                <CountUp end={totalUsers} duration={4} />+
              </div>
            <div className="bg-emerald-200 text-emerald-700 w-full text-center py-2 rounded-md font-medium">
              Total Users
            </div>
          </div>

          <div className="border shadow-lg rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:shadow-2xl duration-300">
            <div className="text-4xl font-bold text-emerald-700 mb-4">8</div>
            <div className="bg-emerald-200 text-emerald-700 w-full text-center py-2 rounded-md font-medium">
              Pending Appointments
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContent;
