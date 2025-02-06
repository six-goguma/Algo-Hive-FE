import { useEffect, useState } from 'react';

import { subscribe } from '@shared/service';

// 채팅방별 접속인원 목록 구독

export const useSubscribeRoomUsers = () => {
  const [roomUsers, setRoomUsers] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const subscription = subscribe('/topic/room-users', (data) => {
      setRoomUsers(data);
      console.log('채팅방별 사용자 수:', data);
    });

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return roomUsers;
};
