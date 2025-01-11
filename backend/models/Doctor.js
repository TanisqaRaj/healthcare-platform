import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import dotenv from 'dotenv';

dotenv.config();

const connection = mongoose.createConnection(process.env.MONGO_URI);


const doctorSchema = new mongoose.Schema({
    numericId: {
        type: Number,
        unique: true
      },// Auto-incremented ID
    name: { type: String, required: true },
    phone: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/ // Ensures a valid 10-digit phone number
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    username: { type: String, required: true, unique: true }, // Unique username
    certificate: { type: String, required: true }, // Certificate upload (URL or file path)
    bio: { type: String, required: true }, // short biography
    image: { type: String, required: false }, // Profile picture (URL or file path)
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    experience: { type: Number, required: true }, // Experience in years
    profession: { type: String, required: true }, // Profession (e.g., General Physician, Surgeon)
    mciNumber: { type: String, required: true, unique: true }, // Unique Medical Council of India number
    password: { type: String, required: true, minlength: 6 }, // Encrypted password
}, { timestamps: true });



doctorSchema.pre('save', async function (next) {
    if (!this.numericId) {
        const lastDoctor = await mongoose.model('Doctor').findOne().sort({ numericId: -1 });
        this.numericId = lastDoctor ? lastDoctor.numericId + 1 : 1; // Start from 1
    }
    next();
});

// Middleware to hash password before saving
doctorSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// Method to compare password during login
doctorSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('Doctor', doctorSchema);
