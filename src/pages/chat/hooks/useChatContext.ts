import { useContext } from 'react';

import { ChatRoomContext } from '../data';

export const useChatContext = () => {
  const context = useContext(ChatRoomContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
