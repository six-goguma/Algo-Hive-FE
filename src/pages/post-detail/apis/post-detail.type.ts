export type ResponsePostDetail = {
  id: number;
  title: string;
  contents: string;
  thumbnail: string;
  summary: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  author: string;
  storageId: string;
};

export type ResponsePostTags = {
  tagIds: number[];
};
