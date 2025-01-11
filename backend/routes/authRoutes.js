import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { registerDoctor } from '../controllers/authController.js';

const router = express.Router();

// Route for user registration
router.post('/register/user', registerUser); //to register a user

// Route for doctor registration
router.post('/register/doctor', registerDoctor); //to register a doctor

export default router;
