import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectMessage = async (req, res, next) => {

  try {
    const token = req.cookies.jwt;

    if (!token) {
 
      return res.status(401).json({ error: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token,"secret");
  

    const user = await User.findById(decoded.userID).select("-password");

    if (!user) {

      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
   
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