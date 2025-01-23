import { Link } from 'react-router-dom';

import { Flex, Skeleton, VStack } from '@chakra-ui/react';

import { useGetMockData } from '@shared/hooks';
import { getDynamicPath } from '@shared/utils';

import { Grid } from '@widgets/grid';
import { PostCards, SkeletonPostCards } from '@widgets/post-cards';

import { Tabs } from '../components';
import { POST_LIST_DUMMY_DATA } from '../mock';

export const MainPage = () => {
  const { data, isPending, isError } = useGetMockData(POST_LIST_DUMMY_DATA);

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
        <Grid columns={{ base: 1, sm: 2, md: 3 }} gap={20}>
          {isPending
            ? Array.from({ length: 6 }).map((_, index) => <SkeletonPostCards key={index} />)
            : data.content.map((post) => (
                <Link key={post.id} to={getDynamicPath.postDetail(String(post.id))}>
                  <PostCards
                    title={post.title}
                    postId={post.id}
                    thumbnail={post.thumbnail}
                    summary={post.summary}
                    createdAt={post.createdAt}
                    likeCount={post.likeCount}
                    commentCount={post.commentCount}
                    author={post.author}
                  />
                </Link>
              ))}
        </Grid>
      </VStack>
    </Flex>
  );
};
