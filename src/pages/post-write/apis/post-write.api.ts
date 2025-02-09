import { fetchInstance } from '@shared/service';

import { CreatePostResponse } from './';

const POSTS_PATH = '/posts';

export const createPost = async (postData: {
  title: string;
  contents: string;
  thumbnail: string;
  summary: string;
}): Promise<CreatePostResponse> => {
  const response = await fetchInstance.post<CreatePostResponse>(`${POSTS_PATH}`, {
    body: JSON.stringify(postData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.data || !response.data.id) {
    throw new Error('게시글 생성 실패: postId가 응답에 없습니다.');
  }

  return response.data;
};

export const savePostTags = async (postId: number, tagId: number | null) => {
  const response = await fetchInstance.post(`${POSTS_PATH}/${postId}/tags`, {
    body: JSON.stringify({ tagId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
