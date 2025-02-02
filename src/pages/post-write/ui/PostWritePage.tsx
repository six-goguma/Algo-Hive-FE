import { Button, useDisclosure, Box, Flex, VStack, Divider } from '@chakra-ui/react';

import { ArrowLeft } from 'lucide-react';

import { PostTitle, PostTag, PostContent } from '@shared/components';

import { PostModal } from '@widgets/modals';

export const PostWritePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex w='full' justifyContent='center'>
      <VStack w='full' py='40px' gap='0'>
        <PostTitle />
        <Box w='full' h='14px' bg='white'>
          <Divider w='115px' h='8px' bg='black' ml='50px' />
        </Box>
        <PostTag />
        <PostContent />
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
          <Button variant='solid' colorScheme='blue' py={4} fontSize='md' onClick={onOpen}>
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
