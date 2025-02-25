import { useEffect, useState } from 'react';
import { useForm, FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useDisclosure, VStack } from '@chakra-ui/react';

import { Form, PostTitle, PostTag, PostContent, PostButtons } from '@shared/components';
import { RouterPath } from '@shared/constants';
import { useCustomToast } from '@shared/hooks';
import { PostFormData } from '@shared/types';

import { PostModal } from '@widgets/modals';

import { createPost, savePostTags, getStorageId } from '../apis';

export const PostWritePage = () => {
  const methods = useForm<PostFormData>({
    defaultValues: {
      title: '',
      tag: [],
      content: '',
      thumbnail: '',
      summary: '',
    },
  });
  const navigate = useNavigate();
  const customToast = useCustomToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [storageId, setStorageId] = useState<string | '임시'>('임시');

  useEffect(() => {
    const fetchStorageId = async () => {
      try {
        const id = await getStorageId();
        setStorageId(id);
      } catch (error) {
        console.error('storageId 불러오기 실패:', error);
      }
    };
    fetchStorageId();
  }, []);

  const onSubmit = () => {
    onOpen();
  };

  const onCreatePostButton = async (modalData: { thumbnail: string; summary: string }) => {
    try {
      const data = methods.getValues();
      const createdPost = await createPost({
        title: data.title,
        contents: data.content,
        thumbnail: modalData.thumbnail,
        summary: modalData.summary,
        storageId,
      });
      if (createdPost?.id) {
        await savePostTags(createdPost.id, data.tag);
      }
      customToast({
        toastStatus: 'success',
        toastTitle: '게시글 출간 완료',
        toastDescription: '게시글이 성공적으로 출간되었습니다!',
      });
      navigate(RouterPath.MAIN);
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
        toastTitle: '게시물 작성',
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
        <PostContent storageId={storageId} />
        <PostButtons buttonText='작성완료' onClick={methods.handleSubmit(onSubmit, onInvalid)} />
        <PostModal
          title={methods.watch('title')}
          isOpen={isOpen}
          onClose={onClose}
          buttonTitle='출간하기'
          postType='create'
          postContent={methods.watch('content')}
          imageUrl={methods.watch('thumbnail')}
          postSummary={methods.watch('summary')}
          onConfirmButton={onCreatePostButton}
          storageId={storageId}
        />
      </VStack>
    </Form>
  );
};
