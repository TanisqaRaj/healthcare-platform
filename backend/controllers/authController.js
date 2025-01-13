import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

// User Registration
export const registerUser = async (req, res) => {
  const { name, email, phone , role,image, username, password, gender } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({
      $or: [{ email }, { phone }, { username }],
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      role,
      name,
      email,
      phone,
      username,
      image,
      password: hashedPassword,
      gender,
    });

    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

// Doctor Registration
export const registerDoctor = async (req, res) => {
  const {
    role,
    name,
    email,
    phone,
    username,
    bio,
    gender,
    mciNumber,
    department,
    experience,
    password,
    certificate,
    image,
  } = req.body;

  try {
    // Check if the doctor already exists
    const doctorExists = await Doctor.findOne({
      $or: [{ email }, { phone }, { username }, { mciNumber }],
    });
    if (doctorExists) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new doctor
    const doctor = new Doctor({
      role,
      name,
      email,
      phone,
      username,
      certificate,
      image,
      bio,
      gender,
      mciNumber,
      department,
      experience,
      password: hashedPassword,
    });

    // Save the doctor (doctorId will be auto-generated based on department)
    await doctor.save();

    return res.status(201).json({ message: "Doctor registered successfully", doctor });
  } catch (error) {
    console.error("Error in registerDoctor:", error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};