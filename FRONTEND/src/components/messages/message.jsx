import { useAuthContext } from "../../context/AuthContext"
import { extractTime } from "../../utilis/extractTime";
import useConversation from "../../zusdtand/useConversation";

const Message = ({message})=>{
	const {authUser} = useAuthContext();
	const {selectedConversation} = useConversation();
	const fromMe = message.senderID === authUser._id
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe? 'chat-end':'chat-start';
    const b = fromMe? 'bg-blue-500':" ";	



    return(
    <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src=""/>
				</div>
			</div>
			<div className={`chat-bubble text-white ${b} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
)}
export default Message