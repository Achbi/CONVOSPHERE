import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectMessage = async (req, res, next) => {
  console.log("Entering protectMessage middleware");
  try {
    const token = req.cookies.jwt;
    console.log("Token from cookies:", token);
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }
    console.log("Verifying token");
    const decoded = jwt.verify(token,"secret");
    console.log("Token verified, decoded:", decoded);
    console.log("Finding user");
    const user = await User.findById(decoded.userID).select("-password");
    console.log("User found:", user);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    console.log("User set on request, calling next()");
    next();
  } catch (error) {
    console.error("Error in protectMessage middleware:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};
export default protectMessage