import React, { useEffect, useState } from "react";
import DetailedAppoitmentList from "./DetailedAppoitmentList";
// import {io} from "socket.io-client";
// const socket = io("http://localhost:8080/");

const AppointmentList = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // const [appointmentState, setAppointmentState] = useState([
  //   {
  //     name: "Sanu",
  //     contact: "1234567890",
  //     title: "Fever",
  //     desc: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     mail: "sanu@gmail.com",
  //     mode: "Online",
  //     date: "12/3/2025",
  //     dname: "Sanu",
  //     dcontact: "1234567890",
  //     username: "sanukumar",
  //     bio: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     gender: "male",
  //     dmail: "sanu1@gmail.com",
  //     profession: [
  //       "General Physician",
  //       "Cardiologist",
  //       "GeneralSurgeon",
  //       "Pediatrician",
  //     ],
  //     department: "cardiology",
  //     experience: "1",
  //     state: "Pending",
  //   },
  //   {
  //     name: "Taranjeet",
  //     contact: "1234567890",
  //     title: "Fever",
  //     desc: "I have fever and cold",
  //     mail: "taran@gmail.com",
  //     mode: "Online",
  //     date: "12/3/2025",
  //     dname: "Sanu",
  //     dcontact: "1234567890",
  //     username: "sanukumar",
  //     bio: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     gender: "male",
  //     dmail: "sanu1@gmail.com",
  //     profession: [
  //       "General Physician",
  //       "Cardiologist",
  //       "GeneralSurgeon",
  //       "Pediatrician",
  //     ],
  //     department: "cardiology",
  //     experience: "1",
  //     state: "Pending",
  //   },
  //   {
  //     name: "Gaurav",
  //     contact: "1234567890",
  //     title: "Fever",
  //     mail: "gaurav@gmail.com",
  //     desc: "I have fever and cold",
  //     mode: "Online",
  //     date: "12/3/2025",
  //     dname: "Sanu",
  //     dcontact: "1234567890",
  //     username: "sanukumar",
  //     bio: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     gender: "male",
  //     dmail: "sanu1@gmail.com",
  //     profession: [
  //       "General Physician",
  //       "Cardiologist",
  //       "GeneralSurgeon",
  //       "Pediatrician",
  //     ],
  //     department: "cardiology",
  //     experience: "1",
  //     state: "Pending",
  //   },
  //   {
  //     name: "Anurag",
  //     contact: "1234567890",
  //     title: "Fever",
  //     desc: "I have fever and cold",
  //     mail: "anurag@gmail.com",
  //     mode: "Online",
  //     date: "12/3/2025",
  //     dname: "Sanu",
  //     dcontact: "1234567890",
  //     username: "sanukumar",
  //     bio: "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
  //     gender: "male",
  //     dmail: "sanu1@gmail.com",
  //     profession: [
  //       "General Physician",
  //       "Cardiologist",
  //       "GeneralSurgeon",
  //       "Pediatrician",
  //     ],
  //     department: "cardiology",
  //     experience: "1",
  //     state: "Pending",
  //   },
  // ]);

  const appointmentState = [
    {
      "patient": {
        "name": "Tanisqa",
        "contact": "1234567890",
        "mail": "sanu@gmail.com"
      },
      "doctor": {
        "dname": "Taranjeet",
        "dcontact": "1234567890",
        "username": "taran",
        "bio": "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
        "gender": "male",
        "dmail": "taran1@gmail.com",
        "profession": [
          "General Physician",
          "Cardiologist",
          "General Surgeon",
          "Pediatrician"
        ],
        "department": "cardiology",
        "experience": "1"
      },
      "title": "Fever",
      "desc": "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
      "mode": "Online",
      "date": "12/3/2025",
      "state": "Pending"
    },
    {
      "patient": {
        "name": "Taranjeet",
        "contact": "1234567890",
        "mail": "taran@gmail.com"
      },
      "doctor": {
        "dname": "Alisha",
        "dcontact": "1234567890",
        "username": "alishaalisha",
        "bio": "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
        "gender": "male",
        "dmail": "alisha1@gmail.com",
        "profession": [
          "General Physician",
          "Cardiologist",
          "General Surgeon",
          "Pediatrician"
        ],
        "department": "cardiology",
        "experience": "1"
      },
      "title": "Fever",
      "desc": "I have fever and cold",
      "mode": "Online",
      "date": "12/3/2025",
      "state": "Pending"
    },
    {
      "patient": {
        "name": "Gaurav",
        "contact": "1234567890",
        "mail": "gaurav@gmail.com"
      },
      "doctor": {
        "dname": "Anurag",
        "dcontact": "1234567890",
        "username": "anuragkumar",
        "bio": "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
        "gender": "male",
        "dmail": "anurag1@gmail.com",
        "profession": [
          "General Physician",
          "Cardiologist",
          "General Surgeon",
          "Pediatrician"
        ],
        "department": "cardiology",
        "experience": "1"
      },
      "title": "Fever",
      "desc": "I have fever and cold",
      "mode": "Online",
      "date": "12/3/2025",
      "state": "Pending"
    },
    {
      "patient": {
        "name": "Anurag",
        "contact": "1234567890",
        "mail": "anurag@gmail.com"
      },
      "doctor": {
        "dname": "Gaurav",
        "dcontact": "1234567890",
        "username": "gauravkumar",
        "bio": "I have fever and coldI have fever and coldI have fever and coldI have fever and coldI have fever and cold",
        "gender": "male",
        "dmail": "gaurav1@gmail.com",
        "profession": [
          "General Physician",
          "Cardiologist",
          "General Surgeon",
          "Pediatrician"
        ],
        "department": "cardiology",
        "experience": "1"
      },
      "title": "Fever",
      "desc": "I have fever and cold",
      "mode": "Online",
      "date": "12/3/2025",
      "state": "Pending"
    }
  ]
  
  const handleShowDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setPopupVisible(true);
  };

  // API call
  // const fetchAppointmentlist = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/appointmentState");
  //     console.log(response.data);
  //     const list = response.data.appointmentState;
  //     setAppointmentState(list);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

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
                  <td className="px-4 py-3 border">{item.patient.contact}</td>
                  <td className="px-4 py-3 border">{item.title}</td>
                  <td className="px-4 py-3 border">{item.mode}</td>
                  <td className="px-4 py-3 border">{item.date}</td>
                  <td className="px-4 py-3 border">{item.doctor.dname}</td>
                  <td className="px-4 py-3 border">{item.doctor.dcontact}</td>
                  {/* appointment state */}
                  <td
                    className={`px-4 py-3 border ${
                      item.state === "Pending"
                        ? "text-yellow-500"
                        : item.state === "Accepted"
                        ? "text-green-500"
                        : item.state === "Rejected"
                        ? "text-red-500"
                        : "text-gray-800"
                    }`}
                  >
                    {item.state}
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
