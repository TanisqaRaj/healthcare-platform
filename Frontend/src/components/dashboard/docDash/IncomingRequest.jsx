import React, { useEffect, useState } from "react";
import axios from "axios";
const IncomingRequest = () => {
  // const appointmentState = [
  //   {
  //     name: "Alisha",
  //     contact: "1234567890",
  //     mail: "sanu@gmail.com",
  //     gender: "Female",
  //     age: "25",
  //     address: "Patna",
  //     title: "Alzheimer",
  //     desc: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     mode: "Offline",
  //     date: "12/3/2025",
  //     state: "Accepted",
  //   },
  //   {
  //     name: "Alisha",
  //     contact: "1234567890",
  //     mail: "sanu@gmail.com",
  //     gender: "Female",
  //     age: "25",
  //     address: "Patna",
  //     title: "Alzheimer",
  //     desc: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     mode: "Offline",
  //     date: "12/3/2025",
  //     state: "Accepted",
  //   },
  //   {
  //     name: "Alisha",
  //     contact: "1234567890",
  //     mail: "sanu@gmail.com",
  //     gender: "Female",
  //     age: "25",
  //     address: "Ambala",
  //     title: "Alzheimer",
  //     desc: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     mode: "Offline",
  //     date: "12/3/2025",
  //     state: "Accepted",
  //   },
  //   {
  //     name: "Alisha",
  //     contact: "1234567890",
  //     mail: "sanu@gmail.com",
  //     gender: "Female",
  //     age: "25",
  //     address: "Patna",
  //     title: "Alzheimer",
  //     desc: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     mode: "Offline",
  //     date: "12/3/2025",
  //     state: "Accepted",
  //   },
  // ];
  
  // const appointment_Id = "67bc65be0983e0b037acead7";

  const [appointmentState, setAppointmentState] = useState([]);
  const fetchAppointmentlist = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/appointments/seedetails/${appointment_Id}`
      );
      const success = response?.data?.success;

      if (success) {
        console.log(response.data);
        const list = response.data.appointmentDetails;
        setAppointmentState(list);
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

  return (
    <div className="w-full">
      <div className="pb-5 ">
        <p className="px-4 pt-10 lg:px-10 pb-6 text-2xl font-bold text-gray-700">
          Appointments
        </p>
        <div className="overflow-x-auto px-4 lg:px-10 ">
          <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
            {/* table column name */}
            <thead className="bg-emerald-200 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-3 border">Name</th>
                <th className="px-4 py-3 border">Age</th>
                <th className="px-4 py-3 border">Gender</th>
                <th className="px-4 py-3 border">Contact</th>
                <th className="px-4 py-3 border">Email</th>
                <th className="px-4 py-3 border">Address</th>
                <th className="px-4 py-3 border">Disease</th>
                <th className="px-4 py-3 border">Description</th>
                <th className="px-4 py-3 border">Mode</th>
                <th className="px-4 py-3 border">Date</th>
                <th className="px-4 py-3 border">State</th>
              </tr>
            </thead>

            {/* table body */}
            <tbody className="shadow-2xl">
              {appointmentState.map((item, index) => (
                <tr
                  key={index}
                  className="text-gray-800 text-center border hover:bg-gray-100"
                >
                  <td className="px-4 py-3 border">{item.patientName}</td>
                  <td className="px-4 py-3 border">{item.age}</td>
                  <td className="px-4 py-3 border">{item.gender}</td>
                  <td className="px-4 py-3 border">{item.patientPhone}</td>
                  {/* <td className="px-4 py-3 border">{item.mail}</td> */}
                  <td className="px-4 py-3 border">{item.address}</td>
                  <td className="px-4 py-3 border">{item.title}</td>
                  <td className="px-4 py-3 border">{item.desc}</td>
                  <td className="px-4 py-3 border">{item.mode}</td>
                  <td className="px-4 py-3 border">{item.appointmentDate}</td>
                  <td className="px-4 py-3 border">
                    <button className="borde bg-emerald-600 rounded-2xl p-1 space-y-1 shadow-xl">
                      Accept
                    </button>
                    <button className="border bg-red-400 rounded-2xl p-1 space-y-1 px-2 shadow-xl">
                      Reject
                    </button>
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

export default IncomingRequest;
