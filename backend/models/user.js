import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        index: true // Index for faster queries by Firebase UID
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Store email in lowercase
    },
    role: {
        type: String,
        enum: ['user', 'doctor', 'shop-owner', 'admin'],  // List of possible roles
        default: 'user' // Default role for new users
    },
    bio: {
        type: String,
        default: '' // Optional field for user biography
    },
    skills: [{
        type: String,
        default: [] // List of skills (for doctors and shop owners)
    }],
    profilePictureUrl: {
        type: String,
        default: '' // Optional profile picture URL
    },
    createdAt: {
        type: Date,
        default: Date.now // Timestamp for when the user was created
    },
    updatedAt: {
        type: Date,
        default: Date.now // Timestamp for when the user was last updated
    },
});

UserSchema.pre('save', function (next) {
    // Automatically update 'updatedAt' field on document update
    this.updatedAt = Date.now();
    next();
});

// Create the User model based on the schema
export default mongoose.model('User', UserSchema);
