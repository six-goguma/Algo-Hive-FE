import { createContext, useState, ReactNode } from 'react';

interface ChatContextType {
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
  onlineUsers: { userName: string; roomName: string }[];
  setOnlineUsers: (users: { userName: string; roomName: string }[]) => void;
  roomUsers: { [key: string]: number }; // 채팅방별 접속인원 목록
  setRoomUsers: (users: { [key: string]: number }) => void;
}

export const ChatRoomContext = createContext<ChatContextType | undefined>(undefined);

export const ChatRoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const [onlineUsers, setOnlineUsers] = useState<{ userName: string; roomName: string }[]>([]);
  const [roomUsers, setRoomUsers] = useState<{ [key: string]: number }>({}); // 채팅방별 접속인원 목록

  return (
    <ChatRoomContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,

        onlineUsers,
        setOnlineUsers,
        roomUsers,
        setRoomUsers,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};
