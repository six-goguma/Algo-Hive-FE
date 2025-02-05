import { useState, useEffect } from 'react';

import { getChatMessages, ResponseChatMessages, ChatMessage } from '../apis';
import { useQuery } from '@tanstack/react-query';

const chatMessagesQueryKey = (roomName: string) => ['chatMessages', roomName];

export const useGetChatMessages = (
  roomName: string,
  size: number = 10,
  sort: string = 'chatTime,desc',
) => {
  const [page, setPage] = useState(0);
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);

  const { data, isLoading, error } = useQuery<ResponseChatMessages>({
    queryKey: [...chatMessagesQueryKey(roomName), page],
    queryFn: () => getChatMessages(roomName, page, size, sort),
    enabled: !!roomName,
  });

  // data가 변경될 때마다 메시지 리스트 업데이트
  useEffect(() => {
    if (data) {
      setAllMessages((prevMessages) => [...prevMessages, ...data.content]);
    }
  }, [data]);

  // 다음 페이지 불러오기
  const fetchNextPage = () => {
    if (data && !data.last) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return {
    messages: allMessages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage: data ? !data.last : false,
  };
};
