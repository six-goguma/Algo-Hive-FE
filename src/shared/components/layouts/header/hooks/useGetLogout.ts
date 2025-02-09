import { logoutApi, logoutApiPath, ResponseLogoutApi } from '../apis';
import { useQuery } from '@tanstack/react-query';
import { UseQueryResult } from '@tanstack/react-query';

export const GetLogoutQueryKey = [logoutApiPath];

export const useGetLogout = (): UseQueryResult<ResponseLogoutApi> => {
  return useQuery<ResponseLogoutApi, Error>({
    queryKey: GetLogoutQueryKey,
    queryFn: logoutApi,
  });
};
