import { useState } from 'react';

import { Flex } from '@chakra-ui/react';

import { MOCK_ROOMS } from '../../mock';
import { ChatRoomListItem } from './ChatRoomListItem';

type ChatRoomListProps = {
  onSelectRoom: (roomName: string) => void;
};

export const ChatRoomList = ({ onSelectRoom }: ChatRoomListProps) => {
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
          currentUsers={room.currentUsers}
          onClick={() => handleSelect(room.roomName)}
          isSelected={selectedRoom === room.roomName}
        />
      ))}
    </Flex>
  );
};
