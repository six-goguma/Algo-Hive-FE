import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, Flex, HStack, Text, VStack, Textarea, Button } from '@chakra-ui/react';

import { useCustomToast } from '@shared/hooks';

import {
  deletePostsComments,
  editPostsComments,
  getPostsComments,
  ResponsePostComments,
  PostCommentsContent,
} from '../../apis';

type CommentListProps = {
  comment: PostCommentsContent;
  isLast?: boolean;
  setComments: React.Dispatch<React.SetStateAction<ResponsePostComments | null>>;
};

export const CommentList = ({ comment, isLast, setComments }: CommentListProps) => {
  const { postId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.contents);
  const customToast = useCustomToast();

  const DeleteComment = async () => {
    if (!postId) return;

    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      await deletePostsComments({ commentId: comment.id });

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
        toastDescription: '댓글을 삭제하는 중 오류가 발생했습니다.',
      });
    }
  };

  const EditComment = async () => {
    if (!postId || !editContent.trim()) return;

    try {
      await editPostsComments({ commentId: comment.id, contents: editContent });

      const updatedComments = await getPostsComments({
        postId: Number(postId),
        page: 0,
        size: 10,
        sort: { key: 'createdAt', order: 'desc' },
      });
      setComments(updatedComments);
      setIsEditing(false);
    } catch {
      customToast({
        toastStatus: 'error',
        toastTitle: '게시글 상세 페이지',
        toastDescription: '댓글을 수정하는 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <Flex w='full' py={3} borderBottom={isLast ? 'none' : '1px solid'} borderColor='customGray.300'>
      <VStack w='full' align='start' textAlign='start'>
        <HStack w='full' justify='space-between'>
          <HStack spacing={4}>
            <Avatar size='md' />
            <Flex w='full' flexDir='column' align='flex-start'>
              <Text as='b'>{comment.author}</Text>
              <Text fontSize='sm' color='customGray.400'>
                {new Date(comment.createdAt).toLocaleDateString()}
              </Text>
            </Flex>
          </HStack>
          <HStack spacing={2}>
            <Text as='button' fontWeight='700' color='blue.500' onClick={() => setIsEditing(true)}>
              수정
            </Text>
            <Text as='button' fontWeight='700' color='red.500' onClick={DeleteComment}>
              삭제
            </Text>
          </HStack>
        </HStack>
        {isEditing ? (
          <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
        ) : (
          <Text>{comment.contents}</Text>
        )}
        {isEditing && <Button onClick={EditComment}>수정 완료</Button>}
      </VStack>
    </Flex>
  );
};
