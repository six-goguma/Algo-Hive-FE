import { Flex, Text, Box } from '@chakra-ui/react';

type ChatRoomListItemProps = {
  roomName: string;
  currentUsers: number;
  onClick: () => void;
  isSelected: boolean;
};
export const ChatRoomListItem = ({
  roomName,
  currentUsers,
  onClick,
  isSelected,
}: ChatRoomListItemProps) => {
  return (
    <Flex
      w='full'
      h='60px'
      align='center'
      p='0 20px 0 20px'
      bg={isSelected ? '#E8EFFC' : 'transparent'}
      _hover={{ bg: '#E8EFFC' }}
      cursor='pointer'
      onClick={onClick}
      justify='space-between'
    >
      <Text fontSize='14px' fontWeight='medium'>
        {roomName}
      </Text>
      {currentUsers === 0 ? (
        <Box boxSize='24px' bg='customGray.400' borderRadius='5px' alignContent='center'>
          <Text fontSize='12px' fontWeight='bold' color='white' ml='auto'>
            {currentUsers}
          </Text>
        </Box>
      ) : (
        <Box boxSize='24px' bg='custom.blue' borderRadius='5px' alignContent='center'>
          <Text fontSize='12px' fontWeight='bold' color='white' ml='auto'>
            {currentUsers}
          </Text>
        </Box>
      )}
    </Flex>
  );
};
