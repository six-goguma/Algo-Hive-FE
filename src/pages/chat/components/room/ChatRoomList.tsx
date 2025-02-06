//electedRoom이 변경될 때마다 소켓 연결이 재설정되고, 채팅방별 접속인원 목록도 자동으로 구독하는 코드
import { Flex, Box, Text } from '@chakra-ui/react';

import { useGetChatRooms } from '../../hooks';
import { useChatRoomContext } from '../../hooks';
import { ChatRoomListItem } from './ChatRoomListItem';

type ChatRoomListProps = {
  page: number;
  size: number;
  sort: string;
};

export const ChatRoomList = ({ page, size, sort }: ChatRoomListProps) => {
  const { selectedRoom, setSelectedRoom, roomUsers } = useChatRoomContext();

  // 채팅방 목록 가져오기
  const { data: chatRooms, isLoading, error } = useGetChatRooms(page, size, sort);

  const handleSelect = (roomName: string) => {
    setSelectedRoom(roomName);
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
            currentUsers={roomUsers[room.roomName] || 0} // 채팅방별 접속인원 표시
            onClick={() => handleSelect(room.roomName)}
            isSelected={selectedRoom === room.roomName}
          />
        ))}
      </Box>
    </Flex>
  );
};
