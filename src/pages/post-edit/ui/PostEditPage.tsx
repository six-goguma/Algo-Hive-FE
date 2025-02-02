import { Button, useDisclosure, Box, Flex, VStack, Divider } from '@chakra-ui/react';

import { ArrowLeft } from 'lucide-react';

import { PostTitle, PostTag, PostContent } from '@shared/components';
import { useGetMockData } from '@shared/hooks';

import { PostModal } from '@widgets/modals';
import { LoadingView } from '@widgets/view';

import { POST_DETAIL_DUMMY_DATA } from '../data';

export const PostEditPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isPending, isError } = useGetMockData(POST_DETAIL_DUMMY_DATA);

  if (isError) return <div>오류가 발생했습니다.</div>;

  if (isPending) return <LoadingView />;

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
            수정하기
          </Button>
        </Flex>
        <PostModal
          title={data.title}
          isOpen={isOpen}
          onClose={onClose}
          buttonTitle='수정하기'
          postType='edit'
          imageUrl={data.thumbnail}
          postContent={data.content}
        />
      </VStack>
    </Flex>
  );
};
