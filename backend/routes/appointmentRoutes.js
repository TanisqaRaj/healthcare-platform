import express from 'express';
import { createAppointment  , getAllAppointments ,getAppointmentByGeneratedId } from '../controllers/appointmentControl.js';

const appointmentRoute = express.Router();

// Route to create a new appointment
appointmentRoute.post('/create', createAppointment);
//Route to get all appointments
appointmentRoute.get('/getall', getAllAppointments);
//Route to get appointment by ID
appointmentRoute.get('/search/:appointmentID', getAppointmentByGeneratedId);
//Route to delete appointment by ID


export default appointmentRoute;
