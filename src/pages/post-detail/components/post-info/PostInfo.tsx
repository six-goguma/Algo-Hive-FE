import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Flex, HStack, Tag, Text, VStack } from '@chakra-ui/react';

import { HeartIcon } from 'lucide-react';

import { ResponsePostDetail, ResponsePostTags, deletePost } from '@pages/post-detail/apis';

import { TAG_DATA } from '@shared/components/post-form/post-tag/data';
import { RouterPath } from '@shared/constants';
import { useCustomToast } from '@shared/hooks';
import { authStorage, getDynamicPath } from '@shared/utils';

import { useLikeStatus } from '../../hooks';

type PostInfoProps = {
  post: ResponsePostDetail;
  tags: ResponsePostTags | null;
};

export const PostInfo = ({ post, tags }: PostInfoProps) => {
  const nickName = authStorage.nickName.get();
  const isLogin = !!nickName;
  const isAuthor = nickName === post.author;
  const { isLiked, toggleLike, isPending } = useLikeStatus(post.id, isLogin);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const customToast = useCustomToast();

  const onDelete = async () => {
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;

    try {
      setIsDeleting(true);
      await deletePost({ postId: post.id });
      customToast({
        toastStatus: 'success',
        toastTitle: '게시글 상세 페이지',
        toastDescription: '게시글을 성공적으로 삭제했습니다.',
      });
      navigate(RouterPath.MAIN);
    } catch (error) {
      console.error('게시글 삭제 실패:', error);
      customToast({
        toastStatus: 'error',
        toastTitle: '게시글 상세 페이지',
        toastDescription: '게시글 삭제 과정에서 오류가 발생했습니다.',
      });
    } finally {
      setIsDeleting(false);
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
                <Button variant='ghost' colorScheme='blue' size='sm'>
                  수정
                </Button>
              </Link>
              <Button
                variant='ghost'
                colorScheme='red'
                size='sm'
                onClick={onDelete}
                isDisabled={isDeleting}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </Button>
            </HStack>
          )}
        </Flex>

        <HStack spacing={5} w='full' justify='space-between'>
          <HStack spacing={2}>
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
          </HStack>

          {nickName && (
            <Button
              variant='outline'
              px={3}
              bg='none'
              color={isLiked ? '#FF0000' : 'customGray.400'}
              border='1.5px solid'
              borderRadius='xl'
              borderColor={isLiked ? '#FF0000' : 'customGray.400'}
              _hover={{}}
              onClick={() => toggleLike()}
              isDisabled={isPending}
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
