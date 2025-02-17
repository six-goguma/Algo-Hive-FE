import { fetchInstance } from '@shared/service';
import { RequestPostParams } from '@shared/types';

import { ResponsePostDetail, ResponsePostTags } from './';

export const getPostDetail = async ({ postId }: RequestPostParams) => {
  const response = await fetchInstance.get<ResponsePostDetail>(`/posts/${postId}`);
  return response.data;
};

export const getPostTags = async ({ postId }: RequestPostParams) => {
  const response = await fetchInstance.get<ResponsePostTags>(`/posts/${postId}/tags`);
  return response.data;
};

export const getLikeStatus = async ({ postId }: RequestPostParams) => {
  const response = await fetchInstance.get<{ liked: boolean }>(`/posts/${postId}/likes/status`);
  return response.data.liked;
};

export const putLikeStatus = async ({ postId }: RequestPostParams) => {
  const response = await fetchInstance.put<{ liked: boolean }>(`/posts/${postId}/likes/status`);
  return response.data.liked;
};
