import { useState } from 'react';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

import { useGetChatRooms } from '../../hooks';
import { ChatRoomList } from './ChatRoomList';

export const ChatRoomSection = () => {
  // 페이지네이션 상태
  const [page, setPage] = useState(0);
  const size = 10;
  const sort = 'createdAt,desc';

  // 채팅방 목록 가져오기
  const { data: chatRooms, isLoading, error } = useGetChatRooms(page, size, sort);

  return (
    <>
      <Flex w='full' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
          채팅방 목록
        </Text>
        <Button h='32px' w='120px'>
          채팅방 생성
        </Button>
      </Flex>
      <Box bg='custom.blue' h='3px' w='full' />
      <Box w='full' h='600px' bg='white' position='relative'>
        <ChatRoomList page={page} size={size} sort={sort} />
        <Flex justify='center' gap='12px' m={4} bottom='0'>
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            isDisabled={chatRooms?.first}
          >
            이전
          </Button>
          <p>{page + 1}</p>
          <Button onClick={() => setPage((prev) => prev + 1)} disabled={chatRooms?.last}>
            다음
          </Button>
        </Flex>
      </Box>
    </>
  );
};
