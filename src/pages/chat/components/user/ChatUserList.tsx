import { Flex } from '@chakra-ui/react';

import { ChatUserListItem } from '@pages/chat/components/user/ChatUserListItem';
import { mockOnlineUserList } from '@pages/chat/mock/mockOnlineUserList';

export const ChatUserList = () => {
  return (
    <Flex flexDir='column' w='full'>
      {mockOnlineUserList.map((user) => (
        <ChatUserListItem key={user.id} nickName={user.userName} />
      ))}
    </Flex>
  );
};
