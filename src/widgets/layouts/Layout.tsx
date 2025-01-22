import { Outlet } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { Header } from '@shared/components';
import { ScrollToTop } from '@shared/utils';

export const Layout = () => {
  return (
    <Box>
      <ScrollToTop />
      <Header />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
  return (
    <Box>
      <ScrollToTop />
      <Header />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};
