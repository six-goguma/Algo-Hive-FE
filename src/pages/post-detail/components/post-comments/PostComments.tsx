import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Flex, Text, Textarea, VStack, Spinner, HStack } from '@chakra-ui/react';

import { useCustomToast } from '@shared/hooks';
import { authStorage } from '@shared/utils';

import { usePostComments, useSubmitComment } from '../../hooks/usePostComments';
import { CommentList } from './CommentList';

export const PostComments = () => {
  const { postId } = useParams();
  const [commentContent, setCommentContent] = useState('');
  const [page, setPage] = useState(0);
  const customToast = useCustomToast();

  const nickName = authStorage.nickName.get();
  const isLogin = !!nickName;

  const {
    data: comments,
    isLoading,
    refetch,
  } = usePostComments(postId ? Number(postId) : undefined, page);
  const { mutate: submitComment, isPending } = useSubmitComment(Number(postId));

  const onSubmit = async () => {
    if (!postId || !commentContent.trim()) return;

    submitComment(commentContent, {
      onSuccess: () => {
        setCommentContent('');
        refetch();
      },
      onError: () => {
        customToast({
          toastStatus: 'error',
          toastTitle: '게시글 상세 페이지',
          toastDescription: '로그인이 되어 있는지 확인해주세요.',
        });
      },
    });
  };

  const deleteComment = async () => {
    refetch();
  };

  if (isLoading) {
    return (
      <Flex justify='center' align='center' w='full' h='200px'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <VStack w='full' mb={20}>
      <Flex w='full'>
        <Text as='b'>{comments?.totalElements || 0}개의 댓글</Text>
      </Flex>

      <Flex w='full'>
        <Textarea
          bg='white'
          w='full'
          h='100px'
          size='sm'
          placeholder={isLogin ? '댓글을 입력해주세요.' : '로그인하여 댓글을 입력해보세요'}
          resize='none'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          isDisabled={!isLogin || isPending}
        />
      </Flex>
      <Flex w='full' justify='right'>
        <Button borderRadius='3px' onClick={onSubmit} isDisabled={!isLogin || isPending}>
          {isPending ? '등록 중...' : '댓글 작성'}
        </Button>
      </Flex>

      <Flex w='full' flexDir='column' mt={5} gap={5}>
        {comments?.content?.length ? (
          comments.content.map((comment, index) => (
            <CommentList
              key={comment.id}
              comment={comment}
              isLast={index === comments.content.length - 1}
              onDelete={deleteComment}
              currentUser={nickName}
            />
          ))
        ) : (
          <Text color='gray.500'>댓글이 없습니다.</Text>
        )}
      </Flex>

      <HStack spacing={3} mt={5}>
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} isDisabled={page === 0}>
          이전
        </Button>
        <Text>{page + 1}</Text>
        <Button onClick={() => setPage((prev) => prev + 1)} isDisabled={comments?.last}>
          다음
        </Button>
      </HStack>
    </VStack>
  );
};
