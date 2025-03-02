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
                select: "name email phone department experience bio profession gender username"
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
                    profession: appointment.doctorID.profession,
                    department: appointment.doctorID.department,
                    experience: appointment.doctorID.experience,
                    bio: appointment.doctorID.bio,
                    gender: appointment.doctorID.gender,
                    username: appointment.doctorID.username
                }
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("❌ Error fetching user-based appointments:", error.message);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};

//get appointment history

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
                    profession: appointment.doctorID.profession,
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


//*********************************  Doctor Dash appointment list *************************************************************************************/

export const getDoctorAppointments = async (req, res) => {
    try {
        const { doctorId } = req.params;

        if (!doctorId) {
            return res.status(400).json({ success: false, message: "Doctor ID is required" });
        }

        console.log("Fetching all appointments for doctor:", doctorId);

        // Fetch doctor's appointments
        const appointments = await Appointment.find({ doctorID: doctorId })
            .populate({
                path: "patientID",
                select: "name email phone gender age address"
            })
            .select('-__v')
            .lean();

        if (!appointments.length) {
            return res.status(404).json({ success: false, message: "No appointments found for this doctor" });
        }

        // Separate pending and approved appointments
        const pendingAppointments = appointments.filter(appointment => appointment.state === "pending");
        const completedAppointments = appointments.filter(appointment => appointment.state === "approved");

        // Structured Response
        const response = {
            success: true,
            totalAppointments: appointments.length,
            pendingAppointments: pendingAppointments.map(appointment => ({
                appointmentID: appointment._id,
                patientID: appointment.patientID._id,
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
                }
            })),
            completedAppointments: completedAppointments.map(appointment => ({
                appointmentID: appointment._id,
                patientID: appointment.patientID._id,
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
                }
            }))
        };

        res.status(200).json(response);
    } catch (error) {
        console.error("❌ Error fetching doctor-based appointments:", error.message);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
};

//Api For doctor dashboard approval

export const approveAppointment = async (req, res) =>{
    try{
        const { appointmentId } = req.params;
        if(!appointmentId){
            return res.status(400).json({ success: false , message: "Appointment ID is required"});
        }

        //MongoDB me `"approved"` update karo

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            {state: "approved"},
            {new: true}
        );
        if(!updatedAppointment){
            return res.status(404).json({ success: false, message: "Appointment not found"});
        }
        res.status(200).json({
            success: true,
            message: "Appointment approved successfully",
            appointment: updatedAppointment
        })
    }
    catch(error){
        console.error("❌ Error approving appointment:", error.message);
        res.status(500).json({ success: false, message: "Server Error: " + error.message });
    }
}