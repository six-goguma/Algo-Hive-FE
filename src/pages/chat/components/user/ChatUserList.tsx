import { Box, Flex, Text, Avatar } from '@chakra-ui/react';

interface ChatUserListProps {
  usersInRooms: { userName: string; roomName: string }[]; // 현재 접속 중인 사용자 목록
}

export const ChatUserList = ({ usersInRooms }: ChatUserListProps) => {
  return (
    <Box w={{ base: 'full', sm: '36%' }} bg='#F7F9FB'>
      <Flex w='full' h='36px' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
          현재 접속자
        </Text>
      </Flex>
      <Box bg='custom.blue' h='3px' w='full' />
      <Box w='full' h='600px' bg='white' overflowY='auto'>
        <Flex flexDir='column' w='full' pt='10px'>
          {usersInRooms.map((user, index) => (
            <Flex key={index} w='full' h='56px' align='center' pl='20px' gap='10px'>
              <Avatar boxSize='24px' />
              <Text
                w='full'
                fontSize='14px'
                fontWeight='extrabold'
                noOfLines={2}
                overflow='hidden'
                textOverflow='ellipsis'
                wordBreak='break-word'
                textAlign='left'
              >
                {user.userName}
              </Text>
              {user.roomName === '채팅방 미접속' ? (
                <Text
                  fontSize='14px'
                  w='full'
                  fontWeight='medium'
                  color='gray'
                  justifySelf='flex-end'
                  pr='10px'
                  noOfLines={2}
                  overflow='hidden'
                  textOverflow='ellipsis'
                  wordBreak='break-word'
                >
                  {user.roomName}
                </Text>
              ) : (
                <Text
                  fontSize='14px'
                  w='full'
                  fontWeight='medium'
                  justifySelf='flex-end'
                  pr='10px'
                  noOfLines={2}
                  overflow='hidden'
                  textOverflow='ellipsis'
                  wordBreak='break-word'
                >
                  {user.roomName}
                </Text>
              )}
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};
