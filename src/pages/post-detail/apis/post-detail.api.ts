import { fetchInstance } from '@shared/service';
import { RequestPostParams } from '@shared/types';

import { ResponsePostDetail, ResponsePostTags } from './';

export const PostsDetailPath = ({ postId }: RequestPostParams) => `/posts/${postId}`;

export const getPostDetail = async ({ postId }: RequestPostParams): Promise<ResponsePostDetail> => {
  const response = await fetchInstance.get<ResponsePostDetail>(PostsDetailPath({ postId }));
  return response.data;
};

export const PostsTagsPath = ({ postId }: RequestPostParams) => `/posts/${postId}/tags`;

export const getPostTags = async ({ postId }: RequestPostParams): Promise<ResponsePostTags> => {
  const response = await fetchInstance.get<ResponsePostTags>(PostsTagsPath({ postId }));
  return response.data;
};
