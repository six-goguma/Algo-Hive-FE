import { Flex, Box, VStack, Input, Button, Text } from '@chakra-ui/react';

import { SIGNUP_SCHEMA } from '../../schema';

export const NicknameSection = () => {
  return (
    <Box as="section" mb={5}>
      <Flex mb={4} flexDir="column" gap={1}>
        <Text as="b" color="customGray.300">
          {SIGNUP_SCHEMA.NICKNAME.NICKNAME_SUBTITLE}
        </Text>
        <Text fontSize="sm" color="customGray.300">
          {SIGNUP_SCHEMA.NICKNAME.NICKNAME_RULE}
        </Text>
      </Flex>
      <VStack spacing={4}>
        <Flex w="full" gap={3} alignItems="center">
          <Input
            id="nickname"
            fontSize="sm"
            placeholder={SIGNUP_SCHEMA.NICKNAME.NICKNAME_PLACEHOLDER}
          />
          <Button w="100px" h={10}>
            {SIGNUP_SCHEMA.NICKNAME.NICKNAME_BUTTON}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};
