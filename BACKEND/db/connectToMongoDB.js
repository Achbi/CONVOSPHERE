import mongoose from "mongoose";

const connectToMongoDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://harshitbahety41:0O7WBKeCf7Mr3ewB@cluster0.cubkyvu.mongodb.net/my-app-db?retryWrites=true&w=majority");
        
        console.log("connected to mongodb");
    } catch(error){
     console.log("connecting to mongodb",error.message)
    }
}
export default connectToMongoDB;