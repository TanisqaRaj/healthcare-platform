import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import zlib from "node:zlib";

//  Compress Base64 String
const compressBase64 = (base64String) => {
    return base64String ? zlib.gzipSync(base64String).toString("base64") : null;
};

//  Decompress Base64 String
const decompressBase64 = (compressedBase64) => {
    return compressedBase64 ? zlib.gunzipSync(Buffer.from(compressedBase64, "base64")).toString() : null;
};

// ✅ User Registration
export const registerUser = async (req, res) => {
    const { name, email, phone, role, image, username, password, gender } = req.body;

    try {
        const userExists = await User.findOne({
            $or: [{ email }, { phone }, { username }],
        });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const compressedImage = compressBase64(image); //  Compress Image

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
        console.error("Error in registerUser:", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

// ✅ Doctor Registration
export const registerDoctor = async (req, res) => {
    const {
        role, name, email, phone, username, bio, gender,
        mciNumber, department, experience, password, certificate, profession, image
    } = req.body;

    try {
        const doctorExists = await Doctor.findOne({
            $or: [{ email }, { phone }, { username }, { mciNumber }],
        });
        if (doctorExists) return res.status(400).json({ message: "Doctor already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const compressedImage = compressBase64(image); // 🗜️ Compress Image
        const compressedCertificate = compressBase64(certificate); // 🗜️ Compress Certificate

        const doctor = new Doctor({
            role, name, email, phone, username, certificate: compressedCertificate,
            image: compressedImage, // Store compressed image
            bio, gender, mciNumber, department, experience, profession,
            password: hashedPassword,
        });

        await doctor.save();
        return res.status(201).json({ message: "Doctor registered successfully", doctor });
    } catch (error) {
        console.error("Error in registerDoctor:", error.message);
        return res.status(500).json({ message: "Internal Server error" });
    }
};

// ✅ Create JWT Token
const createToken = (userId) => {
    return jwt.sign(
        { _id: userId },
        process.env.JWT_SECRET,
        { algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY }
    );
};

// ✅ Login Function
export const loginAuth = async (req, res) => {
    const { email, username, password, role } = req.body;

    if ((!email && !username) || !password || !role) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        let user;
        if (role === 'user') {
            user = await User.findOne({ $or: [{ email }, { username }] });
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ $or: [{ email }, { username }] });
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = createToken(user._id);

            //  Decompress Image Before Sending
            const userObject = user.toObject();
            if (userObject.image) userObject.image = decompressBase64(userObject.image);

            return res.status(200).json({ message: "Login Success", token, success: true, user: userObject });
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ✅ Token Expiry Check
export const checkTokenExpiry = (req, res) => {
    const token = req.body?.token;
    if (!token) {
        return res.status(200).json({ success: false, message: 'Access Denied. No token provided.' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return res.status(200).json({ success: true, message: 'Token is valid' });
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(200).json({ success: false, message: 'Invalid Token' });
    }
};
