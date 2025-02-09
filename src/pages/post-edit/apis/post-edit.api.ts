import { fetchInstance } from '@shared/service';

import { UpdatePostResponse } from './';

const POSTS_PATH = '/posts';

export const updatePost = async (
  postId: number,
  postData: { title: string; contents: string; thumbnail: string; summary: string },
): Promise<UpdatePostResponse> => {
  const response = await fetchInstance.put<UpdatePostResponse>(`${POSTS_PATH}/${postId}`, {
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.data) {
    throw new Error('게시글 수정 실패');
  }

  return response.data;
};

export const updatePostTags = async (postId: number, tagId: number[] | null) => {
  const response = await fetchInstance.put(`${POSTS_PATH}/${postId}/tags`, {
    body: JSON.stringify({ tagId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
