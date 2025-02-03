import { Outlet } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { Header, HEADER_HEIGHT } from '@shared/components';
import { ScrollToTop } from '@shared/utils';

export const Layout = () => {
  return (
    <Box w='full' position='relative'>
      <ScrollToTop />
      <Header />
      <Box w='full' position='absolute' top='0' left='0' mt={HEADER_HEIGHT}>
        <Outlet />
      </Box>
    </Box>
  );
};
