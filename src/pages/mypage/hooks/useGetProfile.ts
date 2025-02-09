import { getProfile, profilePath } from '../apis';
import { useQuery } from '@tanstack/react-query';

export const ProfileQueryKey = [profilePath];

interface ResponseGetProfile {
  url: string | null;
}

export const useGetProfile = () => {
  return useQuery<ResponseGetProfile>({
    queryKey: ProfileQueryKey,
    queryFn: async () => {
      const profile = await getProfile();
      return profile;
    },
  });
};
