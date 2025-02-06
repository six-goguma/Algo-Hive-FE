import { ChatMessage } from './ChatMessage';

type ChatMessageListProps = {
  messages: Array<{ sender: string; content: string }>;
  userNickname: string;
};

export const ChatMessageList = ({ messages, userNickname }: ChatMessageListProps) => {
  return (
    <div style={{ paddingTop: '8px' }}>
      {messages
        .slice() // 배열 복사
        .reverse() // 시간순서대로 표시
        .map((message, index) => (
          <ChatMessage key={index} message={message} userNickname={userNickname} />
        ))}
    </div>
  );
};
