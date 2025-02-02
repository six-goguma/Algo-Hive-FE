import { useDisclosure, VStack } from '@chakra-ui/react';

import { PostTitle, PostTag, PostContent, PostButtons } from '@shared/components';
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
    <VStack w='full' py='20px' gap='0'>
      <PostTitle />
      <PostTag />
      <PostContent />
      <PostButtons buttonText='수정하기' onClick={onOpen} />
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
  );
};
