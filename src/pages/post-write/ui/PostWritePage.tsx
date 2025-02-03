import { useDisclosure, VStack } from '@chakra-ui/react';

import { PostTitle, PostTag, PostContent, PostButtons } from '@shared/components';

import { PostModal } from '@widgets/modals';

export const PostWritePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack w='full' py='20px' gap='0'>
      <PostTitle />
      <PostTag />
      <PostContent />
      <PostButtons buttonText='작성완료' onClick={onOpen} />
      <PostModal
        title='백준 1004번 풀이'
        isOpen={isOpen}
        onClose={onClose}
        buttonTitle='출간하기'
        postType='create'
      />
    </VStack>
  );
};
