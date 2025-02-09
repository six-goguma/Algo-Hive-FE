export type ChatRoom = {
  roomName: string;
};

export type ChatMessage = {
  sender: string;
  email: string;
  content: string;
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
  pageable: PaginationInfo;
  content: ChatRoom[]; // 실제 채팅방 목록
}

export type RequestChatRooms = {
  roomName: string;
};

export interface PaginationInfo {
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

export interface ResponseChatMessages {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
  sort: SortInfo;
  pageable: PaginationInfo;
  content: ChatMessage[];
}
