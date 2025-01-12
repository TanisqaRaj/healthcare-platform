import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import  appointmentRoute from'./routes/appointmentRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // Use the auth route as the base path

//appointment routes
app.use('/appointments', appointmentRoute); // Use the appointment route as the base path

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Main server running on port ${PORT}`);
});
