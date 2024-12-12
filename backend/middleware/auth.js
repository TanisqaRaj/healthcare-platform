import { verifyFirebaseToken } from "./firebaseConfig.js";

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer header
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decodedToken = await verifyFirebaseToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: " + error.message });
  }
};

export default authenticate;
