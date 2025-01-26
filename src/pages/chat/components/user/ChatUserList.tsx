import { Flex } from '@chakra-ui/react';

import { mockOnlineUserList } from '../../mock/mockOnlineUserList';
import { ChatUserListItem } from '../user/ChatUserListItem';

export const ChatUserList = () => {
  return (
    <Flex flexDir='column' w='full'>
      {mockOnlineUserList.map((user) => (
        <ChatUserListItem key={user.id} nickName={user.userName} />
      ))}
    </Flex>
  );
};
