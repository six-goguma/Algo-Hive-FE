import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Flex, Button, useMediaQuery } from '@chakra-ui/react';

import { ChatRoomSection, ChatRoomInsideSection } from '@pages/chat/components/room';
import { ChatUserSection } from '@pages/chat/components/user/ChatUserSection';

import { breakPoints } from '@shared/styles/variants/breakpoints';

// 반응형 브레이크포인트 가져오기

export const ChatPage = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isEntered, setIsEntered] = useState(false); // 사용자 설정 완료 상태

  // 화면 크기 체크 (휴대폰 뷰 여부)
  const [isMobileView] = useMediaQuery(`(max-width: ${breakPoints.sm})`);

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
        {(isMobileView && !selectedRoom) || !isMobileView ? (
          <Box w={isMobileView ? '100%' : '30%'} bg='#F7F9FB'>
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
        ) : null}

        {(isMobileView && selectedRoom) || !isMobileView ? (
          <Box w={isMobileView ? '100%' : '70%'} bg='#F7F9FB'>
            {selectedRoom && (
              <>
                <ChatRoomInsideSection
                  roomName={selectedRoom}
                  onComplete={() => setIsEntered(true)}
                />
                {/* 채팅방 목록 보기 버튼 */}
                {isMobileView && (
                  <Flex justifyContent='center' mt='20px'>
                    <Button colorScheme='blue' variant='outline' onClick={handleGoBack}>
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
