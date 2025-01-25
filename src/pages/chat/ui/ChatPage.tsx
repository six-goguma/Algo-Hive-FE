import { useState } from 'react';

import { Box, Flex, Button } from '@chakra-ui/react';

import { ChatRoomSection, ChatRoomInsideSection } from '@pages/chat/components/room';

export const ChatPage = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

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
          <ChatRoomSection onSelectRoom={setSelectedRoom} />
        </Box>
        <Box w='70%' bg='#F7F9FB'>
          {/* 선택된 방에 따라 ChatRoomInsideSection 출력 */}
          {selectedRoom ? (
            <ChatRoomInsideSection roomName={selectedRoom} />
          ) : (
            <Box>채팅방을 선택해주세요</Box>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
