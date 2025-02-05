export type ResponseChatRooms = {
  roomName: string;
};

export type RequestChatRooms = {
  roomName: string;
};

export type ResponseChatMessage = {
  sender: string;
  content: string;
  roomName: string;
};
