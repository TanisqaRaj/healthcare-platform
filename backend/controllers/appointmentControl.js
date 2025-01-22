import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';

// Create a new appointment
export const createAppointment = async (req, res) => {
    try {
        const {
            patientName, patientPhone, patientEmail, gender, age, appointmentDate, address, disease, mode, doctorName } = req.body;

        // Validate doctor name and fetch doctor details
        const doctor = await Doctor.findOne({ name: doctorName });
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        // Check if an appointment with the same patient and date already exists
        const existingAppointment = await Appointment.findOne({
            patientName,
            appointmentDate,
            doctor: doctor._id,
        });
        if (existingAppointment) {
            return res.status(400).json({ message: 'An appointment with the same details already exists.' });
        }

        // Create a new appointment
        const appointment = new Appointment({
            patientName,
            patientPhone,
            patientEmail,
            gender,
            age,
            appointmentDate,
            address,
            disease,
            mode,
            doctor: doctor._id, // Store the doctor's ID in the appointment
        });

        // Generate appointment ID
        await appointment.generateAppointmentID();

        // Save the appointment
        const savedAppointment = await appointment.save();
        res.status(201).json({ sucess: true, appointment: savedAppointment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Fetch all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctor', 'name department');
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single appointment by ID
export const getAppointmentByGeneratedId = async (req, res) => {
    try {
        const { appointmentID } = req.params;
        const appointment = await Appointment.findOne({ appointmentID }).populate('doctor', 'name department');

        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an appointment
export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, { new: true }).populate('doctor', 'name department');
        if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });

        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//fetch doctor name in drop down during appointment creation

export const getDoctorNameScroll= async (res,req)=>{
    try {
        // Fetch all doctor names from the database
        const doctors = await Doctor.find({}, 'name');

        if (!doctors.length) {
            return res.status(404).json({ message: 'No doctors found' });
        }

        // Return doctor names in the response
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};