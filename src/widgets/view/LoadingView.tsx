import { Flex, Spinner } from '@chakra-ui/react';

import { HEADER_HEIGHT } from '@shared/components';

export const LoadingView = () => {
  return (
    <Flex w='full' h={`calc(100vh - ${HEADER_HEIGHT})`} justifyContent='center' p='80px 16px'>
      <Spinner />
    </Flex>
  );
};
