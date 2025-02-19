import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Flex, HStack, Tag, Text, VStack } from '@chakra-ui/react';

import { HeartIcon } from 'lucide-react';

import {
  putLikeStatus,
  getLikeStatus,
  ResponsePostDetail,
  ResponsePostTags,
} from '@pages/post-detail/apis';

import { TAG_DATA } from '@shared/components/post-form/post-tag/data';
import { authStorage, getDynamicPath } from '@shared/utils';

type PostInfoProps = {
  post: ResponsePostDetail;
  tags: ResponsePostTags | null;
};

export const PostInfo = ({ post, tags }: PostInfoProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const nickName = authStorage.nickName.get();
  const isLogin = authStorage.isLogin.get();

  useEffect(() => {
    setIsAuthor(nickName === post.author);

    if (isLogin) {
      getLikeStatus({ postId: post.id })
        .then(setIsLiked)
        .catch(() => setIsLiked(false));
    }
  }, [post, isLogin, nickName]);

  const handleLikeClick = async () => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }

    setIsLiked((prev) => !prev);
    try {
      const newLikeStatus = await putLikeStatus({ postId: post.id });
      setIsLiked(newLikeStatus);
    } catch (error) {
      console.error('좋아요 상태 변경에 실패했습니다.', error);
      setIsLiked((prev) => !prev);
    }
  };

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
          {isAuthor && (
            <HStack spacing={3} mr={2}>
              <Link to={getDynamicPath.postEdit(String(post.id))}>
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
          {isLogin && (
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
