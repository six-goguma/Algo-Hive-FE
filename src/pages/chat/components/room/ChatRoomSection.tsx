import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { ChatRoomList } from '@pages/chat/components/room/ChatRoomList';

export const ChatRoomSection = ({ onSelectRoom }: { onSelectRoom: (roomName: string) => void }) => {
  return (
    <>
      <Flex w='full' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
          채팅방 목록
        </Text>
        <Button h='32px' w='120px'>
          채팅방 생성
        </Button>
      </Flex>
      <Box bg='blue.500' height='3px' width='100%' />
      <Box w='full' h='460px' bg='white' overflowY='auto'>
        <ChatRoomList onSelectRoom={onSelectRoom} />
      </Box>
    </>
  );
};
