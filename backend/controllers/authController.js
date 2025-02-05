import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

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
    profession,
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
      profession,
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

// Function to create a JWT token
const createToken = (userId) => {
  return jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY }
  );
};

// Login function
export const loginAuth = async (req, res) => {
  const { email, username ,password, role } = req.body;

  if (!email  && !username || !password || !role) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    let user;

    // Find user by email and role
    if (role === 'user') {
      user = await User.findOne( { $or:[{email }, {username}]});
    } else if (role === 'doctor') {
      user = await Doctor.findOne({$or:[ {email} , {username} ]} );
    }

    // Check if user exists and password matches
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token
      const token = createToken(user._id);

      return res.status(200).json({ message: "Login Success", token , success:true , user});
    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const checkTokenExpiry = (req, res) => {
  const token = req.body?.token; // Safely access token
  console.log(token);
  if (!token) {
    return res.status(200).json({ success: false, message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return res.status(200).json({ success: true, message: 'Token is valid' });
  } catch (error) {

    console.error('Token verification failed:', error.message);
    return res.status(200).json({ success: false, message: 'Invalid Token' });
  }
};
