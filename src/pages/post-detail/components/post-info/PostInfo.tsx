import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button, Flex, HStack, Tag, Text, VStack, Spinner } from '@chakra-ui/react';

import { HeartIcon } from 'lucide-react';

import {
  getPostDetail,
  getPostTags,
  getLikeStatus,
  putLikeStatus,
  ResponsePostDetail,
  ResponsePostTags,
} from '@pages/post-detail/apis';

import { TAG_DATA } from '@shared/components/post-form/post-tag/data';
import { authStorage, getDynamicPath } from '@shared/utils';

export const PostInfo = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<ResponsePostDetail | null>(null);
  const [tags, setTags] = useState<ResponsePostTags | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthor, setIsAuthor] = useState(false);

  const nickName = authStorage.nickName.get();
  const isLogin = authStorage.isLogin.get();

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setLoading(true);
        const postDetail = await getPostDetail({ postId: Number(postId) });
        const postTags = await getPostTags({ postId: Number(postId) });

        setPost(postDetail);
        setTags(postTags);

        if (isLogin) {
          const likedStatus = await getLikeStatus({ postId: Number(postId) });
          setIsLiked(likedStatus);
        }
      } catch (error) {
        console.error('게시글 정보를 불러오는 데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId, isLogin]);

  useEffect(() => {
    if (!post) return;
    setIsAuthor(nickName === post.author);
  }, [post, nickName]);

  const handleLikeClick = async () => {
    setIsLiked((prev) => !prev);
    try {
      const newLikeStatus = await putLikeStatus({ postId: Number(postId) });
      setIsLiked(newLikeStatus);
    } catch (error) {
      console.error('좋아요 상태 변경에 실패했습니다.', error);
      setIsLiked((prev) => !prev);
    }
  };

  if (loading || !post) {
    return (
      <Flex justify='center' align='center' w='full' h='200px'>
        {loading ? (
          <Spinner size='xl' />
        ) : (
          <Text fontSize='lg' color='gray.500'>
            게시글을 불러올 수 없습니다.
          </Text>
        )}
      </Flex>
    );
  }

  const canEdit = isLogin && isAuthor;
  const canLike = isLogin;

  return (
    <Flex w='full' mt={10}>
      <VStack w='full' spacing={5}>
        <Flex w='full'>
          <Text as='h1' fontWeight='900' fontSize='36px' textAlign='left'>
            {post.title}
          </Text>
        </Flex>
        <Flex w='full' justify='space-between'>
          <HStack spacing={2}>
            <Text as='b'>{post.author}</Text>
            <Text>·</Text>
            <Text>{new Date(post.createdAt).toLocaleDateString()}</Text>
          </HStack>
          {canEdit && (
            <HStack spacing={3} mr={2}>
              <Link to={getDynamicPath.postEdit(String(postId))}>
                <Text as='button' fontWeight='700'>
                  수정
                </Text>
              </Link>
              <Text as='button' fontWeight='700'>
                삭제
              </Text>
            </HStack>
          )}
        </Flex>
        <HStack spacing={5} w='full' justify='space-between'>
          {tags?.tagIds.map((tagId) => (
            <Tag
              key={tagId}
              bg='none'
              color={TAG_DATA[tagId - 1]?.color || 'gray'}
              borderRadius='20px'
              px={3}
              border='1.5px solid'
              borderColor={TAG_DATA[tagId - 1]?.color || 'gray'}
            >
              <Text as='b'>{TAG_DATA[tagId - 1]?.label || `태그 ${tagId}`}</Text>
            </Tag>
          ))}
          {canLike && (
            <Button
              variant='outline'
              px={3}
              bg='none'
              color={isLiked ? '#FF0000' : 'customGray.400'}
              border='1.5px solid'
              borderRadius='xl'
              borderColor={isLiked ? '#FF0000' : 'customGray.400'}
              _hover={{}}
              onClick={handleLikeClick}
            >
              <HStack spacing={1}>
                <HeartIcon size={20} fill={isLiked ? '#FF0000' : '#8B939B'} />
                <Text as='b' fontSize='sm' ml={1}>
                  좋아요
                </Text>
              </HStack>
            </Button>
          )}
        </HStack>
      </VStack>
    </Flex>
  );
};
