import { Flex, Box, VStack, Input, Button, Text } from '@chakra-ui/react';

import { SIGNUP_DATA } from '../../data';

export const NicknameSection = () => {
  return (
    <Box as='section' mb={5}>
      <Flex mb={4} flexDir='column' gap={1}>
        <Text as='b' color='customGray.300'>
          {SIGNUP_DATA.NICKNAME.NICKNAME_SUBTITLE}
        </Text>
        <Text fontSize='sm' color='customGray.300'>
          {SIGNUP_DATA.NICKNAME.NICKNAME_RULE}
        </Text>
      </Flex>
      <VStack gap={4}>
        <Flex w='full' gap={3} alignItems='center'>
          <Input
            id='nickname'
            fontSize='sm'
            placeholder={SIGNUP_DATA.NICKNAME.NICKNAME_PLACEHOLDER}
          />
          <Button w='100px' h={10}>
            {SIGNUP_DATA.NICKNAME.NICKNAME_BUTTON}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};
