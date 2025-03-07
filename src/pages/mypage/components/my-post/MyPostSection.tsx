import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Flex, Text } from '@chakra-ui/react';

import { DEFAULT_IMAGE } from '@shared/constants';
import { getDynamicPath } from '@shared/utils';

import { Grid } from '@widgets/grid';
import { SkeletonPostCards, PostCards } from '@widgets/post-cards';

import { PostUserContent } from '../../apis';
import { Tabs } from '../tabs';

type MyPostSectionProps = {
  postUserData?: PostUserContent[];
  isPending: boolean;
};

export const MyPostSection = ({ postUserData, isPending }: MyPostSectionProps) => {
  const [loadedThumbnails, setLoadedThumbnails] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (!isPending && postUserData) {
      const imageLoaders = postUserData.map((post) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = post.thumbnail ?? DEFAULT_IMAGE;
          img.onload = () => {
            setLoadedThumbnails((prev) => ({ ...prev, [post.id]: true }));
            resolve(true);
          };
          img.onerror = () => {
            setLoadedThumbnails((prev) => ({ ...prev, [post.id]: true }));
            resolve(true);
          };
        });
      });

      Promise.all(imageLoaders);
    }
  }, [isPending, postUserData]);

  if (!postUserData || postUserData.length === 0) {
    return (
      <Flex w='full' justifyContent='center' alignItems='center' h='200px'>
        <Text fontSize='lg' fontWeight='700' color='gray.400'>
          작성한 게시글이 없습니다.
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Tabs />
      <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={20}>
        {isPending || postUserData === undefined
          ? Array.from({ length: 6 }).map((_, index) => <SkeletonPostCards key={index} />)
          : postUserData.map((post) => (
              <Link key={post.id} to={getDynamicPath.postDetail(String(post.id))}>
                <PostCards
                  title={post.title}
                  postId={post.id}
                  thumbnail={
                    loadedThumbnails[post.id] ? (post.thumbnail ?? DEFAULT_IMAGE) : DEFAULT_IMAGE
                  }
                  summary={post.summary}
                  createdAt={post.createdAt}
                  likeCount={post.likeCount}
                  commentCount={post.commentCount}
                  author={post.author}
                />
              </Link>
            ))}
      </Grid>
    </>
  );
};
