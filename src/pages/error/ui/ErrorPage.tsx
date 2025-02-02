import { Link } from 'react-router-dom';

import { Flex, VStack, Button, Image } from '@chakra-ui/react';

import { HEADER_HEIGHT } from '@shared/components';
import { RouterPath } from '@shared/constants';

import { Container } from '@widgets/container';

import ErrorImg from '../_assets/error.png';

export const ErrorPage = () => {
  return (
    <Flex w='full' h={`calc(90vh - ${HEADER_HEIGHT})`} textAlign='center'>
      <Container alignItems='center' maxWidth='100vw'>
        <VStack gap={4}>
          <Image w='250px' h='auto' src={ErrorImg} />
          <Link to={RouterPath.MAIN}>
            <Button py={1} _hover={{}}>
              홈으로
            </Button>
          </Link>
        </VStack>
      </Container>
    </Flex>
  );
};
