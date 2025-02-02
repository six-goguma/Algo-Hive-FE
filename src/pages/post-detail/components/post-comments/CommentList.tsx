import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';

type CommentListProps = {
  isLast?: boolean;
};

export const CommentList = ({ isLast }: CommentListProps) => {
  return (
    <Flex w='full' py={3} borderBottom={isLast ? 'none' : '1px solid'} borderColor='customGray.300'>
      <VStack w='full'>
        <HStack w='full' justify='space-between'>
          <HStack spacing={4}>
            <Avatar size='md' />
            <Flex w='full' flexDir='column' align='flex-start'>
              <Text as='b'>Kiyoung</Text>
              <Text fontSize='sm' color='customGray.400'>
                2025년 1월 14일
              </Text>
            </Flex>
          </HStack>
          <Text as='button' fontWeight='700' color='customGray.400'>
            삭제
          </Text>
        </HStack>
        <Flex w='full' my={3} textAlign='start'>
          <Text>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry&apos;s standard dummy text ever since the 1500s...
          </Text>
        </Flex>
      </VStack>
    </Flex>
  );
};
