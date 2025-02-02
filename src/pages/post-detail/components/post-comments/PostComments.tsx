import { Button, Flex, Text, Textarea, VStack } from '@chakra-ui/react';

import { CommentList } from './CommentList';

export const PostComments = () => {
  const comments = [1, 2];
  return (
    <VStack w='full' mb={20}>
      <Flex w='full'>
        <Text as='b'>{comments.length}개의 댓글</Text>
      </Flex>
      <Flex w='full'>
        <Textarea
          bg='white'
          w='full'
          h='100px'
          size='sm'
          placeholder='댓글을 입력해주세요.'
          resize='none'
        />
      </Flex>
      <Flex w='full' justify='right'>
        <Button borderRadius='3px'>댓글 작성</Button>
      </Flex>
      <Flex w='full' flexDir='column' mt={20} gap={5}>
        {comments.map((_, index) => (
          <CommentList key={index} isLast={index === comments.length - 1} />
        ))}
      </Flex>
    </VStack>
  );
};
