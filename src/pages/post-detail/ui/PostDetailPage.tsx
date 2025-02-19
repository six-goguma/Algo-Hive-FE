import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import {
  getPostDetail,
  ResponsePostDetail,
  getPostTags,
  ResponsePostTags,
} from '@pages/post-detail/apis';

import { Container } from '@widgets/container';

import { PostComments, PostContents, PostInfo } from '../components';

export const PostDetailPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<ResponsePostDetail | null>(null);
  const [tags, setTags] = useState<ResponsePostTags | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setLoading(true);
        const postDetail = await getPostDetail({ postId: Number(postId) });
        const postTags = await getPostTags({ postId: Number(postId) });

        setPost(postDetail);
        setTags(postTags);
      } catch (error) {
        console.error('게시글 정보를 불러오는 데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  if (loading) {
    return (
      <Flex justify='center' align='center' w='full' h='200px'>
        Loading...
      </Flex>
    );
  }

  if (!post) {
    return (
      <Flex justify='center' align='center' w='full' h='200px'>
        게시글을 불러올 수 없습니다.
      </Flex>
    );
  }

  return (
    <Flex w='full'>
      <Container maxWidth='100vw' flexDirection='column' alignItems='center'>
        <PostInfo post={post} tags={tags} />
        <PostContents post={post} />
        <PostComments />
      </Container>
    </Flex>
  );
};
