import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import User from "../models/user.js";

// Helper function to find doctor and user by their IDs
const findDoctorAndUser = async (doctorId, userId) => {
    const doctor = await Doctor.findById(doctorId);
    const user = await User.findById(userId);
    return { doctor, user };
};

// Create a new appointment

export const createAppointment = async (req, res) => {
    try {
        const {
            patientName,
            patientContact,
            gender,
            age,
            title,
            desc,
            expectedDate,
            address,
            disease,
            mode,
            doctorId,
            userId,
            email
        } = req.body;

        const { doctor, user } = await findDoctorAndUser(doctorId, userId);

        if (!doctor || !user) {
            return res.status(404).json({ message: "Doctor or User not found" });
        }

        const newAppointment = new Appointment({
            patientName,
            patientContact,
            gender,
            age,
            title,
            desc,
            expectedDate,
            address,
            disease,
            mode,
            doctorID: doctor._id,
            userID: user._id,
            patientEmail: email
        });

        await newAppointment.generateAppointmentID();
        await newAppointment.save();

        res.status(201).json({ message: "Appointment created successfully", appointment: newAppointment });
    } catch (error) {
        console.error("❌ Server Error:", error.message);
        res.status(500).json({ message: "Server Error: " + error.message });
    }
};

// 📅 View current and future appointments
export const getCurrentAppointments = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentDate = new Date().setUTCHours(0, 0, 0, 0);

        const appointments = await Appointment.find({
            user: userId,
            appointmentDate: { $gte: currentDate }
        })
            .populate('doctor', 'name department')
            .populate('user', 'name email');

        if (!appointments.length) {
            return res.status(404).json({ message: "No current or future appointments found" });
        }

        res.status(200).json({ appointments });
    } catch (error) {
        console.error("❌ Error fetching current appointments:", error.message);
        res.status(500).json({ message: "Server Error: " + error.message });
    }
};

// 🕰️ View appointment history (past appointments)
export const getAppointmentHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentDate = new Date().setUTCHours(0, 0, 0, 0);

        const appointments = await Appointment.find({
            user: userId,
            appointmentDate: { $lt: currentDate }
        })
            .populate('doctor', 'name department')
            .populate('user', 'name email');

        if (!appointments.length) {
            return res.status(404).json({ message: "No past appointments found" });
        }

        res.status(200).json({ appointments });
    } catch (error) {
        console.error("❌ Error fetching appointment history:", error.message);
        res.status(500).json({ message: "Server Error: " + error.message });
    }
};

// 📜 View appointment  full details by ID


export const getAppointmentById = async (req, res) => {
    try {
        const { appointmentId } = req.params; // Extract ID from URL

        console.log("Fetching appointment with ID:", appointmentId);

        // Find appointment by ID and populate doctor details
        const appointment = await Appointment.findById(appointmentId)
            .populate({
                path: "doctor",
                select: "name email username bio gender profession phone department experience", // Populate doctor details
            });

        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        // Prepare structured response with correct field names
        const response = {
            appointmentDetails: {
                patientName: appointment.patientName,
                patientPhone: appointment.patientPhone,
                gender: appointment.gender,
                age: appointment.age,
                title: appointment.title,
                desc: appointment.desc,
                appointmentDate: appointment.appointmentDate,
                address: appointment.address,
                disease: appointment.disease,
                mode: appointment.mode,
                state: appointment.state, // Corrected field name
            },
            doctorDetails: appointment.doctor, // Populated doctor object
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching appointment details:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// ❌ Delete appointment
// export const deleteAppointment = async (req, res) => {
//     try {
//         const { appointmentId } = req.params;

//         const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

//         if (!deletedAppointment) {
//             return res.status(404).json({ message: "Appointment not found" });
//         }

//         res.status(200).json({ message: "Appointment deleted successfully" });
//     } catch (error) {
//         console.error("❌ Error deleting appointment:", error.message);
//         res.status(500).json({ message: "Server Error: " + error.message });
//     }
// };



