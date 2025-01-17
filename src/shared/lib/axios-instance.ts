import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export const initInstance = (config: AxiosRequestConfig): AxiosInstance => {
  const instance = axios.create({
    timeout: 5000,
    ...config,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Cross-Control-Allow-Origin': '*',

      ...config.headers,
    },
  });

  return instance;
};
