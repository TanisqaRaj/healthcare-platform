import express from 'express';
import {
    createAppointment,
    // getCurrentAppointments,
    getAppointmentHistory,
    getUserAppointments,
    getDoctorAppointments,
    approveAppointment,
    cancelAppointment
   
    //deleteAppointment
} from '../controllers/appointmentControl.js';

const appointmentRoute = express.Router();

// 🗓️ Create a new appointment (as-is)
appointmentRoute.post('/create', createAppointment);

// 🌱 Get current and future appointments
appointmentRoute.get('/current/:userId', getUserAppointments);

// 📜 Get appointment history (past appointments)
appointmentRoute.get('/history/:userId', getAppointmentHistory);



// ❌ Delete appointment
//appointmentRoute.delete('/delete/:appointmentId', deleteAppointment);

//**************************************************************************************************** */

//Doctor dash appointment Routes

appointmentRoute.get('/docapp/:doctorId',getDoctorAppointments);

//approval route for appointment

appointmentRoute.put('/approve/:appointmentId',approveAppointment);

//cancellation of appointment
appointmentRoute.put('/cancel/:appointmentId',cancelAppointment);

export default appointmentRoute;
