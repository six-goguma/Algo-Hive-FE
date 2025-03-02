import { useEffect, useState } from 'react';

import { Flex, VStack } from '@chakra-ui/react';

import { Pagination } from '@shared/components';
import { authStorage } from '@shared/utils';

import { MyPostSection, NicknameSection, ProfileSection } from '../components';
import { useGetPostUser, useGetProfile } from '../hooks';

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

  const { data: profileData } = useGetProfile();

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [currentPage, refetch]);

  const totalPages = postUserData?.totalPages ?? 1;

  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <Flex w='full' flexDir='column' justify='center' align='center'>
      <Flex
        w='full'
        maxW={{ base: 'full', sm: '1000px' }}
        h={{ base: 'auto', sm: '210px' }}
        mt='30px'
        align='flex-start'
        px={{ base: '0', sm: '40px' }}
        gap={4}
      >
        <ProfileSection profile={profileData?.url} />
        <NicknameSection />
      </Flex>
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
