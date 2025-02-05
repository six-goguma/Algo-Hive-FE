import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WS_URI = 'ws://algo.knu-soft.site/api/ws';

let stompClient: Stomp.Client | null = null;

export const connectWebSocket = (onConnected: () => void, onError: (error: unknown) => void) => {
  const socket = new SockJS(WS_URI);
  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    () => {
      console.log('WebSocket 연결 성공');
      onConnected();
    },
    (error) => {
      console.error('WebSocket 연결 실패', error);
      onError(error);
    },
  );
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log('WebSocket 연결 종료');
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const subscribe = (destination: string, callback: (message: any) => void) => {
  if (stompClient) {
    stompClient.subscribe(destination, (message) => {
      callback(JSON.parse(message.body));
    });
  }
};

export const sendMessage = (destination: string, body: object) => {
  if (stompClient) {
    stompClient.send(destination, {}, JSON.stringify(body));
  }
};
