import { ChakraProvider } from '@chakra-ui/react';
import { queryClient } from '@shared/lib';
import { globalStyle } from '@shared/themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<ChakraProvider theme={globalStyle}>{children}</ChakraProvider>
		</QueryClientProvider>
	);
};
