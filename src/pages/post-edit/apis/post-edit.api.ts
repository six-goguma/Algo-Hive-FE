import { fetchInstance } from '@shared/service';

import { UpdatePostResponse } from './';

const POSTS_PATH = '/posts';

export const updatePost = async (
  postId: number,
  postData: { title: string; contents: string; thumbnail: string; summary: string },
): Promise<UpdatePostResponse> => {
  const response = await fetchInstance.put<UpdatePostResponse>(`${POSTS_PATH}/${postId}`, {
    body: JSON.stringify(postData),
  });

  if (!response.data) {
    throw new Error('게시글 수정 실패');
  }

  return response.data;
};

export const updatePostTags = async (postId: number, tagIds: number[]) => {
  const response = await fetchInstance.put(`${POSTS_PATH}/${postId}/tags`, {
    body: JSON.stringify({ tagIds }),
  });

  return response.data;
};
