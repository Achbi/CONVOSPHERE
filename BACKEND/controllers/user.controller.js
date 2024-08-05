import User from "../models/user.model.js";

export const getusersByID = async (req,res) =>{
  try{
    const userid = req.user._id;

    const getuser = await User.find().select("-password");


    res.status(200).json(getuser)

  }catch(error){
    console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });

  }
} 