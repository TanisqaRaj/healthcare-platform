import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import  appointmentRoute from'./routes/appointmentRoutes.js';
import doctorRoute from './routes/doctorRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb'}));
// Middleware
var corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // Use the auth route as the base path

//appointment routes
app.use('/appointments', appointmentRoute); // Use the appointment route as the base path

//doctor routes
app.use('/doctors', doctorRoute); // Use the doctor route as the base path

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Main server running on port ${PORT}`);
});
