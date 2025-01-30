import { Link } from 'react-router-dom';

import { content } from '@pages/main/apis';

import { getDynamicPath } from '@shared/utils';

import { Grid } from '@widgets/grid';
import { SkeletonPostCards, PostCards } from '@widgets/post-cards';

type PostListProps = {
  postData?: content[];
  isPending: boolean;
};
export const PostList = ({ postData, isPending }: PostListProps) => {
  return (
    <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={20}>
      {isPending || postData === undefined
        ? Array.from({ length: 6 }).map((_, index) => <SkeletonPostCards key={index} />)
        : postData.map((post) => (
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
