import { Flex, Box, Text, VStack } from '@chakra-ui/react';

import { PasswordInput } from '@shared/components';

import { SIGNUP_DATA } from '../../data';

export const PasswordSection = () => {
  return (
    <Box as='section' mb={3}>
      <Flex mb={4} flexDir='column' gap={1}>
        <Text as='b' color='customGray.300'>
          {SIGNUP_DATA.PASSWORD.PASSWORD_SUBTITLE}
        </Text>
        <Text fontSize='sm' color='customGray.300'>
          {SIGNUP_DATA.PASSWORD.PASSWORD_RULE}
        </Text>
      </Flex>
      <VStack gap={4}>
        <PasswordInput
          fontSize='sm'
          size='sm'
          placeholder={SIGNUP_DATA.PASSWORD.PASSWORD_PLACEHOLDER}
        />
        <PasswordInput
          fontSize='sm'
          size='sm'
          placeholder={SIGNUP_DATA.PASSWORD.PASSWORD_PLACEHOLDER}
        />
      </VStack>
    </Box>
  );
};
