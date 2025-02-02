import { Flex, Skeleton, VStack } from '@chakra-ui/react';

import { useGetMockData } from '@shared/hooks';

import { POST_LIST_DUMMY_DATA } from '../../main/mock';
import { MyPostSection, Tabs, UserProfileSection } from '../components';

export const Mypage = () => {
  const { isPending, isError } = useGetMockData(POST_LIST_DUMMY_DATA);

  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <Flex w='full' flexDir='column' justify='center' align='center'>
      <UserProfileSection />
      <Flex w='full' justifyContent='center'>
        <VStack spacing={1} pb={10}>
          {isPending ? (
            <Flex w='full' py={8}>
              <Skeleton w='160px' h={10} />
            </Flex>
          ) : (
            <Tabs />
          )}
          <MyPostSection />
        </VStack>
      </Flex>
    </Flex>
  );
};
