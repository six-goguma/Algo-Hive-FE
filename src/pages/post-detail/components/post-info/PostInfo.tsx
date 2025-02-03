import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button, Flex, HStack, Tag, Text, VStack } from '@chakra-ui/react';

import { HeartIcon } from 'lucide-react';

import { getDynamicPath } from '@shared/utils';

export const PostInfo = () => {
  const [isClicked, setIsClicked] = useState(false);
  const params = useParams();

  return (
    <Flex w='full' mt={10}>
      <VStack w='full' spacing={5}>
        <Flex w='full'>
          <Text as='h1' fontWeight='900' fontSize='36px'>
            백준 1004번 풀이
          </Text>
        </Flex>
        <Flex w='full' justify='space-between'>
          <HStack spacing={2}>
            <Text as='b'>Kiyoung</Text>
            <Text>·</Text>
            <Text>2025년 1월 14일</Text>
          </HStack>
          <HStack spacing={3} mr={2}>
            <Link to={getDynamicPath.postEdit(String(params.postId))}>
              <Text as='button' fontWeight='700'>
                수정
              </Text>
            </Link>
            <Text as='button' fontWeight='700'>
              삭제
            </Text>
          </HStack>
        </Flex>
        <HStack spacing={5} w='full' justify='space-between'>
          <Tag
            bg='none'
            color='custom.blue'
            borderRadius='20px'
            px={3}
            border='1.5px solid'
            borderColor='custom.blue'
          >
            <Text as='b'>백준</Text>
          </Tag>
          <Button
            variant='outline'
            px={3}
            bg='none'
            color={!isClicked ? '#FF0000' : 'customGray.400'}
            border='1.5px solid'
            borderRadius='xl'
            borderColor={!isClicked ? '#FF0000' : 'customGray.400'}
            _hover={{}}
            onClick={() => setIsClicked(!isClicked)}
          >
            <HStack spacing={1}>
              <HeartIcon size={20} fill={!isClicked ? '#FF0000' : '#8B939B'} />
              <Text as='b' fontSize='sm' ml={1}>
                좋아요
              </Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};
