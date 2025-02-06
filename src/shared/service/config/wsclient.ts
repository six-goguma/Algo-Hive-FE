import { Client } from '@stomp/stompjs';

const WS_URI = 'ws://algo.knu-soft.site/api/ws';

let stompClient: Client | null = null;

export const connectWebSocket = (onConnected: () => void, onError: (error: unknown) => void) => {
  stompClient = new Client({
    brokerURL: WS_URI,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log('WebSocket 연결 성공');
      onConnected();
    },
    onStompError: (frame) => {
      console.error('STOMP 오류 발생:', frame);
      onError(frame);
    },
  });

  stompClient.activate();
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.deactivate();
    console.log('WebSocket 연결 종료');
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribe = (destination: string, callback: (message: any) => void) => {
  if (stompClient && stompClient.connected) {
    const subscription = stompClient.subscribe(destination, (message: { body: string }) => {
      callback(JSON.parse(message.body));
    });

    return subscription;
  } else {
    console.error('STOMP 클라이언트가 아직 연결되지 않음.');
    return null;
  }
};

export const sendMessage = (destination: string, body: object) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(body),
    });
  } else {
    console.error('WebSocket이 연결되지 않음.');
  }
};
