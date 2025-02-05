import { fetchInstance } from '@shared/service';

import { ResponseChatRooms, ResponseChatMessage } from './chat-rooms.type';

export const getChatRoomsPath = '/chat/rooms';
export const createChatRoomPath = '/api/vi/chat/rooms';
export const getChatMessagesPath = '/api/vi/chat/messages';

// 모든 채팅방 불러오기
export const getChatRooms = async (): Promise<ResponseChatRooms[]> => {
  const response = await fetchInstance.get<ResponseChatRooms[]>(getChatRoomsPath);
  return response.data;
};

//채팅방 생성
export const createChatRoom = async (roomName: string): Promise<ResponseChatRooms> => {
  const response = await fetchInstance.post<ResponseChatRooms>(createChatRoomPath, {
    body: JSON.stringify({ roomName }),
  });
  return response.data;
};

//채팅 불러오기
export const getChatMessages = async (roomName: string): Promise<ResponseChatMessage[]> => {
  const response = await fetchInstance.get<ResponseChatMessage[]>(
    `${getChatMessagesPath}/${roomName}`,
  );
  return response.data;
};
