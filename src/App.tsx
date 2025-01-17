import { Routes } from './app/routes';
import { ReactQueryClientProvider } from './shared/lib/query-client';
import { ChakraProvider } from '@chakra-ui/react';

const App = () => {
  return (
    <ReactQueryClientProvider>
      <ChakraProvider>
        <Routes />
      </ChakraProvider>
    </ReactQueryClientProvider>
  );
};

export default App;
