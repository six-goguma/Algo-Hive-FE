import { Flex } from '@chakra-ui/react';

import { useChatRoomContext } from '../../hooks';
import { MOCK_ROOMS } from '../../mock';
import { ChatRoomListItem } from './ChatRoomListItem';

export const ChatRoomList = () => {
  const { setIsEntered, selectedRoom, setSelectedRoom } = useChatRoomContext();
  const handleSelect = (roomName: string) => {
    setSelectedRoom(roomName);
    setIsEntered(false);
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
