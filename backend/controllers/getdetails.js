import Doctor from '../models/Doctor.js';
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
            contents: [{
                role: "user",
                parts: [{
                    text: `Is "${query}" a medical symptom? Reply only "yes" or "no".`
                }]
            }]
        });

        const aiText = aiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().toLowerCase();
        return aiText === "yes";

    } catch (error) {
        console.error("❌ AI Error in Symptom Detection:", error.message);
        return false; // Default to false if AI fails
    }
};

export const searchdoctor = async (req, res) => {
    try {
        const { query, page = 1, limit = 10 } = req.query;
        let searchQuery = {};

        let suggestedProfessions = [];
        let suggestedDepartments = [];

        // ✅ Step 1: Use AI to Check if Query is a Symptom
        if (query && await isSymptom(query)) {
            try {
                console.log("🔍 AI Searching for Symptoms:", query);

                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
                const aiResponse = await model.generateContent({
                    contents: [{
                        role: "user",
                        parts: [{
                            text: `A patient reports the following symptom: "${query}". 
                                   Return a JSON object with:
                                   - "professions": an array of relevant professions (e.g., ["Pediatrician", "Gastroenterologist"])
                                   - "departments": an array of relevant medical departments (e.g., ["Pediatrics", "Gastroenterology"])`
                        }]
                    }]
                });

                console.log("📩 Raw AI Response:", JSON.stringify(aiResponse, null, 2));

                // ✅ Extract and clean AI response
                const aiText = aiResponse.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
                if (aiText) {
                    try {
                        const cleanedJson = aiText.replace(/```json|```/g, "").trim();
                        const aiData = JSON.parse(cleanedJson);

                        suggestedProfessions = aiData.professions?.map(p => p.trim()) || [];
                        suggestedDepartments = aiData.departments?.map(d => d.trim()) || [];
                    } catch (parseError) {
                        console.error("❌ Error Parsing AI Response:", parseError.message);
                    }
                }

                if (!suggestedProfessions.length || !suggestedDepartments.length) {
                    throw new Error("AI response did not return valid professions or departments");
                }

                // ✅ Ensure MongoDB can match both "Pediatrics" & "Pediatrician"
                searchQuery.profession = {
                    $in: suggestedProfessions.flatMap(p => [
                        new RegExp(sanitizeRegex(p), 'i'),
                        new RegExp(sanitizeRegex(p + "s"), 'i')
                    ])
                };
                searchQuery.department = {
                    $in: suggestedDepartments.flatMap(d => [
                        new RegExp(sanitizeRegex(d), 'i'),
                        new RegExp(sanitizeRegex(d.replace(/s$/, "")), 'i') // Handle singular/plural variations
                    ])
                };

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
            const regex = new RegExp(query, "i"); // Case-insensitive, partial search
            searchQuery.$or = [
                { name: regex },
                { department: regex },
                { profession: regex }
            ];
        }

        // ✅ Step 3: Debug MongoDB Query Before Fetching
        console.log("🔎 Searching MongoDB with Query:", JSON.stringify(searchQuery, null, 2));

        // ✅ Step 4: Fetch Matching Doctors from MongoDB
        const doctors = await Doctor.find(searchQuery)
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .select("name department profession email phone");

        console.log("✅ Fetched Doctors:", doctors);

        // ✅ Return Response
        res.status(200).json({
            success: true,
            totalResults: doctors.length,
            suggestedProfessions,
            suggestedDepartments,
            page: parseInt(page),
            doctors
        });

    } catch (error) {
        res.status(500).json({ message: "❌ Server Error: " + error.message });
    }
};

/**
 * ✅ Helper function to sanitize regex inputs (prevents regex injection)
 */
const sanitizeRegex = (input) => {
    return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
