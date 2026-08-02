import { isApiErrorData, ApiError, UnknownApiError } from '@shared/config';
import { Http, HttpResponse } from '@shared/lib';

const API_PREFIX = `/api/v1`;

export const BASE_URI = `${API_PREFIX}`;

// 로컬은 vite proxy(→ localhost:8080), 배포는 같은 도메인의 nginx가 /api 를 백엔드로 넘긴다.
const ORIGIN = import.meta.env.VITE_SERVER_URL ?? window.location.origin;

export const SERVER_URI = ORIGIN;

export const BASE_WS_URI = ORIGIN.replace(/^http/, 'ws');

export const SERVER_FILE_URI = ORIGIN;

export const fetchInstance = new Http(BASE_URI, {
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
});

export const multipartFetchInstance = new Http(BASE_URI, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  credentials: 'include',
});

multipartFetchInstance.registerInterceptor({
  onRequest: (config) => {
    config.headers = {
      ...config.headers,
    };

    return config;
  },
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
