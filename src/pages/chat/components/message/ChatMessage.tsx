import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

type ChatMessageProps = {
  message: { sender: string; content: string };
  userNickname: string;
};
export const ChatMessage = ({ message, userNickname }: ChatMessageProps) => {
  const isCurrentUser = message.sender === userNickname; // sender와 닉네임 비교

  return (
    <Box w='full' h={!isCurrentUser ? '72px' : '44px'} mt='10px' position='relative'>
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
        {!isCurrentUser && <Avatar boxSize='36px' />}
        <Flex w='full' h='full' flexDir='column' align={isCurrentUser ? 'flex-end' : 'flex-start'}>
          {!isCurrentUser && (
            <Text
              w='full'
              textAlign={isCurrentUser ? 'right' : 'left'}
              fontSize='12px'
              fontWeight='semibold'
              mb='2px'
            >
              {message.sender}
            </Text>
          )}
          <Box
            w='auto'
            h='44px'
            p='10px'
            bg={isCurrentUser ? '#9BD9FF' : 'white'}
            fontSize='14px'
            borderRadius='5px'
            alignContent='center'
          >
            {message.content}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
