import { fetchInstance } from '@shared/service';

import { RequestLoginApi, ResponseLoginApi } from './login.type';

export const loginApiPath = `/auth/login`;

export const loginApi = async ({ email, password }: RequestLoginApi): Promise<ResponseLoginApi> => {
  const response = await fetchInstance.post<ResponseLoginApi>(loginApiPath, {
    body: JSON.stringify({ email, password }),
  });
  return response.data;
};
