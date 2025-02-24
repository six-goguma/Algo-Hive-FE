import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, useDisclosure, VStack } from '@chakra-ui/react';

import { getPostDetail, getPostTags } from '@pages/post-detail/apis';

import { PostTitle, PostTag, PostContent, PostButtons, Form } from '@shared/components';
import { RouterPath } from '@shared/constants';
import { useCustomToast } from '@shared/hooks';
import { PostFormData } from '@shared/types';

import { PostModal } from '@widgets/modals';

import { updatePost, updatePostTags } from '../apis';
import { SkeletonPostEditPage } from './SkeletonPostEditPage';
import { useQuery } from '@tanstack/react-query';

export const PostEditPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { postId } = useParams<{ postId: string }>();
  const customToast = useCustomToast();
  const [hasErrorToastShown, setHasErrorToastShown] = useState(false);
  const navigate = useNavigate();

  const {
    data: postDetail,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetail({ postId: Number(postId) }),
  });

  const {
    data: postTag,
    isLoading: isTagsLoading,
    isError: isTagsError,
  } = useQuery({
    queryKey: ['postTag', postId],
    queryFn: () => getPostTags({ postId: Number(postId) }),
  });

  useEffect(() => {
    if ((isPostError || isTagsError) && !hasErrorToastShown) {
      customToast({
        toastStatus: 'error',
        toastTitle: '데이터 불러오기 실패',
        toastDescription: '게시글 또는 태그 정보를 가져오는 중 오류가 발생했습니다.',
      });
      setHasErrorToastShown(true);
    }
  }, [isPostError, isTagsError, customToast, hasErrorToastShown]);

  const form = useForm<PostFormData>({
    defaultValues: {
      title: '',
      tag: [],
      content: '',
      thumbnail: '',
      summary: '',
    },
  });

  useEffect(() => {
    if (postDetail && postTag) {
      form.reset({
        title: postDetail.title,
        tag: postTag.tagIds,
        content: postDetail.contents,
        thumbnail: postDetail.thumbnail,
        summary: postDetail.summary,
      });
    }
  }, [postDetail, postTag, form]);

  const onSubmit = () => {
    onOpen();
  };

  const onUpdatePostButton = async (modalData: { thumbnail: string; summary: string }) => {
    try {
      const data = form.getValues();
      await updatePost(Number(postId), {
        title: data.title,
        contents: data.content,
        thumbnail: modalData.thumbnail,
        summary: modalData.summary,
      });
      if (data.tag !== null && data.tag !== undefined) {
        await updatePostTags(Number(postId), data.tag);
      }
      customToast({
        toastStatus: 'success',
        toastTitle: '게시글 수정 완료',
        toastDescription: '게시글이 성공적으로 수정되었습니다!',
      });
      navigate(RouterPath.MAIN);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      customToast({
        toastStatus: 'error',
        toastTitle: '수정 실패',
        toastDescription: '게시글 수정 중 오류가 발생했습니다.',
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

  if (isPostLoading || isTagsLoading) return <SkeletonPostEditPage />;
  if (!postDetail || !postTag) return <Box>데이터를 불러올 수 없습니다.</Box>;

  return (
    <Form {...form}>
      <VStack w='full' py='20px' gap='0'>
        <PostTitle />
        <PostTag />
        <PostContent contents={postDetail.contents} />
        <PostButtons buttonText='수정하기' onClick={form.handleSubmit(onSubmit, onInvalid)} />
        <PostModal
          title={form.watch('title')}
          isOpen={isOpen}
          onClose={onClose}
          buttonTitle='수정하기'
          postType='edit'
          postContent={form.watch('content')}
          imageUrl={form.watch('thumbnail')}
          postSummary={form.watch('summary')}
          onConfirmButton={onUpdatePostButton}
        />
      </VStack>
    </Form>
  );
};
