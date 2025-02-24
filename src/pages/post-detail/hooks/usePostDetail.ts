import { getPostDetail, getPostTags, ResponsePostDetail, ResponsePostTags } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const usePostDetail = (postId?: number) => {
  return useQuery<{ post: ResponsePostDetail; tags: ResponsePostTags }, Error>({
    queryKey: ['postDetail', postId],
    queryFn: async () => {
      if (!postId) throw new Error('게시글 ID 없음');
      const [post, tags] = await Promise.all([getPostDetail({ postId }), getPostTags({ postId })]);
      return { post, tags };
    },
    enabled: !!postId,
  });
};
