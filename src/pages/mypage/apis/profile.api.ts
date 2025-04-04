import { fetchInstance, multipartFetchInstance } from '@shared/service';

import { RequestUpdateProfile, ResponseGetProfile, ResponseUpdateProfile } from './profile.type';

export const profilePath = `/mypage/profile`;

export const getProfile = async (): Promise<ResponseGetProfile> => {
  const response = await fetchInstance.get<ResponseGetProfile>(profilePath);
  return response.data;
};

export const updateProfileImage = async ({
  file,
}: RequestUpdateProfile): Promise<ResponseUpdateProfile> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await multipartFetchInstance.post<ResponseUpdateProfile>(profilePath, {
    body: formData,
  });

  return response.data;
};

export const deleteProfileImage = async (): Promise<void> => {
  await fetchInstance.delete(profilePath);
};
