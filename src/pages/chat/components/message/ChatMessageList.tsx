import { ChatMessage } from '@pages/chat/components/message/ChatMessage';

export const ChatMessageList = ({
  messages,
  userNickname,
}: {
  messages: Array<{ sender: string; content: string }>;
  userNickname: string; // Prop으로 닉네임 전달
}) => {
  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} userNickname={userNickname} />
      ))}
    </div>
  );
};
