import { getPostUser, getPostUserPath, RequestPostUser, ResponsePostUser } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const PostUserQueryKey = ({ page, size, sort, nickname }: RequestPostUser) => [
  getPostUserPath({ page, size, sort, nickname }),
];

export const useGetPostUser = ({ page, size, sort, nickname }: RequestPostUser) => {
  return useQuery<ResponsePostUser>({
    queryKey: PostUserQueryKey({ page, size, sort, nickname }),
    queryFn: async () => {
      const posts = await getPostUser({ page, size, sort, nickname });
      return posts;
    },
  });
};
