export type content = {
  id: number;
  title: string;
  thumbnail: string;
  summary: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  author: 'string';
};

type sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type pageable = {
  offset: number;
  sort: sort;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
};

export type ResponsePosts = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: content[];
  number: number;
  sort: sort;
  numberOfElements: number;
  pageable: pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type RequestPosts = {
  page: number;
  size: number;
  sort: { key: string; order: 'asc' | 'desc' };
};
