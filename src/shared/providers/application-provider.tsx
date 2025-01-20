import { ReactNode } from 'react';

import { queryClient } from '@shared/lib';
import { globalStyle } from '@shared/themes';

import { ChakraProvider } from '@chakra-ui/react';
import { QueryClientProvider } from '@tanstack/react-query';

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={globalStyle}>{children}</ChakraProvider>
    </QueryClientProvider>
  );
};
