import { fetchInstance } from '@shared/service';

import { RequestLoginApi, ResponseLoginApi, ResponseLogoutApi } from './login.type';

export const loginApiPath = `/auth/login`;

export const loginApi = async ({ email, password }: RequestLoginApi): Promise<ResponseLoginApi> => {
  const response = await fetchInstance.post<ResponseLoginApi>(loginApiPath, {
    body: JSON.stringify({ email, password }),
  });
  return response.data;
};

export const logoutApiPath = `/mypage/logout`;

export const logoutApi = async (): Promise<ResponseLogoutApi> => {
  const response = await fetchInstance.post<ResponseLogoutApi>(logoutApiPath);
  return response.data;
};
