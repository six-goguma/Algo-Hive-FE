import { initInstance } from '../../lib/axios-instance';

export const BASE_URI = `https://sinitto.site`;

export const fetchInstance = initInstance({
  baseURL: BASE_URI,
});
