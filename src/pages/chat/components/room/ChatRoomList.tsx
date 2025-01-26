import { useState } from 'react';

import { Flex } from '@chakra-ui/react';

import { MOCK_ROOMS } from '@pages/chat/mock/mockRooms';

import { ChatRoomListItem } from './ChatRoomListItem';

export const ChatRoomList = ({ onSelectRoom }: { onSelectRoom: (roomName: string) => void }) => {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const handleSelect = (roomName: string) => {
    onSelectRoom(roomName);
    setSelectedRoom(roomName);
  };
  return (
    <Flex flexDir='column' w='full'>
      {MOCK_ROOMS.map((room, index) => (
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
