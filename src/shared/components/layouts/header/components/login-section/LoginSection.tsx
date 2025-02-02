import { Box, Flex, Input, Text, VStack } from '@chakra-ui/react';

import { LOGIN_DATA } from '../../data';

export const LoginSection = () => {
  return (
    <Box as='section'>
      <Flex mb={4}>
        <Text as='b' color='customGray.300'>
          {LOGIN_DATA.MODAL_SUBTITLE}
        </Text>
      </Flex>
      <VStack gap={4}>
        <Input id='email' fontSize='sm' placeholder={LOGIN_DATA.EMAIL_PLACEHOLDER} />
        <Input
          id='password'
          type='password'
          fontSize='sm'
          placeholder={LOGIN_DATA.PASSWORD_PLACEHOLDER}
        />
      </VStack>
    </Box>
  );
};
