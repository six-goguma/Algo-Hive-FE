import { Flex, Text } from '@chakra-ui/react';

import { Avatar } from '@shared/components';

type ChatUserListItemProps = {
  nickName: string;
};
export const ChatUserListItem = ({ nickName }: ChatUserListItemProps) => {
  return (
    <Flex w='full' h='44px' align='center' pl='20px' gap='10px'>
      <Avatar boxSize='24px' />
      <Text fontSize='12px' fontWeight='medium'>
        {nickName}
      </Text>
    </Flex>
  );
};
