import { useParams } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { Container } from '@widgets/container';

import { PostComments, PostContents, PostInfo } from '../components';
import { usePostDetail } from '../hooks';

export const PostDetailPage = () => {
  const { postId } = useParams();
  const { data, isLoading, error } = usePostDetail(postId ? Number(postId) : undefined);

  if (isLoading)
    return (
      <Flex justify='center' align='center' w='full' h='200px'>
        Loading...
      </Flex>
    );
  if (error || !data?.post)
    return (
      <Flex justify='center' align='center' w='full' h='200px'>
        게시글을 불러올 수 없습니다.
      </Flex>
    );

  return (
    <Flex w='full'>
      <Container maxWidth='100vw' flexDirection='column' alignItems='center'>
        <PostInfo post={data.post} tags={data.tags} />
        <PostContents post={data.post} />
        <PostComments />
      </Container>
    </Flex>
  );
};
