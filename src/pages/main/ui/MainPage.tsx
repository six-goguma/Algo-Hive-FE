import { Flex, VStack } from '@chakra-ui/react';

import { useGetMockData } from '@shared/hooks';

import { ButtonSkeleton, NavigateButton, PostList, Tabs } from '../components';
import { POST_LIST_DUMMY_DATA } from '../data';

export const MainPage = () => {
  const { isPending, isError } = useGetMockData(POST_LIST_DUMMY_DATA);

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
        <PostList />
      </VStack>
    </Flex>
  );
};
