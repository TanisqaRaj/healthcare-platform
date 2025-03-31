import Doctor from "../models/Doctor.js";
import User from "../models/user.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sharp from "sharp";


// 🗜️ Compress Image Using Sharp
const compressImage = async (base64String) => {
  if (!base64String) return null;

  // ✅ Detect Image Format (JPEG or PNG)
  let format = "jpeg";
  if (base64String.startsWith("/9j")) format = "jpeg";
  else if (base64String.startsWith("iVBORw0KGgo")) format = "png";

  // ✅ Ensure Prefix Exists
  const base64Data = base64String.startsWith("data:image")
    ? base64String
    : `data:image/${format};base64,${base64String}`;

  // ✅ Convert Base64 to Buffer
  const buffer = Buffer.from(base64Data.split(",")[1], "base64");

  // ✅ Compress Using Sharp
  try {
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 300 }) // Resize to 300px width
      .toFormat(format) // Explicitly set the image format
      .jpeg({ quality: 60 }) // Compress as JPEG with 60% quality
      .toBuffer();

    return compressedBuffer.toString("base64");
  } catch (error) {
    console.error("❌ Sharp Error:", error.message);
    throw new Error("Image compression failed");
  }
};

// ✅ User Registration
export const registerUser = async (req, res) => {
  const { name, email, phone, role, image, username, password, gender } =
    req.body;

  try {
    const userExists = await User.findOne({
      $or: [{ email }, { phone }, { username }],
    });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🗜️ Compress Image if Provided
    const compressedImage = image ? await compressImage(image) : null;

    const user = new User({
      role,
      name,
      email,
      phone,
      username,
      image: compressedImage, // Store compressed image
      password: hashedPassword,
      gender,
    });

    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Error in registerUser:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Doctor Registration
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
    const doctorExists = await Doctor.findOne({
      $or: [{ email }, { phone }, { username }, { mciNumber }],
    });
    if (doctorExists)
      return res.status(400).json({ message: "Doctor already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🗜️ Compress Profile Image if Provided (JPEG/PNG Only)
    const compressedImage = image ? await compressImage(image) : null;

    // 📄 Store Certificate as-is if PDF, Otherwise Compress if Image
    const certificateData =
      certificate && certificate.startsWith("JVBER")
        ? certificate // Store PDF as-is
        : certificate
        ? await compressImage(certificate) // Compress if it's an image
        : null;

    const doctor = new Doctor({
      role,
      name,
      email,
      phone,
      username,
      certificate: certificateData, // Store PDF or Compressed Image
      image: compressedImage, // Store Compressed Profile Image
      bio,
      gender,
      mciNumber,
      department,
      experience,
      profession,
      password: hashedPassword,
    });

    await doctor.save();
    // Send minimal data in the response
    return res.status(201).json({
      message: "Doctor registered successfully",
      doctor: { _id: doctor._id, name: doctor.name, email: doctor.email },
    });
  } catch (error) {
    console.error("❌ Error in registerDoctor:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Create JWT Token
const createToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// ✅ Login Function
export const loginAuth = async (req, res) => {
  const { email, username, password, role } = req.body;

  if ((!email && !username) || !password || !role) {
    console.error("❌ Missing fields in login request:", { email, username, role });
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    let user;
    if (role === "user") {
      user = await User.findOne(
        { $or: [{ email }, { username }] },
        { password: 1, name: 1, email: 1, role: 1, image: 1 } // Added image field
      );
    } else if (role === "doctor") {
      user = await Doctor.findOne(
        { $or: [{ email }, { username }] },
        { password: 1, name: 1, email: 1, role: 1, image: 1 } // Added image field
      );
    } else if (role === "admin") {
      user = await Admin.findOne(
        { $or: [{ email }, { username }] },
        { password: 1, name: 1, username: 1, role: 1, email: 1 }
      );
    }
    if (!user) {
      console.error("❌ User not found:", { email, username, role });
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("❌ Invalid password for user:", { email, username, role });
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = createToken(user._id);
    console.log("✅ Login successful:", { userId: user._id, role });

    // Send minimal user/admin data in the response
    const responseData = {
      _id: user._id,
      name: user.name,
      role: user.role,
      image: user.image, // Include image in response
    };

    if (role === "admin") {
      responseData.username = user.username;
      responseData.redirectUrl = "/admindashboard"; // Add redirect URL for admin
    } else {
      responseData.email = user.email;
    }

    return res.status(200).json({
      message: "Login Success",
      token,
      success: true,
      user: responseData,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Token Expiry Check
export const checkTokenExpiry = async (req, res) => {
  const token = req.body?.token;
  if (!token) {
    return res
      .status(200)
      .json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Token is valid", user });
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    return res.status(200).json({ success: false, message: "Invalid Token" });
  }
};