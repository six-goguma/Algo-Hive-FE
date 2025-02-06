import { useEffect, useState } from 'react';

import { connectWebSocket, disconnectWebSocket, subscribe, sendMessage } from '@shared/service';

import { ChatMessage } from '../apis';
import { useChatRoomContext } from '../hooks';

export const useChatSocket = () => {
  const { selectedRoom, isEntered } = useChatRoomContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<{ userName: string; roomName: string }[]>([]);

  // selectedRoom이 변경될 때마다 소켓 연결 및 구독
  useEffect(() => {
    if (!selectedRoom || !isEntered) return;

    // 기존 소켓 연결 해제
    disconnectWebSocket();

    // 새로운 소켓 연결
    connectWebSocket(
      () => {
        console.log(`✅ WebSocket 연결 완료, 채팅방 입장: ${selectedRoom}`);

        // 채팅방 입장 알림
        sendMessage('/api/app/chat/join', { userName: '사용자명', roomName: selectedRoom });

        // 채팅 메시지 구독
        subscribe(`/topic/${selectedRoom}`, (message: ChatMessage) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        // 접속한 사용자 목록 구독
        subscribe('/topic/users', (users: { userName: string; roomName: string }[]) => {
          setOnlineUsers(users);
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
  }, [selectedRoom, isEntered]);

  return { messages, onlineUsers };
};
