import { Button, useDisclosure, Box, Flex, VStack } from '@chakra-ui/react';

import { ArrowLeft } from 'lucide-react';

import { PostTitle } from '@shared/components/post-form';
import { PostTag } from '@shared/components/post-form';
import { PostContent } from '@shared/components/post-form';
import { useGetMockData } from '@shared/hooks';

import { PostModal } from '@widgets/modals';
import { LoadingView } from '@widgets/view';

import { POST_DETAIL_DUMMY_DATA } from '../data';

export const PostEditPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isPending, isError } = useGetMockData(POST_DETAIL_DUMMY_DATA);

  //TODO: 게시글 수정하기 버튼 클릭 시 Modal 열기
  const onClick = () => {
    onOpen();
  };

  //TODO: 게시글 data 불러오는 중에 에러 발생 시 custom Toast 메시지 띄우기
  if (isError) return <div>오류가 발생했습니다.</div>;

  //TODO: 게시글 data 불러올 떄 Skeleton으로 변경
  if (isPending) return <LoadingView />;

  return (
    <>
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
    </>
  );
};
