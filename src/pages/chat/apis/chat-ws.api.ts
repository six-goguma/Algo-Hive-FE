import { useState, useEffect } from 'react';

import { subscribe, sendMessage } from '@shared/service';

// 사용자 입장 알림
export const joinChatRoom = (userName: string, roomName: string) => {
  sendMessage('/api/app/chat/join', { userName, roomName });
};

// 메시지 전송
export const sendChatMessage = (roomName: string, sender: string, content: string) => {
  sendMessage(`/api/app/chat/${roomName}`, { sender, content, roomName });
};

// 사용자 목록 구독
export const subscribeUsers = (
  callback: (users: { userName: string; roomName: string }[]) => void,
) => {
  subscribe('/topic/users', callback);
};

// 채팅방별 접속인원 목록 구독
export const SubscribeRoomUsers = () => {
  const [roomUsers, setRoomUsers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const subscription = subscribe('/topic/room-users', (data) => {
      setRoomUsers(data);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return roomUsers;
};
// 특정 채팅방 메시지 구독
export const subscribeRoomMessages = (
  roomName: string,
  callback: (message: { sender: string; content: string; roomName: string }) => void,
) => {
  subscribe(`/topic/${roomName}`, callback);
};
