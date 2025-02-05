import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { ChatRoomList } from './ChatRoomList';

export const ChatRoomSection = () => {
  return (
    <>
      <Flex w='full' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
          채팅방 목록
        </Text>
        <Button h='32px' w='120px'>
          채팅방 생성
        </Button>
      </Flex>
      <Box bg='custom.blue' h='3px' w='full' />
      <Box w='full' h='600px' bg='white' overflowY='auto'>
        <ChatRoomList />
      </Box>
    </>
  );
};
