import { Button, Flex } from '@chakra-ui/react';

import { ArrowLeft } from 'lucide-react';

type PostButtonsProps = {
  buttonText: string;
  onClick: () => void;
};

export const PostButtons = ({ buttonText, onClick }: PostButtonsProps) => {
  return (
    <Flex
      w='full'
      h='50px'
      px={{ base: '10px', sm: '30px' }}
      mt='5px'
      bg='white'
      align='center'
      justify='space-between'
    >
      <Button
        variant='ghost'
        colorScheme='gray'
        fontSize='md'
        leftIcon={<ArrowLeft />}
        _hover={{ bg: 'transparent' }}
      >
        나가기
      </Button>
      <Button variant='solid' colorScheme='blue' py={4} fontSize='md' onClick={onClick}>
        {buttonText}
      </Button>
    </Flex>
  );
};
