import { getChatMessages, ResponseChatMessage } from '../apis';
import { useQuery } from '@tanstack/react-query';

const chatMessagesQueryKey = (roomName: string) => ['chatMessages', roomName];

export const useGetChatMessages = (roomName: string) => {
  return useQuery<ResponseChatMessage[]>({
    queryKey: chatMessagesQueryKey(roomName),
    queryFn: async () => {
      const messages = await getChatMessages(roomName);
      return messages;
    },
    enabled: !!roomName, // roomName이 있을 때만 쿼리 실행
  });
};
