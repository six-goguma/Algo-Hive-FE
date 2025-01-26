import { Flex } from '@chakra-ui/react';

import { MOCK_ONLINE_USER_LIST } from '../../mock/mockOnlineUserList';
import { ChatUserListItem } from '../user';

export const ChatUserList = () => {
  return (
    <Flex flexDir='column' w='full'>
      {MOCK_ONLINE_USER_LIST.map((user) => (
        <ChatUserListItem key={user.id} nickName={user.userName} />
      ))}
    </Flex>
  );
};
