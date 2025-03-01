import mongoose from "mongoose";

const contractSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment", // Reference to the chosen doctor
      required: true,
    },

    meetingDetails: {
        meetingId: { type: String, required: true, unique: true },
        meetingPassword: { type: String, required: true },
        meetingUrl: { type: String, required: false },
        location: { type: String, required: false },
    }
  },
  {
    timestamps: true,
  }
);

contractSchema.methods.generateMeetingId = function () {
    const date = new Date();
    // generate unique meeting ID using the appointment ID and current date and not existing one
    this.meetingDetails.meetingId = `${this.appointmentId}${date.toISOString().replace(/[^0-9]/g, "")}`;
};

export default mongoose.model("Contract", contractSchema);
