import { useState, useEffect, useRef, useCallback } from 'react';

import { Box, Text, Spinner } from '@chakra-ui/react';

import { ChatMessage } from '../../apis';
import { useChatRoomContext, useGetChatMessages } from '../../hooks';
import { ChatInputBox } from '../input';
import { ChatMessageList } from '../message';

export const ChatRoomInsideSection = () => {
  const { selectedRoom } = useChatRoomContext();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userNickname] = useState(localStorage.getItem('userNickname') || '프테');

  const size = 10;
  const sort = 'chatTime,desc';

  const {
    messages: fetchedMessages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetChatMessages(selectedRoom || '', size, sort);

  // 스크롤 관련
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  // 🚀 **스크롤 이벤트 핸들러 (무한 스크롤)**
  const handleScroll = useCallback(() => {
    if (messagesEndRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesEndRef.current;
      const isNearTop = scrollTop < 100;

      if (isNearTop && hasNextPage && !isLoading) {
        setPrevScrollHeight(scrollHeight);
        fetchNextPage();
      }

      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 100;
      setIsAutoScroll(isNearBottom);
    }
  }, [fetchNextPage, hasNextPage, isLoading]);

  useEffect(() => {
    const messagesContainer = messagesEndRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll);
      return () => messagesContainer.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // 🚀 **REST API에서 가져온 메시지 적용**
  useEffect(() => {
    if (fetchedMessages.length > 0) {
      setMessages((prevMessages) => {
        // 중복 메시지 제거
        const uniqueMessages = fetchedMessages.filter(
          (newMsg) => !prevMessages.some((prevMsg) => prevMsg.content === newMsg.content),
        );
        return [...uniqueMessages, ...prevMessages]; // 새로운 메시지를 위에 추가
      });
    }
  }, [fetchedMessages]);

  // 🚀 **이전 메시지 로딩 후 스크롤 유지**
  useEffect(() => {
    if (messagesEndRef.current && prevScrollHeight) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight - prevScrollHeight;
    }
  }, [messages]);

  // 🚀 **새 메시지 추가 시 자동 스크롤**
  useEffect(() => {
    if (messagesEndRef.current && isAutoScroll) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight - 50,
        behavior: 'smooth',
      });
    }
  }, [messages, isAutoScroll]);

  return (
    <>
      <Box w='full' h='36px'>
        <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
          {selectedRoom || ''}
        </Text>
      </Box>
      <Box bg='custom.blue' h='3px' w='full' />
      <Box w='full' h='549px' overflowY='auto' ref={messagesEndRef} className='relative'>
        {isLoading && hasNextPage && (
          <Box className='absolute top-0 left-0 right-0 flex items-center justify-center h-10'>
            <Spinner size='sm' />
          </Box>
        )}
        <ChatMessageList messages={messages} userNickname={userNickname} />
      </Box>

      <ChatInputBox />
    </>
  );
};
