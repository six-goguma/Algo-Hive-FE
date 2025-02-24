import { useState } from 'react';

import { Avatar, Flex, HStack, Text, VStack, Textarea, Button } from '@chakra-ui/react';

import { useCustomToast } from '@shared/hooks';

import { deletePostsComments, editPostsComments } from '../../apis';
import { PostCommentsContent } from '../../apis';
import { useMutation } from '@tanstack/react-query';

type CommentListProps = {
  comment: PostCommentsContent;
  isLast?: boolean;
  onRefetch: () => void;
  currentUser: string | null;
};

export const CommentList = ({ comment, isLast, onRefetch, currentUser }: CommentListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.contents);
  const customToast = useCustomToast();
  const isAuthor = currentUser === comment.author;

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: () => deletePostsComments({ commentId: comment.id }),
    onSuccess: () => {
      customToast({
        toastStatus: 'success',
        toastTitle: '댓글 삭제',
        toastDescription: '댓글이 삭제되었습니다.',
      });
      onRefetch();
    },
    onError: () => {
      customToast({
        toastStatus: 'error',
        toastTitle: '댓글 삭제 오류',
        toastDescription: '댓글 삭제 중 오류가 발생했습니다.',
      });
    },
  });

  const { mutate: editComment, isPending: isEditingPending } = useMutation({
    mutationFn: () => editPostsComments({ commentId: comment.id, contents: editContent }),
    onSuccess: () => {
      customToast({
        toastStatus: 'success',
        toastTitle: '댓글 수정',
        toastDescription: '댓글이 수정되었습니다.',
      });
      setIsEditing(false);
      onRefetch();
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
                style={{
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                  opacity: isDeleting ? 0.5 : 1,
                }}
              >
                수정
              </Text>
              <Text
                as='button'
                fontWeight='700'
                color='red.500'
                onClick={() => deleteComment()}
                style={{
                  cursor: isDeleting ? 'not-allowed' : 'pointer',
                  opacity: isDeleting ? 0.5 : 1,
                }}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </Text>
            </HStack>
          )}
        </HStack>

        {isEditing ? (
          <>
            <Textarea
              resize='none'
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              isDisabled={isEditingPending}
            />
            <Flex w='full' justify='flex-end'>
              <Button
                onClick={() => editComment()}
                isDisabled={isEditingPending}
                style={{
                  cursor: isEditingPending ? 'not-allowed' : 'pointer',
                  opacity: isEditingPending ? 0.5 : 1,
                }}
              >
                {isEditingPending ? '수정 중...' : '수정 완료'}
              </Button>
            </Flex>
          </>
        ) : (
          <Text>{comment.contents}</Text>
        )}
      </VStack>
    </Flex>
  );
};
