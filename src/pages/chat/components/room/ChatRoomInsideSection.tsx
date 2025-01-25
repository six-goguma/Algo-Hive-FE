import { Box, Text } from '@chakra-ui/react';

// import { ChatInputBox } from '@pages/chat/components/input/ChatInputBox';

export const ChatRoomInsideSection = ({ roomName }: { roomName: string }) => {
  return (
    <>
      <Box w='full' h='36px'>
        {' '}
        {/* 고정 높이 설정 */}
        <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
          {roomName || ''}
        </Text>
      </Box>

      <Box bg='blue.500' height='3px' width='100%' />
      {/* <ChatInputBox />
      <Button mt='15px' h='36px' w='100px'>
        채팅방 입장하기
      </Button> */}
    </>
  );
};
