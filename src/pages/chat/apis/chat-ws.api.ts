import { subscribe, sendMessage } from '@shared/service';

// 사용자 입장 알림
export const joinChatRoom = (userName: string, roomName: string) => {
  sendMessage('/api/app/chat/join', { userName, roomName });
  console.log(`[${userName}] 님이 [${roomName}] 채팅방에 입장했습니다.`);
};

// 메시지 전송
export const sendChatMessage = (roomName: string, sender: string, content: string) => {
  sendMessage(`/api/app/chat/${roomName}`, { sender, content, roomName });
};

// 사용자 목록 구독
export const subscribeUsers = (
  callback: (users: { userName: string; roomName: string }[]) => void,
) => {
  return subscribe('/topic/users', callback); // 구독 객체 반환
};

// 특정 채팅방 메시지 구독
export const subscribeRoomMessages = (
  roomName: string,
  callback: (message: { sender: string; content: string; roomName: string }) => void,
) => {
  subscribe(`/topic/${roomName}`, callback);
};
