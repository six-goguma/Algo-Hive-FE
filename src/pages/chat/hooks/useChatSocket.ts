import { useEffect } from 'react';
import { useState } from 'react';

import { connectWebSocket, disconnectWebSocket, subscribe, sendMessage } from '@shared/service';

import { ChatMessage } from '../apis';
import { userNickname } from '../data';
import { useChatRoomContext } from '../hooks';

export const useChatSocket = () => {
  const { selectedRoom } = useChatRoomContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<{ userName: string; roomName: string }[]>([]);
  const [roomUsers, setRoomUsers] = useState<{ [key: string]: number }>({});

  // selectedRoom이 변경될 때마다 소켓 연결 및 구독
  useEffect(() => {
    if (!selectedRoom) return;

    // 기존 소켓 연결 해제
    disconnectWebSocket();

    // 새로운 소켓 연결
    connectWebSocket(
      () => {
        console.log(`✅ WebSocket 연결 완료, 채팅방 입장: ${selectedRoom}`);

        // 채팅방 입장 알림
        sendMessage('/api/app/chat/join', { userName: userNickname, roomName: selectedRoom });

        // 채팅 메시지 구독
        subscribe(`/topic/${selectedRoom}`, (message: ChatMessage) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        // 접속한 사용자 목록 구독
        subscribe('/topic/users', (users: { userName: string; roomName: string }[]) => {
          setOnlineUsers(users);
        });

        // 채팅방별 접속인원 목록 구독
        subscribe('/topic/room-users', (data: { [key: string]: number }) => {
          setRoomUsers(data);
          console.log('채팅방별 사용자 수:', data);
        });
      },
      (error) => {
        console.error('WebSocket 연결 오류:', error);
      },
    );

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      disconnectWebSocket();
    };
  }, [selectedRoom]);

  return { messages, onlineUsers, roomUsers };
};
