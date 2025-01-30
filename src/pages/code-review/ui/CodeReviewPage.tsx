import { Flex } from '@chakra-ui/react';

import { CodeInputBox, ReviewResult } from '../components';

export const CodeReviewPage = () => {
  return (
    <Flex w='full' justify='center' overflow={{ base: 'scroll', sm: 'hidden' }}>
      <Flex w='80%' flexDir='column' align='center' mb='100px'>
        <CodeInputBox />
        <ReviewResult />
      </Flex>
    </Flex>
  );
};
