import { Box, Flex, Image, Text } from '@chakra-ui/react';

import userIcon from '@shared/_assets/userIcon.svg';

// 로컬스토리지에서 사용자 닉네임 가져오기
const userNickname = localStorage.getItem('userNickname');

export const ChatMessage = ({ message }: { message: { sender: string; content: string } }) => {
  const isCurrentUser = message.sender === userNickname; // sender와 localStorage 닉네임 비교

  return (
    <Box w='full' h='60px' mt='18px' position='relative'>
      <Flex
        h='full'
        gap='7px'
        pl={!isCurrentUser ? '8px' : undefined} // 타인 메세지
        pr={isCurrentUser ? '8px' : undefined}
        position='absolute'
        top='0'
        left={!isCurrentUser ? '0' : undefined} // 타인 메세지일 경우 왼쪽
        right={isCurrentUser ? '0' : undefined} // 본인 메세지일 경우 오른쪽
        justifyContent={isCurrentUser ? 'flex-end' : 'flex-start'}
      >
        {/* 유저 아이콘 */}
        {!isCurrentUser && <Image src={userIcon} alt='userIcon' boxSize='30px' />}
        <Flex flexDir='column' align={isCurrentUser ? 'flex-end' : 'flex-start'}>
          <Text
            w='full'
            textAlign={isCurrentUser ? 'right' : 'left'}
            fontSize='12px'
            fontWeight='semibold'
          >
            {message.sender}
          </Text>
          <Box
            w='auto'
            h='38px'
            p='10px'
            bg={isCurrentUser ? '#9BD9FF' : 'white'} // 본인 메시지일 경우 배경색 변경
            fontSize='12px'
            borderRadius='5px'
          >
            {message.content}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
