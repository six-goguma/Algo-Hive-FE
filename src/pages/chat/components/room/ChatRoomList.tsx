import { Flex } from '@chakra-ui/react';

import { mockRooms } from '@pages/chat/mock/mockRooms';

import { ChatRoomListItem } from './ChatRoomListItem';

export const ChatRoomList = ({ onSelectRoom }: { onSelectRoom: (roomName: string) => void }) => {
  return (
    <Flex flexDir='column' w='full'>
      {mockRooms.map((room, index) => (
        <ChatRoomListItem
          key={index}
          roomName={room.roomName}
          onClick={() => onSelectRoom(room.roomName)}
        />
      ))}
    </Flex>
  );
};