import { useState } from 'react';

import { Box, Flex, Button } from '@chakra-ui/react';

import { ChatRoomSection, ChatRoomInsideSection } from '@pages/chat/components/room';
import { ChatUserSection } from '@pages/chat/components/user/ChatUserSection';

export const ChatPage = () => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isEntered, setIsEntered] = useState(false); // 사용자 설정 완료 상태

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
          {isEntered ? (
            <ChatUserSection /> // 사용자 정보 화면
          ) : (
            <ChatRoomSection onSelectRoom={setSelectedRoom} />
          )}
        </Box>
        <Box w='70%' bg='#F7F9FB'>
          {selectedRoom && (
            <ChatRoomInsideSection
              roomName={selectedRoom}
              onComplete={() => setIsEntered(true)} // 완료 버튼 클릭 시 상태 변경
            />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
