import { Link } from 'react-router-dom';

import { useGetMockData } from '@shared/hooks';
import { getDynamicPath } from '@shared/utils';

import { Grid } from '@widgets/grid';
import { SkeletonPostCards, PostCards } from '@widgets/post-cards';

import { MOCK_MY_POST_LIST } from '../../data';

export const MyPostSection = () => {
  const { data, isPending } = useGetMockData(MOCK_MY_POST_LIST);
  return (
    <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={20}>
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
  );
};
