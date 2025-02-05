import { useNavigate } from 'react-router-dom';

import { Box, Flex, Button, useMediaQuery } from '@chakra-ui/react';

import { RouterPath } from '@shared/constants';
import { breakPoints } from '@shared/styles';

import { ChatRoomSection, ChatRoomInsideSection, ChatUserSection } from '../components';
import { useChatRoomContext } from '../hooks';

export const ChatPage = () => {
  const navigate = useNavigate();
  const { setIsEntered, selectedRoom, setSelectedRoom } = useChatRoomContext();

  //휴대폰 뷰
  const [isMobileView] = useMediaQuery(`(max-width: ${breakPoints.sm})`);

  const goBack = () => {
    setIsEntered(false);
    setSelectedRoom(null);
  };

  return (
    <Flex flexDir='column' alignItems='center' w='full' h='full'>
      <Button
        mt='40px'
        mb='10px'
        size='sm'
        colorScheme='blue'
        variant='outline'
        alignSelf='flex-end'
        onClick={() => {
          navigate(RouterPath.MAIN);
        }}
      >
        게시글 보기
      </Button>
      <Flex w='full' gap='35px' h='full'>
        {(isMobileView && !selectedRoom) || !isMobileView ? (
          <Box w={isMobileView ? '100%' : '40%'} bg='#F7F9FB'>
            <ChatRoomSection />
          </Box>
        ) : null}

        {(isMobileView && selectedRoom) || !isMobileView ? (
          <Box w={isMobileView ? '100%' : '70%'} bg='#F7F9FB'>
            {selectedRoom && (
              <>
                <ChatRoomInsideSection />

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
        <Box w={isMobileView ? '100%' : '30%'} bg='#F7F9FB'>
          <ChatUserSection />
        </Box>
      </Flex>
    </Flex>
  );
};
