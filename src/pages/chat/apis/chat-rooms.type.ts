export type ChatRoom = {
  roomName: string;
};
export interface ResponseChatRooms {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
  sort: SortInfo;
  pageable: ChatRoomsPagination;
  content: ChatRoom[]; // 실제 채팅방 목록
}

export type RequestChatRooms = {
  roomName: string;
};

export interface ChatRoomsPagination {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  sort: SortInfo;
}

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export type ResponseChatMessage = {
  sender: string;
  content: string;
  roomName: string;
};
