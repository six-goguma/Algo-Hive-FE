import { Flex, VStack, Input, Button, Box, Text } from '@chakra-ui/react';

import { SIGNUP_SCHEMA } from '../../schema';

export const EmailSection = () => {
  return (
    <Box as="section" mb={5}>
      <Flex mb={4} flexDir="column" gap={1}>
        <Text as="b" color="customGray.300">
          {SIGNUP_SCHEMA.EMAIL.EMAIL_SUBTITLE}
        </Text>
        <Text fontSize="sm" color="customGray.300">
          {SIGNUP_SCHEMA.EMAIL.EMAIL_RULE}
        </Text>
      </Flex>
      <VStack spacing={4}>
        <Flex w="full" gap={3} alignItems="center">
          <Input id="email" fontSize="sm" placeholder={SIGNUP_SCHEMA.EMAIL.EMAIL_PLACEHOLDER} />
          <Button w="100px" h={10}>
            {SIGNUP_SCHEMA.EMAIL.EMAIL_BUTTON}
          </Button>
        </Flex>
        <Flex w="full" gap={3} alignItems="center">
          <Input
            id="code"
            fontSize="sm"
            placeholder={SIGNUP_SCHEMA.EMAIL.VERIFICATION_CODE_PLACEHOLDER}
          />
          <Button w="100px" h={10}>
            {SIGNUP_SCHEMA.EMAIL.VERIFICATION_CODE_BUTTON}
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};
