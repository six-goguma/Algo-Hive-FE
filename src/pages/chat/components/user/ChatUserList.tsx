import { useState, useEffect } from 'react';

import { Flex } from '@chakra-ui/react';

import { subscribeUsers } from '../../apis';
import { useChatRoomContext } from '../../hooks';
import { ChatUserListItem } from '../user';

export const ChatUserList = () => {
  const [onlineUsers, setOnlineUsers] = useState<{ userName: string; roomName: string }[]>([]);
  const { selectedRoom } = useChatRoomContext();
  useEffect(() => {
    const subscription = subscribeUsers((users) => {
      console.log('현재 접속한 사용자 목록:', users);
      setOnlineUsers(users);
    });

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, [selectedRoom]);

  const filteredUsers = onlineUsers.filter((user) => user.roomName === selectedRoom);

  return (
    <Flex flexDir='column' w='full'>
      {filteredUsers.map((user) => (
        <ChatUserListItem key={user.userName} nickName={user.userName} />
      ))}
    </Flex>
  );
};
