import { Flex } from '@chakra-ui/react';

import { useChatRoomContext } from '../../hooks';
import { ChatUserListItem } from '../user';

export const ChatUserList = () => {
  const { selectedRoom, onlineUsers } = useChatRoomContext();

  const filteredUsers = onlineUsers.filter((user) => user.roomName === selectedRoom);

  return (
    <Flex flexDir='column' w='full'>
      {filteredUsers.map((user) => (
        <ChatUserListItem key={user.userName} nickName={user.userName} />
      ))}
    </Flex>
  );
};
