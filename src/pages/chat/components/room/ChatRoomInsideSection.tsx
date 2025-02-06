import { useState, useEffect, useRef, useCallback } from 'react';

import { Box, Text, Button, Spinner } from '@chakra-ui/react';

import { connectWebSocket, disconnectWebSocket } from '@shared/service';

import { joinChatRoom } from '../../apis';
import { useChatRoomContext, useGetChatMessages } from '../../hooks';
import { ChatInputBox } from '../input';
import { ChatMessageList } from '../message';

export const ChatRoomInsideSection = () => {
  const { isEntered, setIsEntered, selectedRoom } = useChatRoomContext();
  const [userNickname, setUserNickname] = useState(localStorage.getItem('userNickname') || '');

  const size = 10;
  const sort = 'chatTime,desc';

  const {
    messages: allMessages,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetChatMessages(selectedRoom || '', size, sort);

  useEffect(() => {
    if (isEntered && selectedRoom) {
      console.log(`🔄 채팅방 변경됨: ${selectedRoom}, 기존 소켓 연결 해제 후 재연결`);

      // 1️⃣ 기존 연결 해제
      disconnectWebSocket();

      // 2️⃣ 새로운 웹소켓 연결 후 채팅방 입장
      connectWebSocket(
        () => {
          console.log(`✅ WebSocket 재연결 완료, 채팅방 입장: ${selectedRoom}`);
          joinChatRoom(userNickname, selectedRoom);
        },
        (error) => {
          console.error('WebSocket 연결 오류:', error);
        },
      );
    }
  }, [isEntered, userNickname, selectedRoom]);
  // 스크롤 이벤트 핸들러
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

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

  // 이전 메시지 로딩 후 스크롤 위치 유지
  useEffect(() => {
    if (messagesEndRef.current && prevScrollHeight) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight - prevScrollHeight;
    }
  }, [allMessages]);

  // 새로운 메시지가 추가될 때 스크롤을 부드럽게 유지하면서 조금 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current && isAutoScroll) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight - 50,
        behavior: 'smooth',
      });
    }
  }, [allMessages, isAutoScroll]);

  // 메시지 전송 함수
  const handleSendMessage = (content: string) => {
    if (!selectedRoom) {
      console.error('No room selected');
      return;
    }
    const newMessage = { sender: userNickname, content, roomName: selectedRoom };
    sendMessage(`/api/app/chat/${selectedRoom}`, newMessage);
  };

  useEffect(() => {
    const storedNickname = localStorage.getItem('userNickname') || '';
    setUserNickname(storedNickname);
  }, []);

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
        <ChatMessageList messages={allMessages} userNickname={userNickname} />
      </Box>
      {isEntered ? (
        <ChatInputBox onSendMessage={handleSendMessage} />
      ) : (
        <Button mt='15px' h='36px' w='120px' onClick={() => setIsEntered(true)}>
          채팅방 입장하기
        </Button>
      )}
    </>
  );
};
