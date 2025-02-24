import {
  getPostDetail,
  getPostTags,
  getPostsComments,
  ResponsePostDetail,
  ResponsePostTags,
  ResponsePostComments,
} from '../apis';
import { useQuery } from '@tanstack/react-query';

export const usePostDetail = (postId?: number, page: number = 0) => {
  return useQuery<
    { post: ResponsePostDetail; tags: ResponsePostTags; comments: ResponsePostComments },
    Error
  >({
    queryKey: ['postDetail', postId, page],
    queryFn: async () => {
      if (!postId) throw new Error('게시글 ID 없음');

      const [post, tags, comments] = await Promise.all([
        getPostDetail({ postId }),
        getPostTags({ postId }),
        getPostsComments({
          postId,
          page,
          size: 10,
          sort: { key: 'createdAt', order: 'desc' },
        }),
      ]);

      return { post, tags, comments };
    },
    enabled: !!postId,
  });
};
