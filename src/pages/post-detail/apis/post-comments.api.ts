import { fetchInstance } from '@shared/service';
import { RequestPosts } from '@shared/types';

import { RequestPostComments, ResponsePostComments } from './post-comments.type';

export const getPostsComments = async ({
  postId,
  page,
  size,
  sort,
}: { postId: number } & RequestPosts): Promise<ResponsePostComments> => {
  const response = await fetchInstance.get<ResponsePostComments>(
    `/posts/${postId}/comments?page=${page}&size=${size}&sort=${sort.key},${sort.order}`,
  );
  return response.data;
};

export const editPostsComments = async ({
  commentId,
  contents,
}: { commentId: number } & RequestPostComments) => {
  const response = await fetchInstance.put(`/posts/comments/${commentId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contents }),
  });
  return response.data;
};

export const savePostsComments = async ({
  postId,
  contents,
}: { postId: number } & RequestPostComments) => {
  const response = await fetchInstance.post(`/posts/${postId}/comments`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ contents }),
  });
  return response.data;
};

export const deletePostsComments = async ({ commentId }: { commentId: number }) => {
  const response = await fetchInstance.delete(`/posts/comments/${commentId}`);
  return response.data;
};
