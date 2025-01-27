import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { ChatUserList } from '../user';

type ChatUserSectionProps = {
  onGoBack: () => void;
};
export const ChatUserSection = ({ onGoBack }: ChatUserSectionProps) => {
  return (
    <>
      <Flex w='full' h='36px' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
          현재 접속자
        </Text>
        <Button h='32px' w='140px' px={5} onClick={onGoBack}>
          채팅방 목록 보기
        </Button>
      </Flex>
      <Box bg='custom.blue' h='3px' w='full' />
      <Box w='full' h='460px' bg='white' overflowY='auto'>
        <ChatUserList />
      </Box>
    </>
  );
};
