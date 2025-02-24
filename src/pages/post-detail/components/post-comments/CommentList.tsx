import { useState } from 'react';

import { Avatar, Flex, HStack, Text, VStack, Textarea, Button } from '@chakra-ui/react';

import { useCustomToast } from '@shared/hooks';

import { deletePostsComments, editPostsComments } from '../../apis';
import { PostCommentsContent } from '../../apis';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type CommentListProps = {
  comment: PostCommentsContent;
  isLast?: boolean;
  onDelete: () => void;
  currentUser: string | null;
};

export const CommentList = ({ comment, isLast, onDelete, currentUser }: CommentListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.contents);
  const customToast = useCustomToast();
  const isAuthor = currentUser === comment.author;
  const queryClient = useQueryClient();

  const { mutate: deleteComment } = useMutation({
    mutationFn: () => deletePostsComments({ commentId: comment.id }),
    onSuccess: () => {
      customToast({
        toastStatus: 'success',
        toastTitle: '댓글 삭제',
        toastDescription: '댓글이 삭제되었습니다.',
      });
      onDelete();
    },
    onError: () => {
      customToast({
        toastStatus: 'error',
        toastTitle: '댓글 삭제 오류',
        toastDescription: '댓글 삭제 중 오류가 발생했습니다.',
      });
    },
  });

  const { mutate: editComment } = useMutation({
    mutationFn: () => editPostsComments({ commentId: comment.id, contents: editContent }),
    onSuccess: () => {
      customToast({
        toastStatus: 'success',
        toastTitle: '댓글 수정',
        toastDescription: '댓글이 수정되었습니다.',
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ['postComments'] });
    },
    onError: () => {
      customToast({
        toastStatus: 'error',
        toastTitle: '댓글 수정 오류',
        toastDescription: '댓글 수정 중 오류가 발생했습니다.',
      });
    },
  });

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
          {isAuthor && (
            <HStack spacing={2}>
              <Text
                as='button'
                fontWeight='700'
                color='blue.500'
                onClick={() => setIsEditing(true)}
              >
                수정
              </Text>
              <Text as='button' fontWeight='700' color='red.500' onClick={() => deleteComment()}>
                삭제
              </Text>
            </HStack>
          )}
        </HStack>
        {isEditing ? (
          <Textarea
            resize='none'
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <Text>{comment.contents}</Text>
        )}
        {isEditing && (
          <Flex w='full' justify='flex-end'>
            <Button onClick={() => editComment()}>수정 완료</Button>
          </Flex>
        )}
      </VStack>
    </Flex>
  );
};
