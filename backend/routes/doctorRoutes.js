import express from 'express';
import { getDoctors, getTotalDoctors, searchdoctor } from '../controllers/getdetails.js'; // Corrected import to match function name
const doctorRoute = express.Router();
// 🔎 Doctor Search (Public)
doctorRoute.get('/searchdoctor', searchdoctor); // Corrected function name to match import
//get all doctors
doctorRoute.get('/listdoctors',getDoctors)

//get total count of doc
doctorRoute.get('/totaldoctors',getTotalDoctors)
export default doctorRoute;
