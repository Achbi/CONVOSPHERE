import jwt from "jsonwebtoken";

const generatetoken = (userID,res) =>{
    const token = jwt.sign({userID},"secret",{
        expiresIn:'15d'
    });
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true, //prevent xxs attack
        samesite:"strict"
    });
};
export default generatetoken;