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
            patientAddress,
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
            patientAddress,
            disease,
            mode,
            doctorID: doctor._id,
            patientID: user._id,
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

//see current user appointment and  all the  details of doctor
export const getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        console.log("Fetching all appointments for user:", userId);

        // Fetch all appointments for the given user and populate doctor details
        const appointments = await Appointment.find({ patientID: userId })
            .populate({
                path: "doctorID",
                select: "name email phone department experience bio"
            })
            .populate({
                path: "patientID",
                select: "name email phone gender age address"
            })
            .select('-__v')
            .lean();

        if (!appointments.length) {
            return res.status(404).json({ success: false, message: "No appointments found for this user" });
        }

        // Prepare structured response
        const response = {
            success: true,
            totalAppointments: appointments.length,
            appointments: appointments.map((appointment) => ({
                appointmentID: appointment._id, // MongoDB Appointment ID
                customAppointmentID: appointment.appointmentID, // Custom generated Appointment ID
                patientID: appointment.patientID._id, // User (Patient) ID
                doctorID: appointment.doctorID._id, // Doctor ID
                status: appointment.state,
                appointment: {
                    title: appointment.title,
                    description: appointment.desc,
                    date: appointment.expectedDate,
                    mode: appointment.mode
                },
                patient: {
                    name: appointment.patientID.name,
                    email: appointment.patientID.email,
                    phone: appointment.patientID.phone,
                    gender: appointment.patientID.gender,
                    age: appointment.patientID.age,
                    address: appointment.patientID.address,
                    disease: appointment.disease
                },
                doctor: {
                    name: appointment.doctorID.name,
                    email: appointment.doctorID.email,
                    phone: appointment.doctorID.phone,
                    department: appointment.doctorID.department,
                    experience: appointment.doctorID.experience,
                    bio: appointment.doctorID.bio
                }
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("❌ Error fetching user-based appointments:", error.message);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};


// 📅 View current and future appointments
// export const getCurrentAppointments = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         if (!userId) {
//             return res.status(400).json({ message: "User ID is required" });
//         }

//         const currentDate = new Date().setUTCHours(0, 0, 0, 0);

//         const appointments = await Appointment.find({
//             patientID: userId,
//             expectedDate: { $gte: currentDate }
//         })
//             .populate('doctorID', 'name department email')
//             .select('-__v')
//             .lean();

//         res.status(200).json({
//             success: true,
//             totalAppointments: appointments.length,
//             appointments
//         });

//     } catch (error) {
//         console.error("❌ Error fetching current appointments:", error.message);
//         res.status(500).json({ message: "Server Error: " + error.message });
//     }
// };


// 🕰️ View appointment history (past appointments)
// export const getAppointmentHistory = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         if (!userId) {
//             return res.status(400).json({ message: "User ID is required" });
//         }

//         const currentDate = new Date().setUTCHours(0, 0, 0, 0);

//         const appointments = await Appointment.find({
//             patientID: userId, // Correct field from schema
//             expectedDate: { $lt: currentDate } // Fetch only past appointments
//         })
//             .populate('doctorID', 'name department email')
//             .select('-__v') // Remove unnecessary fields
//             .lean(); // Optimize query performance

//         res.status(200).json({
//             success: true,
//             totalAppointments: appointments.length,
//             appointments
//         });

//     } catch (error) {
//         console.error("❌ Error fetching appointment history:", error.message);
//         res.status(500).json({ message: "Server Error: " + error.message });
//     }
// };

export const getAppointmentHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const currentDate = new Date().setUTCHours(0, 0, 0, 0);

        const appointments = await Appointment.find({
            patientID: userId, // Correct field from schema
            expectedDate: { $lt: currentDate } // Fetch only past appointments
        })
            .populate({
                path: "doctorID",
                select: "name email phone department experience bio"
            })
            .populate({
                path: "patientID",
                select: "name email phone gender age address"
            })
            .select('-__v') // Remove unnecessary fields
            .lean(); // Optimize query performance

        if (!appointments.length) {
            return res.status(404).json({ success: false, message: "No past appointments found for this user" });
        }

        // Prepare structured response
        const response = {
            success: true,
            totalAppointments: appointments.length,
            appointments: appointments.map((appointment) => ({
                appointmentID: appointment._id, // MongoDB Appointment ID
                customAppointmentID: appointment.appointmentID, // Custom generated Appointment ID
                patientID: appointment.patientID._id, // User (Patient) ID
                doctorID: appointment.doctorID._id, // Doctor ID
                status: appointment.state,
                appointment: {
                    title: appointment.title,
                    description: appointment.desc,
                    date: appointment.expectedDate,
                    mode: appointment.mode
                },
                patient: {
                    name: appointment.patientID.name,
                    email: appointment.patientID.email,
                    phone: appointment.patientID.phone,
                    gender: appointment.patientID.gender,
                    age: appointment.patientID.age,
                    address: appointment.patientID.address,
                    disease: appointment.disease
                },
                doctor: {
                    name: appointment.doctorID.name,
                    email: appointment.doctorID.email,
                    phone: appointment.doctorID.phone,
                    department: appointment.doctorID.department,
                    experience: appointment.doctorID.experience,
                    bio: appointment.doctorID.bio
                }
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("❌ Error fetching appointment history:", error.message);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};



// 📜 View appointment  full details by ID


// export const getAppointmentById = async (req, res) => {
//     try {
//         const { appointmentId } = req.params; // Extract ID from URL

//         if (!appointmentId) {
//             return res.status(400).json({ success: false, message: "Appointment ID is required" });
//         }

//         console.log("Fetching appointment with ID:", appointmentId);

//         // Find appointment by ID and populate doctor & patient details
//         const appointment = await Appointment.findById(appointmentId)
//             .populate('doctorID', 'name email phone department experience') // Populate doctor details
//             .populate('patientID', 'name email') // Populate patient details
//             .select('-__v') // Remove unnecessary fields
//             .lean(); // Optimize query performance

//         if (!appointment) {
//             return res.status(404).json({ success: false, message: "Appointment not found" });
//         }

//         // Prepare structured response with meaningful field names
//         const response = {
//             success: true,
//             appointmentID: appointment.appointmentID,
//             status: appointment.state,
//             details: {
//                 patient: {
//                     name: appointment.patientName,
//                     email: appointment.patientEmail,
//                     phone: appointment.patientContact,
//                     gender: appointment.gender,
//                     age: appointment.age,
//                     address: appointment.patientAddress,
//                     disease: appointment.disease
//                 },
//                 appointment: {
//                     title: appointment.title,
//                     description: appointment.desc,
//                     date: appointment.expectedDate,
//                     mode: appointment.mode
//                 },
//                 doctor: appointment.doctorID // Populated doctor object
//             }
//         };

//         res.status(200).json(response);
//     } catch (error) {
//         console.error("❌ Error fetching appointment details:", error.message);
//         res.status(500).json({ success: false, message: "Server Error: " + error.message });
//     }
// };


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



