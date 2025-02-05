export type RequestSignupApi = {
  nickName: string;
  email: string;
  password: string;
};

export type ResponseSignupApi = {
  message: string;
};

export type RequestSendEmailCodeApi = {
  email: string;
};

export type ResponseSendEmailCodeApi = {
  message: string;
};

export type RequestVerifyEmailApi = {
  email: string;
  code: string;
};

export type ResponseVerifyEmailApi = {
  message: string;
};

export type RequestCheckNicknameApi = {
  nickName: string;
};

export type ResponseCheckNicknameApi = {
  message: string;
};

export type RequestDuplicateEmailApi = {
  email: string;
};

export type ResponseDuplicateEmailApi = {
  message: string;
};
