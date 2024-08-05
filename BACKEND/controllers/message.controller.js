import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverID } = req.params;
        const senderID = req.user._id; // Changed to senderID for consistency

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderID, receiverID] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderID, receiverID]
            });
        }

        const newMessage = new Message({
            senderID,  // Make sure this matches your Message model
            receiverID,
            message
        });

        
		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}
          //SOCKET IO FUNCTIONALUTY
          await Promise.all([conversation.save(), newMessage.save()]);

          const receiverSocketId = getReceiverSocketId(receiverID);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}



          
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default sendMessage;

export const getMessage = async(req,res)=>{
   try{
     const {id:userToChatId} = req.params;
     const senderID = req.user._id;
     const conversation = await Conversation.findOne({
        participants:{$all:[senderID,userToChatId]}
     }).populate("messages");
     if(!conversation){
        return res.json([""])
     }

     res.status(200).json(conversation.messages);



   }catch(error){

   }
}

