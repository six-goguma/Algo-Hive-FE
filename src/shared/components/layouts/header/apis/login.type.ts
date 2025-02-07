export type RequestLoginApi = {
  email: string;
  password: string;
};

export type ResponseLoginApi = {
  message: string;
  nickName: string;
};

export type ResponseLogoutApi = {
  message: string;
};
