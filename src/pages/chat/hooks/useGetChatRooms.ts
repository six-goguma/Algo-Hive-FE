import { getChatRooms, getChatRoomsPath, ResponseChatRooms } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const chatRoomsQueryKey = () => [getChatRoomsPath];

export const useGetChatRooms = () => {
  return useQuery<ResponseChatRooms[]>({
    queryKey: chatRoomsQueryKey(),
    queryFn: async () => {
      const chatRooms = await getChatRooms();
      return chatRooms;
    },
  });
};
