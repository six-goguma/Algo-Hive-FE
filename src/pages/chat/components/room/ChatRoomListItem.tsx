import { Flex, Text } from '@chakra-ui/react';

export const ChatRoomListItem = ({
  roomName,
  onClick,
  isSelected,
}: {
  roomName: string;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <Flex
      w='full'
      h='44px'
      align='center'
      pl='20px'
      bg={isSelected ? '#E8EFFC' : 'transparent'}
      _hover={{ bg: '#E8EFFC' }}
      cursor='pointer'
      onClick={onClick}
    >
      <Text fontSize='12px' fontWeight='medium'>
        {roomName}
      </Text>
    </Flex>
  );
};
