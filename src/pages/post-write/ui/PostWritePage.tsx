import { useForm, FieldErrors } from 'react-hook-form';

import { useDisclosure, VStack } from '@chakra-ui/react';

import { Form, PostTitle, PostTag, PostContent, PostButtons } from '@shared/components';
import { useCustomToast } from '@shared/hooks';

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

  const customToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = (data: PostFormData) => {
    console.log('폼 데이터 제출:', data);
    onOpen();
  };

  const onInvalid = (errors: FieldErrors<PostFormData>) => {
    if (errors.title) {
      customToast({
        toastStatus: 'error',
        toastTitle: '제목 입력 필요',
        toastDescription: '제목을 입력해주세요!',
      });
    } else if (errors.tag) {
      customToast({
        toastStatus: 'error',
        toastTitle: '태그 선택 필요',
        toastDescription: '태그를 선택해주세요!',
      });
    } else if (errors.content) {
      customToast({
        toastStatus: 'error',
        toastTitle: '내용 입력 필요',
        toastDescription: '내용을 입력해주세요!',
      });
    }
  };

  return (
    <Form {...methods}>
      <VStack w='full' py='20px' gap='0' as='form'>
        <PostTitle />
        <PostTag />
        <PostContent />
        <PostButtons buttonText='작성완료' onClick={methods.handleSubmit(onSubmit, onInvalid)} />
        <PostModal
          title={methods.watch('title')}
          isOpen={isOpen}
          onClose={onClose}
          buttonTitle='출간하기'
          postType='create'
        />
      </VStack>
    </Form>
  );
};
