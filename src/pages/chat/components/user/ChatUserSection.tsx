import { Box, Flex, Text } from '@chakra-ui/react';

import { ChatUserList } from '../user';

export const ChatUserSection = () => {
  return (
    <>
      <Flex w='full' h='36px' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
          현재 접속자
        </Text>
      </Flex>
      <Box bg='custom.blue' h='3px' w='full' />
      <Box w='full' h='600px' bg='white' overflowY='auto'>
        <ChatUserList />
      </Box>
    </>
  );
};
