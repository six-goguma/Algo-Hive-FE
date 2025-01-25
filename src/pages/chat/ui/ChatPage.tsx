import { Box, Flex, Button, Text } from '@chakra-ui/react';

import { ChatInputBox } from '../components';

export const ChatPage = () => {
  return (
    <Flex flexDir='column' alignItems='center' w='full' h='100vh'>
      <Button
        mt='40px'
        mb='10px'
        size='sm'
        colorScheme='blue'
        variant='outline'
        alignSelf='flex-end'
      >
        게시글 보기
      </Button>
      <Flex w='full' gap='35px' h='full' bg='red.300'>
        <Box w='30%' bg='#F7F9FB'>
          <Flex w='full' justify='center'>
            <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
              채팅방 목록
            </Text>
            <Button h='32px' w='120px'>
              채팅방 생성
            </Button>
          </Flex>
          <Box bg='blue.500' height='3px' width='100%' />
          <Box w='full' h='460px' bg='white' overflowY='auto'></Box>
          <Button mt='15px' h='36px' w='100px'>
            채팅방 입장하기
          </Button>
        </Box>
        <Box w='70%' bg='#F7F9FB'>
          <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
            자유 채팅방
          </Text>
          <Box bg='blue.500' height='3px' width='100%' />
          <ChatInputBox />
        </Box>
      </Flex>
    </Flex>
  );
};
