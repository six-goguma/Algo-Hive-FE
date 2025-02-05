import { getChatRooms, getChatRoomsPath, ResponseChatRooms } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const chatRoomsQueryKey = () => [getChatRoomsPath];

export const useGetChatRooms = (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc',
) => {
  return useQuery<ResponseChatRooms>({
    queryKey: chatRoomsQueryKey(),
    queryFn: () => getChatRooms(page, size, sort),
  });
};
