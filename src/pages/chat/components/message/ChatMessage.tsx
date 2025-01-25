import { Box, Flex, Image, Text } from '@chakra-ui/react';

import userIcon from '@shared/_assets/userIcon.svg';

export const ChatMessage = ({ message }: { message: { sender: string; content: string } }) => {
  return (
    <Box w='full' h='60px' bg='blue.100' mt='18px' position='relative'>
      <Flex h='full' gap='7px' pl='8px' position='absolute' top='0'>
        <Image src={userIcon} alt='userIcon' boxSize='30px' />
        <Flex flexDir='column' align='center'>
          <Text w='full' textAlign='left' fontSize='12px' fontWeight='semibold'>
            {message.sender}
          </Text>
          <Box w='auto' h='38px' p='10px' bg='white' fontSize='12px' borderRadius='5px'>
            {message.content}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};
