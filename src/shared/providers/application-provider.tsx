import { ReactNode } from 'react';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

// import { ChakraProvider } from '@chakra-ui/react';

import { queryClient } from '../lib';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'src/components/ui/provider';

export const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    // <QueryClientProvider client={queryClient}>
    // {/* <ChakraProvider
    //   value={system}
    //   // toastOptions={{ defaultOptions: { position: 'bottom-left' } }}
    // > */}
    // {/* </ChakraProvider> */}
    // </QueryClientProvider>
  );
};
