import { Box, Flex, Button, Text } from '@chakra-ui/react';

import { ChatRoomSection, ChatRoomInsideSection } from '@pages/chat/components/room';

export const ChatPage = () => {
  return (
    <Flex flexDir='column' alignItems='center' w='full' h='100vh'>
      <Button
        mt='40px'
        mb='10px'
        size='sm'
        colorScheme='blue'
        variant='outline'
        alignSelf='flex-end'
      >
        게시글 보기
      </Button>
      <Flex w='full' gap='35px' h='full'>
        <Box w='30%' bg='#F7F9FB'>
          <ChatRoomSection />
        </Box>
        <Box w='70%' bg='#F7F9FB'></Box>
      </Flex>
    </Flex>
  );
};
