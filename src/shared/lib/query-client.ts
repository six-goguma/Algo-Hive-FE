import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnMount: true,
			refetchOnReconnect: true,
			refetchOnWindowFocus: true,
		},
	},
});
