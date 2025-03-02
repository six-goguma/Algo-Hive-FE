import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Button, Text, useDisclosure } from '@chakra-ui/react';

import { RouterPath } from '@shared/constants';
import { useCustomToast } from '@shared/hooks';
import { BASE_URI, BASE_WS_URI } from '@shared/service';
import { authStorage } from '@shared/utils';

import { ChatRoomList, ChatRoomInside, ChatUserList } from '../components';
import { useGetChatRooms, useCreateChatRoom } from '../hooks';
import { Client } from '@stomp/stompjs';

export const ChatPage = () => {
  const [roomName, setRoomName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [messages, setMessages] = useState<{ sender: string; content: string; email: string }[]>(
    [],
  ); // 메세지 <- 총 메세지(rest + 소켓)
  const [socketMessages, setSocketMessages] = useState<
    { sender: string; content: string; email: string }[]
  >([]);
  const [newMessage, setNewMessage] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const [page, setPage] = useState(0);
  const size = 10;
  const sort = 'createdAt,desc';
  const { data: chatRooms, refetch } = useGetChatRooms(page, size, sort);

  const [usersInRooms, setUsersInRooms] = useState<{ userName: string; roomName: string }[]>([]); // 채팅방 사용자 목록
  const [roomUserList, setRoomUserList] = useState<{ [key: string]: number }>({}); // 각 방의 접속자 목록
  const [isComposing, setIsComposing] = useState(false); // IME 입력 상태 관리

  const messagesEndRef = useRef<HTMLDivElement>(null); // 채팅 메시지 스크롤 조작을 위한 Ref
  const messageListRef = useRef<HTMLDivElement>(null); // 메시지 목록 스크롤 조작을 위한 Ref
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagePage]);

  //새 메세지 추가 시 자동 스크롤
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

  useEffect(() => {
    connectToWebSocket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const connectToWebSocket = () => {
    if (stompClient) {
      stompClient.deactivate();
    }

    const client = new Client({
      brokerURL: `${BASE_WS_URI}/api/ws`,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('WebSocket에 연결되었습니다.');

        client.subscribe('/topic/users', (messageOutput) => {
          const userList = JSON.parse(messageOutput.body);
          setUsersInRooms(userList);
        });

        client.subscribe('/topic/room-users', (messageOutput) => {
          const roomUserList = JSON.parse(messageOutput.body);
          setRoomUserList(roomUserList);
        });

        client.publish({
          destination: '/api/app/chat/join',
          body: JSON.stringify({
            userName: userName,
            roomName: '채팅방 미접속',
          }),
        });
      },
      onStompError: (frame) => {
        console.error(`STOMP 오류: ${frame}`);
      },
    });

    client.activate();
    setStompClient(client);
  };

  const connectToChatRoom = () => {
    if (!roomName || !userName) return;

    if (stompClient) {
      stompClient.deactivate();
    }

    const client = new Client({
      brokerURL: `${BASE_WS_URI}/api/ws`,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log(`${roomName} 채팅방에 연결되었습니다.`);

        client.subscribe(`/topic/${roomName}`, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);

          message.content = message.content + ' ';

          setSocketMessages((prevMessages) => [message, ...prevMessages]);
          setMessages((prevMessages) => [message, ...prevMessages]);
        });

        client.subscribe('/topic/users', (messageOutput) => {
          const userList = JSON.parse(messageOutput.body);
          setUsersInRooms(userList);
        });

        client.subscribe('/topic/room-users', (messageOutput) => {
          const roomUserList = JSON.parse(messageOutput.body);
          setRoomUserList(roomUserList);
        });

        client.publish({
          destination: '/api/app/chat/join',
          body: JSON.stringify({ userName: userName, roomName }),
        });
      },
      onStompError: (frame) => {
        console.error(`STOMP 오류: ${frame}`);
      },
    });

    client.activate();
    setStompClient(client);
  };

  useEffect(() => {
    if (roomName) {
      setMessagePage(0);
      setMessages([]);
      fetchRecentMessages(roomName, 0);
      connectToChatRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName]);

  const handleSendMessage = () => {
    if (!stompClient || !stompClient.connected) {
      console.log('WebSocket 연결이 활성화되지 않았습니다.');
      return;
    }

    if (newMessage.trim()) {
      const messageRequest = {
        sender: userName,
        email,
        content: newMessage,
        roomName,
      };

      stompClient.publish({
        destination: `/api/app/chat/${roomName}`,
        body: JSON.stringify(messageRequest),
      });

      setNewMessage('');
    }
  };

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
        {/* 채팅방 목록 */}
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

        {/* 채팅방 */}
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

        {/* 현재 채팅방 사용자 목록 */}
        <ChatUserList usersInRooms={usersInRooms} />
      </Flex>
    </Flex>
  );
};
