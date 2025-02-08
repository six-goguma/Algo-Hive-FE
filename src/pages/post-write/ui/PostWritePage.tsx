import { useForm } from 'react-hook-form';

import { useDisclosure, VStack } from '@chakra-ui/react';

import { Form, PostTitle, PostTag, PostContent, PostButtons } from '@shared/components';

import { PostModal } from '@widgets/modals';

type PostFormData = {
  title: string;
  tag: string;
  content: string;
};

export const PostWritePage = () => {
  const methods = useForm<PostFormData>({
    defaultValues: {
      title: '',
      tag: '',
      content: '',
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = (data: PostFormData) => {
    console.log('폼 데이터 제출:', data);
    onOpen(); // 모달 열기
  };

  return (
    <Form {...methods}>
      <VStack w='full' py='20px' gap='0' as='form' onSubmit={methods.handleSubmit(onSubmit)}>
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
    </Form>
  );
};
