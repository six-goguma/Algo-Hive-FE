import { Flex, Text, Avatar } from '@chakra-ui/react';

export const ChatUserListItem = ({ nickName }: { nickName: string }) => {
  return (
    <Flex w='full' h='44px' align='center' pl='20px' gap='10px'>
      <Avatar boxSize='24px' />
      <Text fontSize='12px' fontWeight='medium'>
        {nickName}
      </Text>
    </Flex>
  );
};
