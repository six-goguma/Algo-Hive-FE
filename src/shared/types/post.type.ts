export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
};

export type PostResponse<T> = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: T[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
};

export type RequestPosts = {
  page: number;
  size: number;
  sort: { key: string; order: 'asc' | 'desc' };
};

export type RequestPostParams = {
  postId: number;
};

export type PostFormData = {
  title: string;
  tag: number | null;
  content: string;
  thumbnail: string;
  summary: string;
};
