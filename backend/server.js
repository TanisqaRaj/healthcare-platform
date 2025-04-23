import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import appointmentRoute from "./routes/appointmentRoutes.js";
import doctorRoute from "./routes/doctorRoutes.js";
import { Server } from "socket.io"; // Corrected import
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
app.get("/", (req, res) => {
  res.send("Welcome to the main server!");
  activeStatus = true;
});
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
    console.log("Data received: ", data);

    const {
      appointmentId,
      meetingPassword,
      meetingUrl,
      location,
      appointmentState,
    } = data;

    const appointment = await Appointment.findById(appointmentId)
      .populate({
        path: "doctorID",
        select:
          "name email phone department experience bio profession gender username",
      })
      .populate({
        path: "appointmentID",
        select:
          "patientName patientEmail patientContact gender age  title desc mode state expectedDate patientAddress",
      })
      .select("-__v");

    if (!appointment) {
      return await callback({
        success: false,
        message: "Appointment not found",
      });
    }

    if (appointmentState === "approved") {
      let existingContract = await Contract.findOne({
        appointmentId: appointment._id,
      });

      if (existingContract) {
        return await callback({
          success: false,
          message: "Contract already exists for this appointment",
        });
      }

      const contract = new Contract({
        appointmentId: appointment._id,
        meetingDetails: {
          meetingPassword: meetingPassword,
          meetingUrl: appointment.mode === "online" ? meetingUrl : null,
          location: appointment.mode === "offline" ? location : null,
        },
      });
      await contract.save();
    }
    appointment.state = appointmentState;
    await appointment.save();

    // Generate dynamic event name
    const dynamicEventName = `updateAppointmentStatus/${appointment?.patientID}`;

    // Emit the dynamically created event to clients
    io.emit(dynamicEventName, {
      appointmentState,
      appointmentId,
      appointment: {
        appointmentID: appointment._id, // MongoDB Appointment ID
        customAppointmentID: appointment.appointmentID, // Custom generated Appointment ID
        patientID: appointment.patientID._id, // User (Patient) ID
        doctorID: appointment.doctorID._id, // Doctor ID
        status: appointment.state,
        appointment: {
          title: appointment.title,
          description: appointment.desc,
          date: appointment.expectedDate,
          mode: appointment.mode,
        },
        patient: {
          name: appointment.patientName,
          email: appointment.patientEmail,
          phone: appointment.patientContact,
          gender: appointment.gender,
          age: appointment.age,
          address: appointment.patientID.patientAddress,
          disease: appointment.disease,
        },
        doctor: {
          name: appointment.doctorID.name,
          email: appointment.doctorID.email,
          phone: appointment.doctorID.phone,
          profession: appointment.doctorID.profession,
          department: appointment.doctorID.department,
          experience: appointment.doctorID.experience,
          bio: appointment.doctorID.bio,
          gender: appointment.doctorID.gender,
          username: appointment.doctorID.username,
        },
      },
    });

    await callback({ success: true, message: "Appointment status updated" });
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
