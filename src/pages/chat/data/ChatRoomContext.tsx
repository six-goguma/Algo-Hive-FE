import { createContext, useState, ReactNode } from 'react';

interface ChatContextType {
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
}

export const ChatRoomContext = createContext<ChatContextType | undefined>(undefined);

export const ChatRoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <ChatRoomContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};
