import { useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Box, useDisclosure, VStack } from '@chakra-ui/react';

import { getPostDetail, getPostTags } from '@pages/post-detail/apis';

import { PostTitle, PostTag, PostContent, PostButtons, Form } from '@shared/components';
import { useCustomToast } from '@shared/hooks';
import { PostFormData } from '@shared/types';

import { PostModal } from '@widgets/modals';
import { LoadingView } from '@widgets/view';

import { updatePost, updatePostTags } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const PostEditPage = () => {
  const methods = useForm<PostFormData>({
    defaultValues: {
      title: '',
      tag: null,
      content: '',
      thumbnail: '',
      summary: '',
    },
  });
  const { setValue } = methods;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { postId } = useParams<{ postId: string }>();
  const customToast = useCustomToast();
  const [hasErrorToastShown, setHasErrorToastShown] = useState(false);

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

  useEffect(() => {
    if (postDetail) {
      setValue('title', postDetail.title);
      setValue('content', postDetail.contents);
      setValue('thumbnail', postDetail.thumbnail);
      setValue('summary', postDetail.summary);
    }

    if (postTag) {
      setValue('tag', postTag.tagIds);
    }
  }, [postDetail, postTag, setValue]);

  const onSubmit = () => {
    onOpen();
  };

  const onUpdatePostButton = async (modalData: { thumbnail: string; summary: string }) => {
    try {
      const data = methods.getValues();
      console.log('게시글 데이터 제출:', data);

      const updatedPost = await updatePost(Number(postId), {
        title: data.title,
        contents: data.content,
        thumbnail: modalData.thumbnail,
        summary: modalData.summary,
      });

      console.log('게시글 수정 성공:', updatedPost);

      if (data.tag !== null && data.tag !== undefined) {
        await updatePostTags(Number(postId), data.tag);
      }

      customToast({
        toastStatus: 'success',
        toastTitle: '게시글 수정 완료',
        toastDescription: '게시글이 성공적으로 수정되었습니다!',
      });

      onClose();
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

  if (isPostLoading || isTagsLoading) return <LoadingView />;
  if (!postDetail || !postTag) return <Box>데이터를 불러올 수 없습니다.</Box>;

  return (
    <Form {...methods}>
      <VStack w='full' py='20px' gap='0'>
        <PostTitle />
        <PostTag />
        <PostContent />
        <PostButtons buttonText='수정하기' onClick={methods.handleSubmit(onSubmit, onInvalid)} />
        <PostModal
          title={methods.watch('title')}
          isOpen={isOpen}
          onClose={onClose}
          buttonTitle='수정하기'
          postType='edit'
          postContent={methods.watch('content')}
          imageUrl={methods.watch('thumbnail')}
          postSummary={methods.watch('summary')}
          onConfirmButton={onUpdatePostButton}
        />
      </VStack>
    </Form>
  );
};
