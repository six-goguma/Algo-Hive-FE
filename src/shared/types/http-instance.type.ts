export type ResponseAPIError = {
  message: string;
  code: number;
};

export type HttpResponse<T extends object> = {
  data: T;
  config: RequestInit;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: ResponseType;
  url: string;
};

export type Interceptor = {
  onRequest: (config: RequestInit) => RequestInit;
  onResponse: <T extends object>(
    response: HttpResponse<T>,
  ) => HttpResponse<T> | PromiseLike<HttpResponse<T>>;
  onRequestError: (reason: unknown) => Promise<never>;
  onResponseError: (reason: unknown) => Promise<never>;
};
