import { useForm, FieldErrors } from 'react-hook-form';

import { useDisclosure, VStack } from '@chakra-ui/react';

import { Form, PostTitle, PostTag, PostContent, PostButtons } from '@shared/components';
import { useCustomToast } from '@shared/hooks';

import { PostModal } from '@widgets/modals';

import { createPost, savePostTags } from '../apis';

type PostFormData = {
  title: string;
  tag: number | null;
  content: string;
};

export const PostWritePage = () => {
  const methods = useForm<PostFormData>({
    defaultValues: {
      title: '',
      tag: null,
      content: '',
    },
  });

  const customToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = () => {
    onOpen();
  };

  const onConfirmButton = async () => {
    try {
      const data = methods.getValues();
      console.log('게시글 데이터 제출:', data);

      const createdPost = await createPost({
        title: data.title,
        contents: data.content,
        thumbnail: '',
        summary: '',
      });

      console.log('게시글 생성 성공:', createdPost);

      if (createdPost?.id) {
        await savePostTags(createdPost.id, data.tag);
        console.log('태그 저장 성공');
      }

      customToast({
        toastStatus: 'success',
        toastTitle: '게시글 출간 완료',
        toastDescription: '게시글이 성공적으로 출간되었습니다!',
      });

      onClose();
    } catch (error) {
      console.error('게시글 출간 실패:', error);
      customToast({
        toastStatus: 'error',
        toastTitle: '출간 실패',
        toastDescription: '게시글 출간 중 오류가 발생했습니다.',
      });
    }
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
          postContent={methods.watch('content')}
          postSummary=''
          onConfirmButton={onConfirmButton}
        />
      </VStack>
    </Form>
  );
};
