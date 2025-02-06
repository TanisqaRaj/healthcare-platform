import React from 'react';
import { useSelector } from 'react-redux';

const AppointmentList = () => {
  const appointments = useSelector((state) => state.appointments.appointments);

  return (
    <div>
      <h2>Appointment List</h2>
      <ul>
        {appointments.length > 0 ? (
          appointments.map((appointment, index) => (
            <li >
              
            </li>
          ))
        ) : (
          <p>No appointments yet</p>
        )}
      </ul>
    </div>
  );
};

export default AppointmentList;
