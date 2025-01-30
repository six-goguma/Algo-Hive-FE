import { getChatRooms, getChatRoomsPath, ResponseChatRooms } from '../apis';
import { useQuery } from '@tanstack/react-query';

const ChatRoomsQueryKey = () => [getChatRoomsPath];

export const useGetChatRooms = () => {
  return useQuery<ResponseChatRooms[]>({
    queryKey: ChatRoomsQueryKey(),
    queryFn: async () => {
      const chatRooms = await getChatRooms();
      return chatRooms;
    },
  });
};
