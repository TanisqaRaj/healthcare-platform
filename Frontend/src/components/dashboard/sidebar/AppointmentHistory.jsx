import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AppointmentHistory = () => {
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const userId = useSelector((state) => state.auth.user._id);

  const fetchAppointmentHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/appointments/history/${userId}`
      );
      console.log("userId is", userId);
      console.log("appointment history list ", response.data);
      const success = response?.data?.success;

      if (success) {
        const list = response.data.appointments;
        setAppointmentHistory(list || []);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchAppointmentHistory();
  }, []);

  return (
    <div className="w-full">
      <div className="pb-5">
        <p className="px-4 pt-10 lg:px-10 pb-6 text-2xl font-bold text-gray-700">
          Appointments History
        </p>
        <div className="overflow-x-auto px-4 lg:px-10">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            {/* table column name */}
            <thead className="bg-emerald-200 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Appointment Id</th>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Contact</th>
                <th className="px-4 py-3 border">Age</th>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Mode</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Dr. Name</th>
                <th className="px-4 py-3 border">State</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody>
              {appointmentHistory.map((item, index) => (
                <tr
                  key={index}
                  className="text-gray-800 text-center border hover:bg-gray-100"
                >
                  <td className="px-4 py-3 border">
                    {item.appointment.customAppointmentId}
                  </td>
                  <td className="px-4 py-3 border">{item.patient.name}</td>
                  <td className="px-4 py-3 border">{item.patient.phone}</td>
                  <td className="px-4 py-3 border">{item.patient.age}</td>
                  <td className="px-4 py-3 border">{item.appointment.title}</td>
                  <td className="px-4 py-3 border">{item.appointment.mode}</td>
                  <td className="px-4 py-3 border">{item.appointment.date}</td>
                  <td className="px-4 py-3 border">{item.doctor.name}</td>

                  {/* appointment state */}
                  <td
                    className={`px-4 py-3 border ${
                      item.status === "Pending"
                        ? "text-yellow-500"
                        : item.status === "Accepted"
                        ? "text-green-500"
                        : item.status === "Rejected"
                        ? "text-red-500"
                        : "text-gray-800"
                    }`}
                  >
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AppointmentHistory;
