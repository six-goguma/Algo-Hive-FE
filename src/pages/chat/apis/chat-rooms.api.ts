import { fetchInstance } from '@shared/service';

import { ResponseChatRooms, ResponseChatMessages } from './chat-rooms.type';

export const getChatRoomsPath = '/chat/rooms';
export const createChatRoomPath = '/chat/rooms';
export const getChatMessagesPath = '/chat/messages';

// 모든 채팅방 불러오기
export const getChatRooms = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc',
): Promise<ResponseChatRooms> => {
  const response = await fetchInstance.get<ResponseChatRooms>(
    `${getChatRoomsPath}?page=${page}&size=${size}&sort=${sort}`,
  );
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
export const getChatMessages = async (
  roomName: string,
  page: number = 0,
  size: number = 10,
  sort: string = 'chatTime,desc',
): Promise<ResponseChatMessages> => {
  const response = await fetchInstance.get<ResponseChatMessages>(
    `${getChatMessagesPath}/${roomName}?page=${page}&size=${size}&sort=${sort}`,
  );
  return response.data;
};
