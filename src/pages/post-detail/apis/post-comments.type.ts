import { PostResponse } from '@shared/types';

export type PostCommentsContent = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: number;
  author: string;
};

export type ResponsePostComments = PostResponse<PostCommentsContent>;

export type RequestPostComments = {
  content: string;
};
