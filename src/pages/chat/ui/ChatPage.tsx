import { useNavigate } from 'react-router-dom';

import { Box, Flex, Button } from '@chakra-ui/react';

import { RouterPath } from '@shared/constants';

import { ChatRoomSection, ChatRoomInsideSection, ChatUserSection } from '../components';
import { useChatRoomContext } from '../hooks';

export const ChatPage = () => {
  const navigate = useNavigate();
  const { selectedRoom } = useChatRoomContext();

  return (
    <Flex flexDir='column' alignItems='center' w='full' h='full'>
      <Button
        mt='40px'
        mb='10px'
        size='sm'
        colorScheme='blue'
        variant='outline'
        alignSelf='flex-end'
        onClick={() => navigate(RouterPath.MAIN)}
      >
        게시글 보기
      </Button>

      <Flex w='full' gap='35px' h='full'>
        {/* 채팅방 목록 */}
        <Box w='40%' bg='#F7F9FB'>
          <ChatRoomSection />
        </Box>

        {/* 채팅방 내부 (선택된 방이 있는 경우만 표시) */}
        <Box w='70%' bg='#F7F9FB'>
          {selectedRoom && <ChatRoomInsideSection />}
        </Box>

        {/* 채팅 참여자 목록 */}
        <Box w='30%' bg='#F7F9FB'>
          <ChatUserSection />
        </Box>
      </Flex>
    </Flex>
  );
};
