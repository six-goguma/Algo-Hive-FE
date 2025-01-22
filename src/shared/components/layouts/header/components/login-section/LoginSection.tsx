import { Box, Flex, Input, Text, VStack } from '@chakra-ui/react';

import { LOGIN_SCHEMA } from '../../schema';

export const LoginSection = () => {
  return (
    <Box as="section">
      <Flex mb={4}>
        <Text as="b" color="customGray.300">
          {LOGIN_SCHEMA.MODAL_SUBTITLE}
        </Text>
      </Flex>
      <VStack spacing={4}>
        <Input id="email" fontSize="sm" placeholder={LOGIN_SCHEMA.EMAIL_PLACEHOLDER} />
        <Input
          id="password"
          type="password"
          fontSize="sm"
          placeholder={LOGIN_SCHEMA.PASSWORD_PLACEHOLDER}
        />
      </VStack>
    </Box>
  );
};
