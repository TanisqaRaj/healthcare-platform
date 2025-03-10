import React, { useState } from "react";

const PopupDetailedAppointment = ({ show, close, appointment }) => {

  const handleClose = (e) => {
    if (e.target.id === "detAppList") close();
  };

  if (!show) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      id="detAppList"
      onClick={handleClose}
    >
      <div className="h-[70vh] w-[70vw] flex rounded-lg bg-white shadow-lg overflow-auto">
        {/* cross button */}
        <div
          className="p-2 mb-6 border h-10 rounded-r-lg p-1 hover:cursor-pointer"
          onClick={close}
        >
          X
        </div>

        {/* patient details */}
        <div className="w-[50%] p-6">
          <div className="font-semibold px-6 mb-4 text-2xl text-gray-800">
            Patient Details
          </div>
          <p>
            <strong>Patient Name:</strong> {appointment.patient?.name}
          </p>
          <p>
            <strong>Contact:</strong> {appointment.patient?.phone}
          </p>
          <p>
            <strong>Email:</strong> {appointment.patient?.email}
          </p>
          <p>
            <strong>Title:</strong> {appointment.appointment?.title}
          </p>
          <p>
            <strong>Description:</strong> {appointment.appointment?.description}
          </p>
          <p>
            <strong>Mode:</strong> {appointment.appointment?.mode}
          </p>
          <p>
            <strong>Date:</strong> {appointment.appointment?.date}
          </p>
          <p>
            <strong>Status:</strong> {appointment.status}
          </p>
        </div>

        {/* doctor details */}
        <div className="w-[50%] p-6 bg-emerald-400">
          <div className="px-6 font-semibold text-2xl text-emerald-900">
            Doctor Details
          </div>
          <div className="p-6 text-gray-800">
            <div>
              <strong className="mr-2  text-emerald-900">Name:</strong>{" "}
              {appointment.doctor?.name}
            </div>
            <div>
              <strong className="mr-2 text-emerald-900">Username:</strong>
              {appointment.doctor.username}
            </div>
            <div>
              <strong className="mr-2  text-emerald-900">Contact:</strong>
              {appointment.doctor?.phone}
            </div>

            {/* gender */}
            <div>
              <strong className="mr-2  text-emerald-900">Gender:</strong>
              {appointment.doctor.gender}
            </div>

            <div>
              <strong className="mr-2  text-emerald-900">Email:</strong>
              {appointment.doctor?.email}
            </div>
            <div>
              <strong className="mr-2  text-emerald-900">Bio:</strong>
              {appointment.doctor?.bio}
            </div>

            {/* profession */}
            <div className="flex gap-1 flex-wrap max-w-full">
              <strong className="mr-2  text-emerald-900">Profession:</strong>
              {appointment.doctor.profession.map((profession, index) => (
                <p
                  className="bg-emerald-200 p-1 rounded-lg text-sm"
                  key={index}
                >
                  {profession}
                </p>
              ))}
            </div>
            <div>
              <strong className="mr-2  text-emerald-900">Department:</strong>
              {appointment.doctor?.department}
            </div>
            <div>
              <strong className="mr-2  text-emerald-900">Experience:</strong>
              {appointment.doctor?.experience}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupDetailedAppointment;
