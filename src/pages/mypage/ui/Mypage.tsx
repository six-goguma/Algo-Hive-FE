import { Link } from 'react-router-dom';

import { Avatar, Flex, Button, Text, Skeleton, VStack } from '@chakra-ui/react';

import { useGetMockData } from '@shared/hooks';
import { getDynamicPath } from '@shared/utils';

import { Grid } from '@widgets/grid';
import { PostCards, SkeletonPostCards } from '@widgets/post-cards';

import { POST_LIST_DUMMY_DATA } from '../../main/mock';
import { Tabs } from '../../mypage/components/tabs';

export const Mypage = () => {
  const { data, isPending, isError } = useGetMockData(POST_LIST_DUMMY_DATA);

  if (isError) return <div>오류가 발생했습니다.</div>;
  const userNickname = 'gogumalatte';
  return (
    <Flex w='full' flexDir='column' justify='center' align='center'>
      <Flex w='80%' h='210px' mt='40px'>
        <Flex w='128px' flexDir='column' align='center'>
          <Avatar size='128px' mb='16px' />
          <Button w='118px' h='40px' fontSize='18px' mb='10px'>
            이미지 업로드
          </Button>
          <Button bg='none' border='none' w='118px' h='40px' color='blue.500' fontSize='18px'>
            이미지 제거
          </Button>
        </Flex>
        <Flex w='150px' flexDir='column' ml='30px' align='flex-start'>
          <Text fontSize='24px' fontWeight='Bold' mb='10px' mt='10px'>
            {userNickname}
          </Text>
          <Button fontSize='16px' fontWeight='Bold' bg='none' border='none'>
            <Text
              fontSize='16px'
              fontWeight='Bold'
              lineHeight='16px'
              color='blue.500'
              textDecoration='underline'
            >
              닉네임 수정
            </Text>
          </Button>
        </Flex>
        <Flex w='full' justify='flex-end'>
          <Button bg='white' color='gray.500' w='80px' h='32px' fontSize='16px'>
            회원탈퇴
          </Button>
        </Flex>
      </Flex>
      <Flex w='full' justifyContent='center'>
        <VStack spacing={10} pb={10}>
          {isPending ? (
            <Flex w='full' py={8}>
              <Skeleton w='160px' h={10} />
            </Flex>
          ) : (
            <>
              <Tabs />
            </>
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
    </Flex>
  );
};
