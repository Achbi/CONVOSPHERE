import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import generatetoken from "../JWT/generatetoken.js";


export const SignUP = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword } = req.body;
        
        if (password !== confirmpassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }
        
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }
        
         
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password,salt)

        const newUser = new User({
            fullname,
            username,
            password:hashedPassword,
        });
        if(newUser){
            generatetoken(newUser._id,res);
            await newUser.save()
        }
        
        await newUser.save();
        
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during signup" });
    }
}


export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        // Assuming generateToken is an async function
        await generatetoken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname
        });

    } catch (error) {
        console.error("Error in login controller", error);
        res.status(500).json({ error: "Internal server error" });
    }
}


export const logoutUser = async (req,res) =>{
    try{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({ message: 'Logout successful' });}catch(error){
        console.error("error in loging out",error.message);
        res.status(500).json({ error: "Internal Server Error" }); 
        

    }
}
