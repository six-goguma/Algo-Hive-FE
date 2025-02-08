import { fetchInstance } from '@shared/service';

import { RequestChangeUserNickName, ResponseChangeUserNickName } from './user-nickname.type';

export const UserNicknamePath = `/mypage/nick-name`;

export const changeUserNickname = async ({
  nickName,
}: RequestChangeUserNickName): Promise<ResponseChangeUserNickName> => {
  const response = await fetchInstance.put<ResponseChangeUserNickName>(UserNicknamePath, {
    body: JSON.stringify(nickName),
  });
  console.log(nickName);
  return response.data;
};
