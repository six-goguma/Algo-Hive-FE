import { Routes } from '@app/routes';

import { queryClient } from '@shared/lib';
import { ApplicationProvider } from '@shared/providers';

import { QueryClientProvider } from '@tanstack/react-query';

const App = () => {
  return (
    <ApplicationProvider>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </ApplicationProvider>
  );
};

export default App;
