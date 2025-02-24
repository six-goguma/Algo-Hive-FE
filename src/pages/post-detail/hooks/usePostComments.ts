import { getPostsComments, savePostsComments, ResponsePostComments } from '../apis';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostComments = (postId?: number, page: number = 0, size: number = 10) => {
  return useQuery<ResponsePostComments>({
    queryKey: ['postComments', postId, page],
    queryFn: () =>
      postId
        ? getPostsComments({ postId, page, size, sort: { key: 'createdAt', order: 'desc' } })
        : Promise.reject(),
    enabled: !!postId,
  });
};

export const useSubmitComment = (postId?: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => {
      if (!postId || !content.trim()) return Promise.reject('댓글 내용이 없습니다.');
      return savePostsComments({ postId, contents: content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postComments', postId] });
    },
  });
};
