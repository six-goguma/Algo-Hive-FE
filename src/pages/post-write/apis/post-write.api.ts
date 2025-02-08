import { fetchInstance } from '@shared/service';

const POSTS_PATH = '/posts';

type CreatePostResponse = {
  id: number;
  title: string;
  contents: string;
  thumbnail: string;
  summary: string;
};

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

export const savePostTags = async (postId: number, tagIds: number) => {
  const response = await fetchInstance.post(`${POSTS_PATH}/${postId}/tags`, {
    body: JSON.stringify({ tagIds }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
