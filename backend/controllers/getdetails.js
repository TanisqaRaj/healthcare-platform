import Doctor from "../models/Doctor.js";
import User from "../models/user.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import sharp from "sharp";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔓 Decode Base64 Image
const decodeBase64 = (base64String) => {
    try {
        if (!base64String) return null;
        return base64String; // Image is already optimized using Sharp
    } catch (error) {
        console.error("❌ Decode Error:", error.message);
        return null;
    }
};

/**
 ✅ Function to check if the query is a symptom using AI
 */
const isSymptom = async (query) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const aiResponse = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text:`Is "${query}" a medical symptom or medical disease or a medical problem? Reply only "yes" or "no".`, 
                        },
                    ],
                },
            ],
        });

        const aiText = aiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text
            ?.trim()
            .toLowerCase();
        return aiText === "yes";
    } catch (error) {
        console.error("❌ AI Error in Symptom Detection:", error.message);
        return false; // Default to false if AI fails
    }
};

// ✅ Search Doctors
export const searchdoctor = async (req, res) => {
    try {
        const { query, page = 1, limit = 10, isDoctor } = req.query;
        let searchQuery = {};

        let suggestedProfessions = [];
        let suggestedDepartments = [];

        let symptom;
        if (isDoctor === "true") {
            symptom = false;
        } else {
            symptom = await isSymptom(query);
            console.log("🔍 Symptom Detection Result:", symptom);
            suggestedProfessions = await Doctor.aggregate([
                { $unwind: "$profession" },
                { $group: { _id: null, professions: { $addToSet: "$profession" } } },
                { $project: { _id: 0, professions: 1 } },
            ]);

            suggestedDepartments = await Doctor.aggregate([
                { $group: { _id: null, departments: { $addToSet: "$department" } } },
                { $project: { _id: 0, departments: 1 } },
            ]);
            console.log("🔍 Fetched Suggestions:", suggestedProfessions, suggestedDepartments);
        }

        // Convert user input to lowercase
        const lowerCaseQuery = query.toLowerCase();

        // ✅ Step 1: Use AI to Check if Query is a Symptom
        if (query && symptom) {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const prompt = `A patient reports the following symptom: "${query}". 
                   Return a JSON object with fields professions and departments from the following lists:
                   - "professions": ${JSON.stringify(suggestedProfessions[0].professions)}
                   - "departments": ${JSON.stringify(suggestedDepartments[0].departments)}`;
                console.log("🔍 AI Prompt:", prompt);

                const aiResponse = await model.generateContent({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: prompt }],
                        },
                    ],
                });

                const aiText = aiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
                if (aiText) {
                    try {
                        const cleanedJson = aiText.replace(/json|/g, "").trim();
                        const aiData = JSON.parse(cleanedJson);

                        console.log("🔍 AI Response:", aiData);

                        suggestedProfessions = aiData.professions?.map((p) => p.trim()) || [];
                        suggestedDepartments = aiData.departments?.map((d) => d.trim()) || [];
                    } catch (parseError) {
                        console.error("❌ Error Parsing AI Response:", parseError.message);
                    }
                }

                if (!suggestedProfessions.length || !suggestedDepartments.length) {
                    throw new Error("AI response did not return valid professions or departments");
                }

                searchQuery.$or = [
                    { profession: { $in: suggestedProfessions } },
                    { department: { $in: suggestedDepartments } },
                ];
            } catch (error) {
                console.error("❌ AI Error:", error.message);

                suggestedProfessions = ["General Physician"];
                suggestedDepartments = ["General Medicine"];
                searchQuery.profession = /General.*Physician/i;
                searchQuery.department = /General.*Medicine/i;
            }
        } else {
            // ✅ Step 2: Regular search for doctor name, profession, or department
            searchQuery = {
                $or: [
                    { name: { $regex: lowerCaseQuery, $options: "i" } },
                    { department: { $regex: lowerCaseQuery, $options: "i" } },
                    { profession: { $regex: lowerCaseQuery, $options: "i" } },
                ],
            };
            console.log("🔍 Regular Search Query:", JSON.stringify(searchQuery, null, 2));
        }

        // ✅ Step 3: Debug MongoDB Query Before Fetching
        console.log("🔎 Searching MongoDB with Query:", JSON.stringify(searchQuery, null, 2));

        // ✅ Step 4: Fetch Matching Doctors from MongoDB
        const doctors = await Doctor.find(searchQuery)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .select("image name department profession doctorId");

        // ✅ Return Optimized Images
        const doctorsWithImages = doctors.map((doctor) => ({
            ...doctor.toObject(),
            image: decodeBase64(doctor.image), // Return Base64 as is (already optimized)
        }));

        res.status(200).json({
            success: true,
            totalResults: doctorsWithImages.length,
            suggestedProfessions,
            suggestedDepartments,
            page: parseInt(page),
            doctors: doctorsWithImages,
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Server Error: " + error.message });
    }
};

// ✅ Get All Doctors with Optimized Images
export const getDoctors = async (req, res) => {
    try {
        const { page = 1, limit = 10, lastId } = req.query;

        let filter = {};
        if (lastId) {
            filter = { _id: { $gt: lastId } }; // Fetch doctors after last seen _id
        }

        const doctors = await Doctor.find(filter)
            .sort({ _id: 1 })
            .limit(parseInt(limit))
            .select("image name rating fee bio profession doctorId");

        const totalDoctors = await Doctor.countDocuments();

        // ✅ Return Optimized Images
        const doctorsWithImages = doctors.map((doctor) => ({
            ...doctor.toObject(),
            image: decodeBase64(doctor.image), // Return Base64 as is (already optimized)
        }));

        console.log("📥 Fetched Doctors:", doctorsWithImages.length);

        res.status(200).json({
            success: true,
            totalDoctors,
            doctors: doctorsWithImages,
            lastId: doctorsWithImages.length ? doctorsWithImages[doctorsWithImages.length - 1]._id : null,
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Server Error: " + error.message });
    }
};

// ✅ Get Total Number of Doctors
export const getTotalDoctors = async (req, res) => {
    try {
        const totalDoctors = await Doctor.countDocuments();
        res.status(200).json({
            success: true,
            totalDoctors,
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Server Error: " + error.message });
    }
};

//get total number of users

export const getTotalUsers = async(req , res) =>{
    try{
        const totalUsers = await User.countDocuments();
        res.status(200).json({
            success: true,
            totalUsers,
        });
    }
    catch(error){
        res.status(500).json({ message: " server Error : "+ error.message});
    };

};