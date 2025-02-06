import { useEffect, useState } from 'react';

import { Flex, VStack } from '@chakra-ui/react';

import { NavigateButton, Pagination, PostList, Tabs } from '../components';
import { useGetPosts } from '../hooks';

export const MainPage = () => {
  const [activeTab, setActiveTab] = useState<'createdAt' | 'likeCount'>('createdAt');
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: postData,
    isPending,
    isError,
    refetch,
  } = useGetPosts({
    page: currentPage - 1,
    size: 12,
    sort: { key: activeTab, order: 'desc' },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [currentPage, activeTab, refetch]);

  if (isError) return <div>오류가 발생했습니다.</div>;

  const totalPages = postData?.totalPages ?? 1;

  return (
    <Flex w='full' justifyContent='center'>
      <VStack spacing={10} pb={10}>
        <Flex w='full' justifyContent='space-between'>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <NavigateButton />
        </Flex>
        <PostList postData={postData?.content} isPending={isPending} />
        <Pagination
          totalPages={totalPages}
          totalElements={postData?.totalElements ?? 0}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          first={postData?.first ?? true}
          last={postData?.last ?? true}
          numberOfElements={postData?.numberOfElements ?? 0}
        />
      </VStack>
    </Flex>
  );
};
