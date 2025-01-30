import { PostResponse } from '@shared/types';

export type PostContent = {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  author: 'string';
};

export type ResponsePosts = PostResponse<PostContent>;

export type RequestPosts = {
  page: number;
  size: number;
  sort: { key: string; order: 'asc' | 'desc' };
};
