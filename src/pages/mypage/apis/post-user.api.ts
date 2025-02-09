import { fetchInstance } from '@shared/service';

import { RequestPostUser, ResponsePostUser } from './post-user.type';

export const getPostUserPath = ({ nickname, page, size, sort }: RequestPostUser) => {
  return `/${nickname}/posts?page=${page}&size=${size}&sort=${sort.key},${sort.order}`;
};

export const getPostUser = async ({
  page,
  size,
  sort,
  nickname,
}: RequestPostUser): Promise<ResponsePostUser> => {
  const response = await fetchInstance.get<ResponsePostUser>(
    getPostUserPath({ page, size, sort, nickname }),
  );
  return response.data;
};
