import { fetchInstance } from '@shared/service';

import { ResponseChatRooms, ResponseChatMessage } from './chat-rooms.type';

export const getChatRoomsPath = '/chat/rooms';
export const createChatRoomPath = 'chat/rooms';
export const getChatMessagesPath = '/chat/messages';

// 모든 채팅방 불러오기
export const getChatRooms = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'createdAt,desc',
): Promise<ResponseChatRooms> => {
  try {
    const response = await fetchInstance.get<ResponseChatRooms>(
      `${getChatRoomsPath}?page=${page}&size=${size}&sort=${sort}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
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
