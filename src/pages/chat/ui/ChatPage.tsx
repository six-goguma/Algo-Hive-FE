import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Button, Text, useDisclosure } from '@chakra-ui/react';

import { RouterPath } from '@shared/constants';
import { useCustomToast } from '@shared/hooks';
import { BASE_URI } from '@shared/service';
import {
  connectWebSocket,
  disconnectWebSocket,
  subsribeToNoRoom,
  subscribeToRoom,
  unsubscribeFromRoom,
  sendMessage as sendMessageViaWebSocket,
  subscribeToAllUsers,
  subscribeToRoomUsers,
} from '@shared/service';
import { authStorage } from '@shared/utils';

import { ChatRoomList, ChatRoomInside, ChatUserList } from '../components';
import { useGetChatRooms, useCreateChatRoom } from '../hooks';

export const ChatPage = () => {
  const [page, setPage] = useState(0);
  const size = 10;
  const sort = 'createdAt,desc';
  const { data: chatRooms, refetch } = useGetChatRooms(page, size, sort);

  const [roomName, setRoomName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [messages, setMessages] = useState<{ sender: string; content: string; email: string }[]>(
    [],
  );
  const [socketMessages, setSocketMessages] = useState<
    { sender: string; content: string; email: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState('');
  const [usersInRooms, setUsersInRooms] = useState<{ userName: string; roomName: string }[]>([]);
  const [roomUserList, setRoomUserList] = useState<{ [key: string]: number }>({});
  const [isComposing, setIsComposing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageListRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: createRoom } = useCreateChatRoom();

  const customToast = useCustomToast();
  const [messagePage, setMessagePage] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [userName, setUserName] = useState(authStorage.nickName.get());

  const [email, setEmail] = useState(authStorage.email.get());

  useEffect(() => {
    setUserName(authStorage.nickName.get());
    setEmail(authStorage.email.get());
  }, []);

  const fetchRecentMessages = async (roomName: string, pageNumber: number) => {
    try {
      const encodedRoomName = encodeURIComponent(roomName);
      const response = await fetch(
        `${BASE_URI}/chat/messages/${encodedRoomName}?page=${pageNumber}&size=10&sort=chatTime,asc`,
      );
      if (response.ok) {
        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, ...data.content]);
        setHasMoreMessages(!data.last);
      } else {
        console.error('최근 메시지 가져오기 실패');
      }
    } catch (error) {
      console.error('최근 메시지 가져오는 중 오류 발생:', error);
    }
  };

  const handleMessageListScroll = useCallback(() => {
    if (messageListRef.current) {
      const { scrollTop } = messageListRef.current;

      if (scrollTop === 0 && hasMoreMessages) {
        setMessagePage((prevPage) => prevPage + 1);

        setTimeout(() => {
          if (messageListRef.current) {
            messageListRef.current.scrollTop = 50;
          }
        }, 0);
      }
    }
  }, [hasMoreMessages]);

  useEffect(() => {
    const messagesContainer = messageListRef.current;
    if (messagesContainer) {
      (messagesContainer as HTMLElement).addEventListener('scroll', handleMessageListScroll);
      return () =>
        (messagesContainer as HTMLElement).removeEventListener('scroll', handleMessageListScroll);
    }
  }, [handleMessageListScroll]);

  useEffect(() => {
    if (roomName && messagePage > 0) {
      fetchRecentMessages(roomName, messagePage);
    }
  }, [messagePage, roomName]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [socketMessages]);

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) return;
    createRoom({ roomName: newRoomName });
    setRoomName('');
    onClose();
    customToast({
      toastStatus: 'success',
      toastTitle: '성공!',
      toastDescription: '채팅방이 생성되었습니다.',
    });

    setTimeout(() => refetch(), 500);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageRequest = {
      sender: userName,
      email,
      content: newMessage,
      roomName,
    };

    sendMessageViaWebSocket(roomName, messageRequest);
    setNewMessage('');
  };

  useEffect(() => {
    connectWebSocket(() => {
      subsribeToNoRoom();
      subscribeToAllUsers((userList) => {
        setUsersInRooms(userList);
      });

      subscribeToRoomUsers((roomUserList) => {
        setRoomUserList(roomUserList);
      });
    });

    return () => {
      disconnectWebSocket();
    };
  }, []);

  useEffect(() => {
    if (roomName) {
      setMessagePage(0);
      setMessages([]);
      fetchRecentMessages(roomName, 0);
      disconnectWebSocket();
      connectWebSocket(() => {
        subscribeToAllUsers((userList) => {
          setUsersInRooms(userList);
        });

        subscribeToRoomUsers((roomUserList) => {
          setRoomUserList(roomUserList);
        });

        subscribeToRoom(roomName, (message) => {
          setSocketMessages((prevMessages) => [message, ...prevMessages]);
          setMessages((prevMessages) => [message, ...prevMessages]);
        });
      });

      return () => {
        unsubscribeFromRoom(roomName);
        disconnectWebSocket();
      };
    }
  }, [roomName]);

  return (
    <Flex flexDir='column' alignItems='center' w='full' h='full'>
      <Button
        mt='40px'
        mb='10px'
        size='sm'
        colorScheme='blue'
        variant='outline'
        alignSelf='flex-end'
        onClick={() => navigate(RouterPath.MAIN)}
      >
        게시글 보기
      </Button>
      <Flex flexDir={{ base: 'column', sm: 'row' }} w='full' gap='35px' h='full'>
        <Text display={{ base: 'block', sm: 'none' }} mt='10px' fontSize='sm' color='gray.600'>
          밑으로 스크롤하면 채팅과 현재 접속자 목록을 볼 수 있어요
        </Text>
        <ChatRoomList
          chatRooms={chatRooms}
          roomName={roomName}
          setRoomName={setRoomName}
          onOpen={onOpen}
          roomUserList={roomUserList}
          setPage={setPage}
          page={page}
          isFirstPage={chatRooms?.first}
          isLastPage={chatRooms?.last}
          handleCreateRoom={handleCreateRoom}
          newRoomName={newRoomName}
          setNewRoomName={setNewRoomName}
          isOpen={isOpen}
          onClose={onClose}
        />
        <ChatRoomInside
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
          messagesEndRef={messagesEndRef}
          messageListRef={messageListRef}
          socketMessages={socketMessages}
          email={email}
          userName={userName}
          roomName={roomName}
          isComposing={isComposing}
          setIsComposing={setIsComposing}
          handleMessageListScroll={handleMessageListScroll}
        />
        <ChatUserList usersInRooms={usersInRooms} />
      </Flex>
    </Flex>
  );
};
