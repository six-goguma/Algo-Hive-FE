import { ResponseGetProfile, profilePath, getProfile } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const ProfileQueryKey = [profilePath];

export const useGetProfile = () => {
  return useQuery<ResponseGetProfile>({
    queryKey: ProfileQueryKey,
    queryFn: async () => {
      const profile = await getProfile();
      return profile;
    },
  });
};
