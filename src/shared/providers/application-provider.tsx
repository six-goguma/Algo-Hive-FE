import { ReactNode } from 'react';

import { ChakraProvider } from '@chakra-ui/react';

import { queryClient } from '../lib';
import { globalStyle } from '../themes';
import { QueryClientProvider } from '@tanstack/react-query';

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={globalStyle}
        toastOptions={{ defaultOptions: { position: 'bottom-left' } }}
      >
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
};
