import { getChatRooms, getChatRoomsPath, ResponseChatRooms } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const chatRoomsQueryKey = (page: number, size: number, sort: string) => [
  getChatRoomsPath,
  page,
  size,
  sort,
];

export const useGetChatRooms = (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc',
) => {
  return useQuery<ResponseChatRooms>({
    queryKey: chatRoomsQueryKey(page, size, sort), // 페이지 값 추가
    queryFn: () => getChatRooms(page, size, sort),
  });
};
