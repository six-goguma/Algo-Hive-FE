import { HStack, Text } from '@chakra-ui/react';

// import { ClockIcon, Heart } from 'lucide-react';

export const Tabs = () => {
  return (
    <HStack w='full' gap={0} py={8} color='customGray.400'>
      <HStack
        cursor='pointer'
        gap={2}
        px={2}
        py={2}
        borderBottom='2px'
        transition='all 0.2s ease-in-out'
        _active={{ color: 'custom.blue', transition: 'all 0.2s ease-in-out' }}
        _hover={{ color: 'custom.blue', transition: 'all 0.2s ease-in-out' }}
      >
        {/* <ClockIcon size={20} /> */}
        <Text as='b'>최신</Text>
      </HStack>
      <HStack
        gap={2}
        px={2}
        py={2}
        cursor='pointer'
        borderBottom='2px'
        transition='all 0.2s ease-in-out'
        _active={{ color: 'custom.blue', transition: 'all 0.2s ease-in-out' }}
        _hover={{ color: 'custom.blue', transition: 'all 0.2s ease-in-out' }}
      >
        {/* <Heart size={20} /> */}
        <Text as='b'>좋아요</Text>
      </HStack>
    </HStack>
  );
};
