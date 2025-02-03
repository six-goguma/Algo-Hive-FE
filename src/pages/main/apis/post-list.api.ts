import { fetchInstance } from '@shared/service';

import { RequestPosts, ResponsePosts } from './post-list.type';

export const getPostsPath = ({ page, size, sort }: RequestPosts) => {
  return `/posts?page=${page}&size=${size}&sort=${sort.key},${sort.order}`;
};

export const getPosts = async ({ page, size, sort }: RequestPosts): Promise<ResponsePosts> => {
  const response = await fetchInstance.get<ResponsePosts>(getPostsPath({ page, size, sort }));
  return response.data;
};
