import { getPosts, getPostsPath, RequestPosts, ResponsePosts } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const PostsQueryKey = ({ page, size, sort }: RequestPosts) => [
  getPostsPath({ page, size, sort }),
];

export const useGetPosts = ({ page, size, sort }: RequestPosts) => {
  return useQuery<ResponsePosts>({
    queryKey: PostsQueryKey({ page, size, sort }),
    queryFn: async () => {
      const posts = await getPosts({ page, size, sort });
      return posts;
    },
  });
};
