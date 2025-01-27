import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Flex, Button, useMediaQuery } from '@chakra-ui/react';

import { breakPoints } from '@shared/styles';

import { ChatRoomSection, ChatRoomInsideSection, ChatUserSection } from '../components';

export const ChatPage = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isEntered, setIsEntered] = useState(false);

  //휴대폰 뷰
  const [isMobileView] = useMediaQuery(`(max-width: ${breakPoints.sm})`);

  const goBack = () => {
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
        {(isMobileView && !selectedRoom) || !isMobileView ? (
          <Box w={isMobileView ? '100%' : '30%'} bg='#F7F9FB'>
            {isEntered ? (
              <ChatUserSection
                onGoBack={() => {
                  goBack();
                }}
              />
            ) : (
              <ChatRoomSection onSelectRoom={setSelectedRoom} />
            )}
          </Box>
        ) : null}

        {(isMobileView && selectedRoom) || !isMobileView ? (
          <Box w={isMobileView ? '100%' : '70%'} bg='#F7F9FB'>
            {selectedRoom && (
              <>
                <ChatRoomInsideSection
                  roomName={selectedRoom}
                  onComplete={() => setIsEntered(true)}
                />

                {isMobileView && (
                  <Flex justifyContent='center' mt='20px'>
                    <Button colorScheme='blue' variant='outline' onClick={goBack}>
                      채팅방 목록 보기
                    </Button>
                  </Flex>
                )}
              </>
            )}
          </Box>
        ) : null}
      </Flex>
    </Flex>
  );
};
