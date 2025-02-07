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
  const [isFetching, setIsFetching] = useState(false); // 이전 메시지 불러오기 중인지 여부

  // REST API로 이전 메시지 불러오기
  const { data, isLoading, error } = useQuery<ResponseChatMessages>({
    queryKey: [...chatMessagesQueryKey(roomName), page],
    queryFn: () => getChatMessages(roomName, page, size, sort),
    enabled: !!roomName,
  });

  useEffect(() => {
    if (data) {
      // 이전 메시지를 불러올 때는 배열의 맨 뒤에 추가
      setAllMessages((prevMessages) => [...prevMessages, ...data.content]);
      setIsFetching(false); // 페칭 완료
    }
  }, [data]);

  // 채팅방이 변경되면 메시지 초기화
  useEffect(() => {
    setAllMessages([]);
    setPage(0);
  }, [roomName]);

  // 다음 페이지 불러오기 (이전 메시지)
  const fetchNextPage = () => {
    if (data && !data.last && !isFetching) {
      setIsFetching(true); // 페칭 시작
      setPage((prevPage) => prevPage + 1);
    }
  };

  return {
    messages: allMessages,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage: data ? !data.last : false,
    isFetching,
  };
};
