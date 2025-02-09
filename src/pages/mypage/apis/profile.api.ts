import { fetchInstance } from '@shared/service';

import { ResponseGetProfile } from './profile.type';

export const profilePath = `/mypage/profile`;

export const getProfile = async (): Promise<ResponseGetProfile> => {
  const response = await fetchInstance.get<ResponseGetProfile>(profilePath);
  return response.data;
};
