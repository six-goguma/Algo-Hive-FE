import { HStack, Text } from '@chakra-ui/react';

export const Tabs = () => {
  return (
    <HStack w='290px' spacing={0} pt={8} pb={2} color='custom.blue'>
      <HStack
        align='start'
        cursor='pointer'
        px={2}
        py={2}
        borderBottom='2px'
        transition='color 0.2s ease-in-out'
        _active={{ color: 'custom.blue' }}
        _hover={{ color: 'custom.blue' }}
      >
        <Text fontWeight='bold'>내가 작성한 글</Text>
      </HStack>
    </HStack>
  );
};
