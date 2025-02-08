import express from 'express';
import { searchdoctor } from '../controllers/getdetails.js'; // Corrected import to match function name
const doctorRoute = express.Router();
// 🔎 Doctor Search (Public)
doctorRoute.get('/searchdoctor', searchdoctor); // Corrected function name to match import
export default doctorRoute;
