import { Flex, Skeleton, VStack } from '@chakra-ui/react';

import { useGetMockData } from '@shared/hooks';

import { PostList, Tabs } from '../components';
import { POST_LIST_DUMMY_DATA } from '../data';

export const MainPage = () => {
  const { isPending, isError } = useGetMockData(POST_LIST_DUMMY_DATA);

  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <Flex w='full' justifyContent='center'>
      <VStack spacing={10} pb={10}>
        {isPending ? (
          <Flex w='full' py={8}>
            <Skeleton w='160px' h={10} />
          </Flex>
        ) : (
          <Tabs />
        )}
        <PostList />
      </VStack>
    </Flex>
  );
};
