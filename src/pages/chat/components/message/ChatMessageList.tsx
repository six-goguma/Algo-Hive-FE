import { ChatMessage } from '@pages/chat/components/message/ChatMessage';

export const ChatMessageList = ({
  messages,
}: {
  messages: Array<{ sender: string; content: string }>;
}) => {
  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};
