import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { ChatUserList } from '@pages/chat/components/user/ChatUserList';

export const ChatUserSection = ({ onGoBack }: { onGoBack: () => void }) => {
  return (
    <>
      <Flex w='full' h='36px' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
          현재 접속자
        </Text>
        <Button h='32px' w='140px' onClick={onGoBack}>
          채팅방 목록 보기
        </Button>
      </Flex>
      <Box bg='blue.500' height='3px' width='100%' />
      <Box w='full' h='460px' bg='white' overflowY='auto'>
        <ChatUserList />
      </Box>
    </>
  );
};
