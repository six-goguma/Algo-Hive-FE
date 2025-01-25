import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { ChatRoomList } from '@pages/chat/components/room/ChatRoomList';

export const ChatUserSection = ({ onSelectRoom }: { onSelectRoom: (roomName: string) => void }) => {
  return (
    <>
      <Flex w='full' h='36px' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
          현재 접속자
        </Text>
      </Flex>
      <Box bg='blue.500' height='3px' width='100%' />
      <Box w='full' h='460px' bg='white' overflowY='auto'>
        <ChatRoomList onSelectRoom={onSelectRoom} />
      </Box>
    </>
  );
};
