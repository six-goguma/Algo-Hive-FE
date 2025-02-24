import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Flex, Text, Textarea, VStack, Spinner, HStack } from '@chakra-ui/react';

import { useCustomToast } from '@shared/hooks';

import { getPostsComments, savePostsComments, ResponsePostComments } from '../../apis';
import { CommentList } from './CommentList';

export const PostComments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<ResponsePostComments | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState('');
  const [page, setPage] = useState(0);
  const size = 10;
  const customToast = useCustomToast();

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await getPostsComments({
          postId: Number(postId),
          page,
          size,
          sort: { key: 'createdAt', order: 'desc' },
        });
        console.log('API 응답:', response);
      } catch {
        customToast({
          toastStatus: 'error',
          toastTitle: '게시글 상세 페이지',
          toastDescription: '댓글을 불러오는 중 오류가 발생했습니다.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId, page]);

  const SubmitComment = async () => {
    if (!postId || !commentContent.trim()) return;

    try {
      await savePostsComments({
        postId: Number(postId),
        contents: commentContent,
      });
      setCommentContent('');

      const updatedComments = await getPostsComments({
        postId: Number(postId),
        page: 0,
        size: 10,
        sort: { key: 'createdAt', order: 'desc' },
      });

      setComments(updatedComments);
    } catch {
      customToast({
        toastStatus: 'error',
        toastTitle: '게시글 상세 페이지',
        toastDescription: '댓글을 작성하는 중 오류가 발생했습니다.',
      });
    }
  };

  if (loading) {
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
          placeholder='댓글을 입력해주세요.'
          resize='none'
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </Flex>
      <Flex w='full' justify='right'>
        <Button borderRadius='3px' onClick={SubmitComment}>
          댓글 작성
        </Button>
      </Flex>
      <Flex w='full' flexDir='column' mt={20} gap={5}>
        {comments?.content?.length ? (
          comments.content.map((comment, index) => (
            <CommentList
              key={comment.id}
              comment={{
                ...comment,
                contents: comment.contents,
              }}
              isLast={index === comments.content.length - 1}
              setComments={setComments}
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
