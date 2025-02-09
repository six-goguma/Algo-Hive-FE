import { isApiErrorData, ApiError, UnknownApiError } from '@shared/config';
import { Http, HttpResponse } from '@shared/lib';

const API_PREFIX = `/api/v1`;

export const BASE_URI = `http://algo.knu-soft.site${API_PREFIX}`;

export const fetchInstance = new Http(BASE_URI, {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

fetchInstance.registerInterceptor({
  onRequest: (config) => {
    //TODO: 로그인 이후 로그인 정보 header에 추가
    config.headers = {
      ...config.headers,
    };

    return config;
  },

  onResponse: async <T extends object>(response: HttpResponse<T>) => {
    if (response.ok) return response;

    //TODO: custom error 코드 추가
    if (isApiErrorData(response.data))
      throw new ApiError(response.data.message, response.data.code, response.config);

    throw new UnknownApiError(response.config);
  },
});
