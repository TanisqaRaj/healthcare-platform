import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoute from "./routes/appointmentRoutes.js";
import doctorRoute from "./routes/doctorRoutes.js";
import { Server } from "socket.io";  // Corrected import
import http from "http";
import Appointment from "./models/Appointment.js";
import Contract from "./models/Contract.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
// Middleware
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/auth", authRoutes); // Use the auth route as the base path
app.use("/appointments", appointmentRoute); // Use the appointment route as the base path
app.use("/doctors", doctorRoute); // Use the doctor route as the base path

// Socket.io setup
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");

  // Dynamically handle the updateAppointmentStatus event using dynamic appointmentId
  socket.on("updateAppointmentStatus", async (data, callback) => {
    const {
      appointmentId,
      meetingPassword,
      meetingUrl,
      location,
      appointmentState,
      patientId,
    } = data;

    // Generate dynamic event name
    const dynamicEventName = `updateAppointmentStatus/${patientId}`;

    const appointment = await Appointment.findOne({
      appointmentID: appointmentId,
    });

    if (!appointment) {
      return callback({ success: false, message: "Appointment not found" });
    }

    if (appointment.user !== patientId) {
      return callback({
        success: false,
        message: "You are not authorized to update this appointment",
      });
    }

    if (appointmentState === "approved") {
      const contract = new Contract({
        appointmentId: appointment._id,
        meetingDetails: {
          meetingId: Contract.generateMeetingId(),
          meetingPassword: meetingPassword,
          meetingUrl: appointment.mode === "online" ? meetingUrl : null,
          location: appointment.mode === "offline" ? location : null,
        },
      });
      await contract.save();
      appointment.status = "approved";
      await appointment.save();
    } else {
      appointment.status = appointmentState;
      await appointment.save();
    }

    // Emit the dynamically created event to clients
    io.emit(dynamicEventName, {
      appointmentState,
      appointmentId,
      appointment,
    });

    callback({ success: true, message: "Appointment status updated" });
  });

  // socket disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Main server running on port ${PORT}`);
});
