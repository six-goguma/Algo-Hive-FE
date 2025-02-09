import { useEffect, useState } from 'react';

import { Flex, VStack } from '@chakra-ui/react';

import { Pagination } from '@shared/components';
import { authStorage } from '@shared/utils';

import { MyPostSection, UserProfileSection } from '../components';
import { useGetPostUser } from '../hooks';

export const Mypage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const userNickname = authStorage.nickName.get();

  const {
    data: postUserData,
    isPending,
    isError,
    refetch,
  } = useGetPostUser({
    page: currentPage - 1,
    size: 10,
    sort: { key: 'createdAt', order: 'desc' },
    nickname: userNickname,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [currentPage, refetch]);

  const totalPages = postUserData?.totalPages ?? 1;

  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <Flex w='full' flexDir='column' justify='center' align='center'>
      <UserProfileSection isPending={isPending} />
      <Flex w='full' justifyContent='center'>
        <VStack spacing={1} pb={10}>
          <MyPostSection postUserData={postUserData?.content} isPending={isPending} />
          <Pagination
            totalPages={totalPages}
            totalElements={postUserData?.totalElements ?? 0}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            first={postUserData?.first ?? true}
            last={postUserData?.last ?? true}
            numberOfElements={postUserData?.numberOfElements ?? 0}
          />
        </VStack>
      </Flex>
    </Flex>
  );
};
