import { Flex, VStack } from '@chakra-ui/react';

import { ButtonSkeleton, NavigateButton, PostList, Tabs } from '../components';
import { useGetPosts } from '../hooks';

export const MainPage = () => {
  //TODO: useState로 Tabs값 바꿔서 넣기
  const {
    data: postData,
    isPending,
    isError,
  } = useGetPosts({
    page: 0,
    size: 10,
    sort: { key: 'createdAt', order: 'desc' },
  });

  if (isError) return <div>오류가 발생했습니다.</div>;
  return (
    <Flex w='full' justifyContent='center'>
      <VStack spacing={10} pb={10}>
        {isPending ? (
          <ButtonSkeleton />
        ) : (
          <Flex w='full' justifyContent='space-between'>
            <Tabs />
            <NavigateButton />
          </Flex>
        )}
        <PostList postData={postData?.content} isPending={isPending} />
      </VStack>
    </Flex>
  );
};
