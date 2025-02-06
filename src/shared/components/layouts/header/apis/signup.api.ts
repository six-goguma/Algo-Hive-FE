import { fetchInstance } from '@shared/service';

import {
  RequestCheckNicknameApi,
  RequestDuplicateEmailApi,
  RequestSendEmailCodeApi,
  RequestSignupApi,
  RequestVerifyEmailApi,
  ResponseCheckNicknameApi,
  ResponseDuplicateEmailApi,
  ResponseSendEmailCodeApi,
  ResponseSignupApi,
  ResponseVerifyEmailApi,
} from './signup.type';

export const signupApiPath = `/auth/register`;

export const signupApi = async ({
  nickName,
  email,
  password,
}: RequestSignupApi): Promise<ResponseSignupApi> => {
  const response = await fetchInstance.post<ResponseSignupApi>(signupApiPath, {
    body: JSON.stringify({ nickName, email, password }),
  });
  return response.data;
};

export const sendEmailCodeApiPath = `/auth/code`;

export const sendEmailCodeApi = async ({
  email,
}: RequestSendEmailCodeApi): Promise<ResponseSendEmailCodeApi> => {
  const response = await fetchInstance.post<ResponseSendEmailCodeApi>(sendEmailCodeApiPath, {
    body: JSON.stringify({ email }),
  });
  return response.data;
};

export const verifyEmailApiPath = `/auth/verify`;

export const verifyEmailApi = async ({
  email,
  code,
}: RequestVerifyEmailApi): Promise<ResponseVerifyEmailApi> => {
  const response = await fetchInstance.post<ResponseVerifyEmailApi>(verifyEmailApiPath, {
    body: JSON.stringify({ email, code }),
  });
  return response.data;
};

export const checkNicknameApiPath = `/auth/nick-name`;

export const checkNicknameApi = async ({
  nickName,
}: RequestCheckNicknameApi): Promise<ResponseCheckNicknameApi> => {
  const response = await fetchInstance.post<ResponseCheckNicknameApi>(checkNicknameApiPath, {
    body: JSON.stringify({ nickName }),
  });
  return response.data;
};

export const duplicateEmailApiPath = `/auth/email`;

export const duplicateEmailApi = async ({
  email,
}: RequestDuplicateEmailApi): Promise<ResponseDuplicateEmailApi> => {
  const response = await fetchInstance.post<ResponseDuplicateEmailApi>(duplicateEmailApiPath, {
    body: JSON.stringify({ email }),
  });
  return response.data;
};
