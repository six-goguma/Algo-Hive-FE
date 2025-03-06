import { authStorage } from '@shared/utils';

import { BASE_WS_URI } from './instance';
import { Client } from '@stomp/stompjs';

let stompClient: Client | null = null;

export const connectWebSocket = (onConnectCallback?: () => void) => {
  stompClient = new Client({
    brokerURL: `${BASE_WS_URI}/api/ws`,
    debug: (str) => console.log(str),
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    onConnect: () => {
      console.log('WebSocket 연결됨');

      // 연결 완료 후 콜백 실행
      if (onConnectCallback) onConnectCallback();
    },
    onDisconnect: () => {
      console.log('WebSocket 연결 해제됨');
    },
    onStompError: (frame) => {
      console.error(`STOMP 오류: ${frame}`);
    },
  });

  stompClient.activate();
};

export const subsribeToNoRoom = () => {
  // 웹소켓 연결이 완료된 후에만 publish 수행
  stompClient?.publish({
    destination: '/api/app/chat/join',
    body: JSON.stringify({
      userName: authStorage.nickName.get() || '익명',
      roomName: '채팅방 미접속',
    }),
  });
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribeToRoom = (roomName: string, callback: (message: any) => void) => {
  if (!stompClient) {
    console.error('WebSocket이 연결되지 않음');
    return;
  }

  stompClient.publish({
    destination: '/api/app/chat/join',
    body: JSON.stringify({
      userName: authStorage.nickName.get() || '익명',
      roomName,
    }),
  });

  stompClient.subscribe(`/topic/${roomName}`, (messageOutput) => {
    const message = JSON.parse(messageOutput.body);
    message.content = message.content + ' ';
    callback(message);
  });

  console.log(`${roomName} 채팅방에 구독됨`);
};

export const unsubscribeFromRoom = (roomName: string) => {
  if (!stompClient) return;

  stompClient.unsubscribe(`/topic/${roomName}`);
  console.log(`${roomName} 채팅방에서 구독 해제됨`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribeToAllUsers = (callback: (userList: any) => void) => {
  if (!stompClient) {
    console.error('WebSocket이 연결되지 않음');
    return;
  }

  stompClient.subscribe('/topic/users', (messageOutput) => {
    const userList = JSON.parse(messageOutput.body);
    callback(userList);
  });

  console.log('전체 사용자 목록에 구독됨');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribeToRoomUsers = (callback: (roomUserList: any) => void) => {
  if (!stompClient) {
    console.error('WebSocket이 연결되지 않음');
    return;
  }

  stompClient.subscribe('/topic/room-users', (messageOutput) => {
    const roomUserList = JSON.parse(messageOutput.body);
    callback(roomUserList);
  });

  console.log('채팅방 사용자 목록에 구독됨');
};

export const sendMessage = (
  roomName: string,
  message: { sender: string; content: string; email: string },
) => {
  if (!stompClient) {
    console.error('WebSocket이 연결되지 않음');
    return;
  }

  stompClient.publish({
    destination: `/api/app/chat/${roomName}`,
    body: JSON.stringify(message),
  });

  console.log(`${roomName} 채팅방으로 메시지 전송됨`);
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    console.log('WebSocket 연결 해제 중...');
    stompClient.deactivate();
  }
};
