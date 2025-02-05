import { createChatRoom, ResponseChatRooms, RequestChatRooms } from '../apis';
import { chatRoomsQueryKey } from './useGetChatRooms';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseChatRooms, Error, RequestChatRooms>({
    mutationFn: (request) => createChatRoom(request.roomName),
    onSuccess: () => {
      // 채팅방 생성 성공 시, 채팅방 목록 쿼리를 무효화하여 다시 불러오기
      queryClient.invalidateQueries({ queryKey: chatRoomsQueryKey() });
    },
  });
};
