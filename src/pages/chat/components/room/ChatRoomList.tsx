import { useState } from 'react';

import { Flex, Box, Text } from '@chakra-ui/react';

import { SubscribeRoomUsers } from '../../apis';
import { useGetChatRooms } from '../../hooks';
import { useChatRoomContext } from '../../hooks';
import { ChatRoomListItem } from './ChatRoomListItem';

type ChatRoomListProps = {
  page: number;
  size: number;
  sort: string;
};
export const ChatRoomList = ({ page, size, sort }: ChatRoomListProps) => {
  const { setIsEntered, selectedRoom, setSelectedRoom } = useChatRoomContext();

  // 채팅방 목록 가져오기
  const { data: chatRooms, isLoading, error } = useGetChatRooms(page, size, sort);

  // 채팅방별 접속자 수 구독
  const roomUsers = SubscribeRoomUsers();

  const handleSelect = (roomName: string) => {
    setSelectedRoom(roomName);
    setIsEntered(false);
  };

  return (
    <Flex flexDir='column' w='full' h='full'>
      {/* 채팅방 목록 */}
      <Box flex='1' overflowY='auto'>
        {isLoading && <Text textAlign='center'>🔄 로딩 중...</Text>}
        {error && <Text textAlign='center'>❌ 오류 발생: {error.message}</Text>}
        {chatRooms?.content.map((room, index) => (
          <ChatRoomListItem
            key={index}
            roomName={room.roomName}
            currentUsers={roomUsers[room.roomName] || 0}
            onClick={() => handleSelect(room.roomName)}
            isSelected={selectedRoom === room.roomName}
          />
        ))}
      </Box>
    </Flex>
  );
};
