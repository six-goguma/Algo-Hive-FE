import { Box, Button, Text } from '@chakra-ui/react';

import { ChatMessageList } from '@pages/chat/components/message/ChatMessageList';
import { SetUserNameModal } from '@pages/chat/components/modal/SetUserNameModal';
import { mockChatMessageList } from '@pages/chat/mock/mockChatMessageList';

export const ChatRoomInsideSection = ({ roomName }: { roomName: string }) => {
  // roomName에 해당하는 메시지 바로 전달
  const messages = mockChatMessageList.filter((message) => message.roomName === roomName);

  return (
    <>
      <Box w='full' h='36px'>
        <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
          {roomName || ''}
        </Text>
      </Box>
      <Box bg='blue.500' height='3px' width='100%' />
      <Box w='full' h='409px' overflowY='auto'>
        <ChatMessageList messages={messages} />
      </Box>
      <SetUserNameModal />
    </>
  );
};
