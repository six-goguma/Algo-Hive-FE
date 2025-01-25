export const ChatMessage = ({ message }: { message: { sender: string; content: string } }) => {
  return (
    <div>
      <strong>{message.sender}:</strong> {message.content}
    </div>
  );
};
