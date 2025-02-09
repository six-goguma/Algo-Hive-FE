import { PostResponse } from '@shared/types';

export type PostUserContent = {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  author: string;
};

export type ResponsePostUser = PostResponse<PostUserContent>;

export type RequestPostUser = {
  page: number;
  size: number;
  sort: { key: string; order: 'asc' | 'desc' };
  nickname: string;
};
