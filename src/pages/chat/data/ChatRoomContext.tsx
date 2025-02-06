import { createContext, useState, ReactNode } from 'react';

import { ChatMessage } from '../apis';

interface ChatContextType {
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
  isEntered: boolean;
  setIsEntered: (entered: boolean) => void;
  messages: ChatMessage[];
  onlineUsers: { userName: string; roomName: string }[];
  roomUsers: { [key: string]: number }; // 채팅방별 접속인원 목록
}

export const ChatRoomContext = createContext<ChatContextType | undefined>(undefined);

export const ChatRoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isEntered, setIsEntered] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<{ userName: string; roomName: string }[]>([]);
  const [roomUsers, setRoomUsers] = useState<{ [key: string]: number }>({}); // 채팅방별 접속인원 목록

  return (
    <ChatRoomContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,
        isEntered,
        setIsEntered,
        messages,
        onlineUsers,
        roomUsers,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};
