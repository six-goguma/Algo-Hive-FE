import { Button, useDisclosure, Box, Flex, VStack } from '@chakra-ui/react';

import { ArrowLeft } from 'lucide-react';

import { PostTitle, PostTag, PostContent } from '@shared/components';

import { PostModal } from '@widgets/modals';

export const PostWritePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick = () => {
    onOpen();
  };

  return (
    <Flex w='full' justifyContent='center'>
      <VStack w='full' py={10} spacing='0'>
        <PostTitle />
        <Box w='full' h='8px' bg='white'>
          <Box w='115px' h='8px' bg='#495057' ml='50px' />
        </Box>
        <PostTag />
        <PostContent />
        <Flex
          w='full'
          h='50px'
          px='50px'
          mt={1}
          background='white'
          alignItems='center'
          justifyContent='space-between'
        >
          <Button
            variant='ghost'
            colorScheme='gray'
            fontSize='md'
            fontWeight='normal'
            leftIcon={<ArrowLeft />}
            _hover={{ bg: 'transparent' }}
          >
            나가기
          </Button>
          <Button colorScheme='blue' onClick={onClick} fontWeight='medium'>
            작성완료
          </Button>
        </Flex>
        <PostModal
          title='백준 1004번 풀이'
          isOpen={isOpen}
          onClose={onClose}
          buttonTitle='출간하기'
          postType='create'
        />
      </VStack>
    </Flex>
  );
};
