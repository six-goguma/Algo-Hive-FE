import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DEFAULT_IMAGE } from '@shared/constants';
import { getDynamicPath } from '@shared/utils';

import { Grid } from '@widgets/grid';
import { SkeletonPostCards, PostCards } from '@widgets/post-cards';

import { PostContent } from '../../apis';

type PostListProps = {
  postData?: PostContent[];
  isPending: boolean;
};

export const PostList = ({ postData, isPending }: PostListProps) => {
  const [isThumbnailLoaded, setIsThumbnailLoaded] = useState(false);

  useEffect(() => {
    if (!isPending && postData) {
      const imageLoaders = postData.map((post) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = post.thumbnail ?? DEFAULT_IMAGE;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

      Promise.all(imageLoaders).then(() => setIsThumbnailLoaded(true));
    }
  }, [isPending, postData]);

  if (isPending || !postData || !isThumbnailLoaded) {
    return (
      <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={20}>
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonPostCards key={index} />
        ))}
      </Grid>
    );
  }

  return (
    <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={20}>
      {postData.map((post) => (
        <Link key={post.id} to={getDynamicPath.postDetail(String(post.id))}>
          <PostCards
            title={post.title}
            postId={post.id}
            thumbnail={post.thumbnail ?? DEFAULT_IMAGE}
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
