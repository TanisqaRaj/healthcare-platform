// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['user'] },
  numericId: { type: Number, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Middleware to auto-assign numericId
userSchema.pre('save', async function (next) {
  if (!this.numericId) {
    const lastUser = await mongoose.model('User').findOne().sort({ numericId: -1 });
    this.numericId = lastUser ? lastUser.numericId + 1 : 1; // Start from 1
  }
  next();
});

export default mongoose.model('User', userSchema);
