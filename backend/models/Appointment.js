import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
        default: 'male'
    },
    age: { type: Number, required: true },
    appointmentDate: { type: Date, required: true },
    address: { type: String, required: true },
    disease: { type: String, required: true },
    mode: {
        type: String,
        required: true,
        enum: ['online', 'offline']
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
   //unique appointment ID
    appointmentID: {
        type: String,
        unique: true
    }, // Unique appointment ID
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt`
});

// Function to generate appointment ID
appointmentSchema.methods.generateAppointmentID = async function () {
    // Fetch the department from the doctor's record
    const doctor = await mongoose.model('Doctor').findById(this.doctor);
    const departmentCode = doctor.department.slice(0, 3).toUpperCase(); // First three letters of department

    const date = this.appointmentDate.toISOString().split('T')[0].replace(/-/g, ''); // Date in `YYYYMMDD` format
    const randomNumber = Math.floor(10 + Math.random() * 90); // Generate a random 2-digit number

    this.appointmentID = `${departmentCode}${date}${randomNumber}`;
};

// Middleware to populate doctor name automatically
appointmentSchema.pre('findOne', function (next) {
    this.populate('doctor', 'name department'); // Populate the `name` and `department` of the doctor
    next();
});

appointmentSchema.pre('find', function (next) {
    this.populate('doctor', 'name department'); // Populate for all find queries
    next();
});

export default mongoose.model('Appointment', appointmentSchema);
