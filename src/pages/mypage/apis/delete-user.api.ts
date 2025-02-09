import { fetchInstance } from '@shared/service';

import { ResponseDeleteUser } from './delete-user.type';

export const DeleteUserPath = `/mypage/withdrawal`;

export const deleteUser = async (): Promise<ResponseDeleteUser> => {
  const response = await fetchInstance.delete<ResponseDeleteUser>(DeleteUserPath);

  return response.data;
};
