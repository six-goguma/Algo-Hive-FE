import { Box, Button, Text } from '@chakra-ui/react';

import { ChatInputBox } from '@pages/chat/components/input/ChatInputBox';

export const ChatRoomInsideSection = () => {
  return (
    <>
      <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
        자유 채팅방
      </Text>
      <Box bg='blue.500' height='3px' width='100%' />
      <ChatInputBox />
      <Button mt='15px' h='36px' w='100px'>
        채팅방 입장하기
      </Button>
    </>
  );
};
