import { Flex } from '@chakra-ui/react';

import { Container } from '@widgets/container';

import { PostComments, PostContents, PostInfo } from '../components';

export const PostDetailPage = () => {
  return (
    <Flex w='full'>
      <Container maxWidth='100vw' flexDirection='column' alignItems='center'>
        <PostInfo />
        <PostContents />
        <PostComments />
      </Container>
    </Flex>
  );
};
