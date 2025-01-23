import { Avatar, Divider, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';

import { HeartIcon } from 'lucide-react';

import { dateFormat } from '@shared/utils';

type PostCardsProps = {
  title: string;
  thumbnail: string;
  summary: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  author: string;
  postId: number;
};

export const PostCards = ({
  title,
  thumbnail,
  summary,
  createdAt,
  likeCount,
  commentCount,
  author,
}: PostCardsProps) => {
  const date = dateFormat(createdAt);

  return (
    <Flex
      w='320px'
      h='400px'
      bg='white'
      flexDir='column'
      boxShadow='5px 5px 20px 0px rgba(0, 0, 0, 0.10)'
    >
      <Flex w='full' h='167px' bg='customGray.200'>
        <Image w='full' h='167px' src={thumbnail} alt='thumbnail-img' />
      </Flex>
      <Flex w='full' h='full' flexDir='column' p={3} justifyContent='space-between'>
        <VStack w='full' alignItems='start' spacing={1}>
          <Text as='b'>{title}</Text>
          <Text textAlign='left'>{summary}</Text>
        </VStack>
        <HStack w='full' spacing={1} justifyContent='start' fontSize='sm' color='customGray.400'>
          <Text>{date}</Text>
          <Text>·</Text>
          <Text>{commentCount}개의</Text>
          <Text>댓글</Text>
        </HStack>
      </Flex>
      <Flex w='full' px={3} py={1}>
        <Divider />
      </Flex>
      <Flex w='full' px={3} py={3} alignItems='center' justifyContent='space-between' fontSize='xs'>
        <HStack spacing={2}>
          <Avatar w={6} h='auto' />
          <HStack spacing={1}>
            <Text>by</Text>
            <Text as='b'>{author}</Text>
          </HStack>
        </HStack>
        <HStack alignItems='center' spacing={1}>
          <HeartIcon fill='black' size={14} />
          <Text fontSize='xs'>{likeCount}</Text>
        </HStack>
      </Flex>
    </Flex>
  );
};
