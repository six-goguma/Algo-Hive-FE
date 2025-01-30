import { fetchInstance } from '@shared/service';

import { ResponseChatRooms } from './chat-rooms.type';

export const getChatRoomsPath = '/chat/rooms';

export const getChatRooms = async (): Promise<ResponseChatRooms[]> => {
  const response = await fetchInstance.get<ResponseChatRooms[]>(getChatRoomsPath);
  return response.data;
};
