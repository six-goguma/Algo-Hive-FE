import { PostResponse } from '@shared/types';

export type PostCommentsContent = {
  id: number;
  contents: string;
  createdAt: string;
  updatedAt: number;
  author: string;
};

export type ResponsePostComments = PostResponse<PostCommentsContent>;

export type RequestPostComments = {
  contents: string;
};
