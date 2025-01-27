import { Link } from 'react-router-dom';

import { POST_LIST_DUMMY_DATA } from '@pages/main/mock';

import { useGetMockData } from '@shared/hooks';
import { getDynamicPath } from '@shared/utils';

import { Grid } from '@widgets/grid';
import { SkeletonPostCards, PostCards } from '@widgets/post-cards';

export const MyPostSection = () => {
  const { data, isPending } = useGetMockData(POST_LIST_DUMMY_DATA);
  return (
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
  );
};
