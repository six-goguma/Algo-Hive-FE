import { fetchInstance } from '@shared/service';
import { RequestPostParams, RequestPosts } from '@shared/types';

import { RequestPostComments, ResponsePostComments } from './post-comments.type';

export const PostsCommentsPath = ({ postId }: RequestPostParams, params?: RequestPosts) => {
  if (params) {
    return `/posts/${postId}/comments?page=${params.page}&size=${params.size}&sort=${params.sort.key},${params.sort.order}`;
  }
  return `/posts/${postId}/comments`;
};

export const getPostsComments = async ({
  postId,
  page,
  size,
  sort,
}: RequestPostParams & RequestPosts): Promise<ResponsePostComments> => {
  const response = await fetchInstance.get<ResponsePostComments>(
    PostsCommentsPath({ postId }, { page, size, sort }),
  );
  return response.data;
};

export const editPostsComments = async ({
  postId,
  content,
}: RequestPostParams & RequestPostComments) => {
  const response = await fetchInstance.put(PostsCommentsPath({ postId }), { body: content });
  return response.data;
};

export const savePostsComments = async ({
  postId,
  content,
}: RequestPostParams & RequestPostComments) => {
  const response = await fetchInstance.post(PostsCommentsPath({ postId }), { body: content });
  return response.data;
};

export const deletePostsComments = async ({ postId }: RequestPostParams) => {
  const response = await fetchInstance.delete(PostsCommentsPath({ postId }));
  return response.data;
};
