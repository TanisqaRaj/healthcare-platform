import React, { useEffect, useState } from "react";
import DetailedAppoitmentList from "./DetailedAppoitmentList";
import { useSelector } from "react-redux";
import axios from "axios";
// import {io} from "socket.io-client";
// const socket = io("http://localhost:8080/");

const AppointmentList = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentState, setAppointmentState] = useState([]);
  const userId=useSelector((state)=> state.auth.user._id);

  const handleShowDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setPopupVisible(true);
  };

  // API call
  const fetchAppointmentlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/appointments/current/${userId}`
      );
      console.log("userId is", userId);
      console.log("appointment list ",response.data);
      const success = response?.data?.success;

      if (success) {
        const list = response.data.appointments;
        setAppointmentState(list || []);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentlist();
  }, []);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     socket.on("updateAppointment", (updateState) => {
  //       setAppointmentState(updateState);
  //       console.log("State updated successfully", data);
  //     });
  //   });
  //   return () => {
  //     socket.off("updateAppointment");
  //   };
  // }, []);

  const handleClose = () => setPopupVisible(false);

  return (
    <div className="w-full">
      <div className="pb-5">
        <p className="px-4 pt-10 lg:px-10 pb-6 text-2xl font-bold text-gray-700">
          Appointments
        </p>
        <div className="overflow-x-auto px-4 lg:px-10">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            {/* table column name */}
            <thead className="bg-emerald-200 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Contact</th>
                <th className="px-4 py-3 border">Title</th>
                <th className="px-4 py-3 border">Mode</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">Dr. Name</th>
                <th className="px-4 py-3 border">Dr. Contact</th>
                <th className="px-4 py-3 border">State</th>
                <th className="px-4 py-3 border">Details</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody>
              {appointmentState.map((item, index) => (
                <tr
                  key={index}
                  className="text-gray-800 text-center border hover:bg-gray-100"
                >
                  <td className="px-4 py-3 border">{item.patient.name}</td>
                  <td className="px-4 py-3 border">{item.patient.phone}</td>
                  <td className="px-4 py-3 border">{item.appointment.title}</td>
                  <td className="px-4 py-3 border">{item.appointment.mode}</td>
                  <td className="px-4 py-3 border">{item.appointment.date}</td>
                  <td className="px-4 py-3 border">{item.doctor.name}</td>
                  <td className="px-4 py-3 border">{item.doctor.phone}</td>
                  
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

                  {/* get details button */}
                  <td>
                    <button
                      className="mt-2 mb-2 text-sm bg-emerald-400 text-white items-center py-1 px-3 rounded-lg hover:bg-emerald-700 duration-300"
                      onClick={() => handleShowDetails(item)}
                    >
                      get details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DetailedAppoitmentList
        close={handleClose}
        show={popupVisible}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default AppointmentList;
