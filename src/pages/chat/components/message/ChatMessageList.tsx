import { ChatMessage } from './ChatMessage';

type ChatMessageListProps = {
  messages: Array<{ sender: string; content: string }>;
  userNickname: string;
};

export const ChatMessageList = ({ messages, userNickname }: ChatMessageListProps) => {
  return (
    <div>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} userNickname={userNickname} />
      ))}
    </div>
  );
};
