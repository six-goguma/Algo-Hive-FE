import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Flex, Button } from '@chakra-ui/react';

import { ChatRoomSection, ChatRoomInsideSection } from '@pages/chat/components/room';
import { ChatUserSection } from '@pages/chat/components/user/ChatUserSection';

export const ChatPage = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isEntered, setIsEntered] = useState(false); // 사용자 설정 완료 상태

  const handleGoBack = () => {
    setIsEntered(false);
    setSelectedRoom(null);
  };

  return (
    <Flex flexDir='column' alignItems='center' w='full' h='100vh'>
      <Button
        mt='40px'
        mb='10px'
        size='sm'
        colorScheme='blue'
        variant='outline'
        alignSelf='flex-end'
        onClick={() => {
          navigate('/');
        }}
      >
        게시글 보기
      </Button>
      <Flex w='full' gap='35px' h='full'>
        <Box w='30%' bg='#F7F9FB'>
          {isEntered ? (
            <ChatUserSection
              onGoBack={() => {
                handleGoBack();
              }}
            />
          ) : (
            <ChatRoomSection onSelectRoom={setSelectedRoom} />
          )}
        </Box>
        <Box w='70%' bg='#F7F9FB'>
          {selectedRoom && (
            <ChatRoomInsideSection roomName={selectedRoom} onComplete={() => setIsEntered(true)} />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
