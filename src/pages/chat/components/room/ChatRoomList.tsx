import { useState } from 'react';

import { Flex } from '@chakra-ui/react';

import { mockRooms } from '@pages/chat/mock/mockRooms';

import { ChatRoomListItem } from './ChatRoomListItem';

export const ChatRoomList = ({ onSelectRoom }: { onSelectRoom: (roomName: string) => void }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const handleSelect = (roomName: string) => {
    onSelectRoom(roomName); // 선택된 채팅방 업데이트
    setSelectedRoom(roomName); // 선택된 채팅방 업데이트
  };
  return (
    <Flex flexDir='column' w='full'>
      {mockRooms.map((room, index) => (
        <ChatRoomListItem
          key={index}
          roomName={room.roomName}
          onClick={() => handleSelect(room.roomName)}
          isSelected={selectedRoom === room.roomName}
        />
      ))}
    </Flex>
  );
};