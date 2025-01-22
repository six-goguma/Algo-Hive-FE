import { Outlet } from 'react-router-dom';

import { Header } from '@shared/components';
import { ScrollToTop } from '@shared/utils';

import { Box } from '@chakra-ui/react';

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
};
