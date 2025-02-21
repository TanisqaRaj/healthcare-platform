import Doctor from "../models/Doctor.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
              text: `Is "${query}" a medical symptom or medical disease or a medical problem? Reply only "yes" or "no".`,
            },
          ],
        },
      ],
    });

    const aiText =
      aiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text
        ?.trim()
        .toLowerCase();
    return aiText === "yes";
  } catch (error) {
    console.error("❌ AI Error in Symptom Detection:", error.message);
    return false; // Default to false if AI fails
  }
};

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
        { $unwind: "$profession" }, // Flatten the profession array
        { $group: { _id: null, professions: { $addToSet: "$profession" } } },
        { $project: { _id: 0, professions: 1 } },
      ]);

      suggestedDepartments = await Doctor.aggregate([
        { $group: { _id: null, departments: { $addToSet: "$department" } } },
        { $project: { _id: 0, departments: 1 } },
      ]);
      console.log(
        "🔍 Fetched Suggestions:",
        suggestedProfessions,
        suggestedDepartments
      );
    }

    // ✅ Step 1: Use AI to Check if Query is a Symptom
    if (query && symptom) {
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const promopt = `A patient reports the following symptom: "${query}". 
                   Return a JSON object with fileds professions and departments from the following lists:
                   - "professions": ${JSON.stringify(
                     suggestedProfessions[0].professions
                   )}
                   - "departments": ${JSON.stringify(
                     suggestedDepartments[0].departments
                   )}`;
        console.log("🔍 AI Prompt:", promopt);
        const aiResponse = await model.generateContent({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: promopt,
                },
              ],
            },
          ],
        });

        // ✅ Extract and clean AI response
        const aiText =
          aiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (aiText) {
          try {
            const cleanedJson = aiText.replace(/```json|```/g, "").trim();
            const aiData = JSON.parse(cleanedJson);

            console.log("🔍 AI Response:", aiData);

            suggestedProfessions =
              aiData.professions?.map((p) => p.trim()) || [];
            suggestedDepartments =
              aiData.departments?.map((d) => d.trim()) || [];
          } catch (parseError) {
            console.error("❌ Error Parsing AI Response:", parseError.message);
          }
        }

        if (!suggestedProfessions.length || !suggestedDepartments.length) {
          throw new Error(
            "AI response did not return valid professions or departments"
          );
        }

        // ✅ Ensure MongoDB can match both "Pediatrics" & "Pediatrician"
        searchQuery.$or = [
          { profession: { $in: suggestedProfessions } },
          { department: { $in: suggestedDepartments } },
        ];
      } catch (error) {
        console.error("❌ AI Error:", error.message);

        // ✅ Fallback if AI fails
        suggestedProfessions = ["General Physician"];
        suggestedDepartments = ["General Medicine"];
        searchQuery.profession = /General.*Physician/i;
        searchQuery.department = /General.*Medicine/i;
      }
    } else {
      // ✅ Step 2: Regular search for doctor name, profession, or department
      //   const regex = new RegExp(query, "i"); // Case-insensitive, partial search
      searchQuery = {
        $or: [
          { nameLower: { $regex: query.toLowerCase() } },
          { departmentLower: { $regex: query.toLowerCase() } },
          { professionLower: { $regex: query.toLowerCase() } },
        ],
      };
    }

    // ✅ Step 3: Debug MongoDB Query Before Fetching
    console.log(
      "🔎 Searching MongoDB with Query:",
      JSON.stringify(searchQuery, null, 2)
    );

    // ✅ Step 4: Fetch Matching Doctors from MongoDB
    const doctors = await Doctor.find(searchQuery)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select("image name department profession");

    // ✅ Return Response
    res.status(200).json({
      success: true,
      totalResults: doctors.length,
      suggestedProfessions,
      suggestedDepartments,
      page: parseInt(page),
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error: " + error.message });
  }
};

//get all doctors
export const getDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10, lastId } = req.query;

    let filter = {};
    if (lastId) {
      filter = { _id: { $gt: lastId } }; // Fetch doctors after last seen _id
    }

    const doctors = await Doctor.find(filter)
      .sort({ _id: 1 }) // Ensures consistent order
      .limit(parseInt(limit))
      .select("image name rating fee bio profession"); // Only required fields

    const totalDoctors = await Doctor.countDocuments(); // Get total count

    console.log("📥 Fetched Doctors:", doctors.length);

    res.status(200).json({
      success: true,
      totalDoctors,
      doctors,
      lastId: doctors.length ? doctors[doctors.length - 1]._id : null, // Pass last _id for next request
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server Error: " + error.message });
  }
};

//get total Number of doctors
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
