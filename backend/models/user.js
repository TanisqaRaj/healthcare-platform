import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // Firebase UID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["patient", "doctor", "medical", "admin"],
    required: true,
  },
  bio: { type: String }, // Optional bio for doctors or others
  specialization: { type: String }, // For doctors
  skills: [{ type: String }], // List of skills
  videos: [{ type: String }], // Video URLs
  ratings: { type: Number, default: 0 }, // Rating for mentors/doctors
  coins: { type: Number, default: 0 }, // Credits earned on the platform
  location: { type: String }, // Address or location for meetups
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
