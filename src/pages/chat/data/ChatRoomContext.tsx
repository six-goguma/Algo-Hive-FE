import { createContext, useState, ReactNode } from 'react';

interface ChatContextType {
  selectedRoom: string | null;
  setSelectedRoom: (room: string | null) => void;
  isEntered: boolean;
  setIsEntered: (entered: boolean) => void;
}

export const ChatRoomContext = createContext<ChatContextType | undefined>(undefined);

export const ChatRoomContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isEntered, setIsEntered] = useState(false);

  return (
    <ChatRoomContext.Provider value={{ selectedRoom, setSelectedRoom, isEntered, setIsEntered }}>
      {children}
    </ChatRoomContext.Provider>
  );
};
