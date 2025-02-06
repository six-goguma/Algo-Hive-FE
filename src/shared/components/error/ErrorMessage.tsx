import { Text } from '@chakra-ui/react';

type ErrorMessageProps = {
  message: string;
};

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <Text fontSize='sm' fontWeight='600' color='red.500'>
      {message}
    </Text>
  );
};
