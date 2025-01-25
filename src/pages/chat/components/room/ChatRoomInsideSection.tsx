import { useState } from 'react';

import { Box, Text } from '@chakra-ui/react';

import { ChatInputBox } from '@pages/chat/components/input/ChatInputBox';
import { ChatMessageList } from '@pages/chat/components/message/ChatMessageList';
import { SetUserNameModal } from '@pages/chat/components/modal/SetUserNameModal';
import { mockChatMessageList } from '@pages/chat/mock/mockChatMessageList';

export const ChatRoomInsideSection = ({
  roomName,
  onComplete,
}: {
  roomName: string;
  onComplete: () => void; // onComplete Prop 추가
}) => {
  const messages = mockChatMessageList.filter((message) => message.roomName === roomName);
  const [isEntered, setIsEntered] = useState(false);
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
      {isEntered ? (
        <ChatInputBox />
      ) : (
        <SetUserNameModal
          onComplete={() => {
            setIsEntered(true);
            onComplete(); // 부모 상태 업데이트
          }}
        />
      )}
    </>
  );
};
