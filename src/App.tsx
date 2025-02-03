import { Routes } from '@app/routes';

import { ApplicationProvider } from '@shared/providers';

const App = () => {
  return (
    <ApplicationProvider>
      <Routes />
    </ApplicationProvider>
  );
};

export default App;
