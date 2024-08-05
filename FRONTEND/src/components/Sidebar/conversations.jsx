import Conversation from "./conversation";
import useGetConversations from "../../hooks/useGetConversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  console.log("CONVERSATIONS:", conversations);

  return (
    <div className='py-2 flex flex-col h-[calc(100vh-200px)] overflow-y-auto'>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;