import { useState } from 'react';

import {
  Flex,
  Box,
  Text,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';

import { EyeClosedIcon, EyeIcon } from 'lucide-react';

import { SIGNUP_DATA } from '../../data';

export const PasswordSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box as="section" mb={3}>
      <Flex mb={4} flexDir="column" gap={1}>
        <Text as="b" color="customGray.300">
          {SIGNUP_DATA.PASSWORD.PASSWORD_SUBTITLE}
        </Text>
        <Text fontSize="sm" color="customGray.300">
          {SIGNUP_DATA.PASSWORD.PASSWORD_RULE}
        </Text>
      </Flex>
      <VStack spacing={4}>
        <InputGroup>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            fontSize="sm"
            placeholder={SIGNUP_DATA.PASSWORD.PASSWORD_PLACEHOLDER}
          />
          <InputRightElement>
            <Button
              bg="none"
              border="none"
              _hover={{}}
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <EyeIcon color="gray" /> : <EyeClosedIcon color="gray" />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <InputGroup>
          <Input
            id="passwordConfirm"
            type={showConfirmPassword ? 'text' : 'password'}
            fontSize="sm"
            placeholder={SIGNUP_DATA.PASSWORD.PASSWORD_CONFIRM_PLACEHOLDER}
          />
          <InputRightElement>
            <Button
              bg="none"
              border="none"
              _hover={{}}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {!showConfirmPassword ? <EyeIcon color="gray" /> : <EyeClosedIcon color="gray" />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </VStack>
    </Box>
  );
};
