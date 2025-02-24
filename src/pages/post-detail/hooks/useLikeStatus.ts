import { getLikeStatus, putLikeStatus } from '../apis';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useLikeStatus = (postId?: number, isLogin?: boolean) => {
  const queryClient = useQueryClient();

  const isQueryEnabled = typeof postId === 'number' && !!isLogin;

  const { data: isLiked = false } = useQuery({
    queryKey: ['likeStatus', postId],
    queryFn: async () => {
      if (!isQueryEnabled) return false;
      return getLikeStatus({ postId });
    },
    enabled: isQueryEnabled,
  });

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: async () => {
      if (!postId) return Promise.reject(new Error('Invalid postId'));
      return putLikeStatus({ postId });
    },
    onSuccess: (newLikeStatus) => {
      queryClient.setQueryData(['likeStatus', postId], newLikeStatus);
    },
  });

  return { isLiked, toggleLike, isPending };
};
