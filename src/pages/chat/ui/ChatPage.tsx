import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Button, Text, useDisclosure } from '@chakra-ui/react';

import { RouterPath } from '@shared/constants';
import { useCustomToast } from '@shared/hooks';

import { ChatRoomList, ChatRoomInside, ChatUserList } from '../components';
import { useGetChatRooms, useCreateChatRoom, useGetChatMessages } from '../hooks';
import { Client } from '@stomp/stompjs';

const BASE_API_URL = 'http://algo.knu-soft.site'; // REST API 기본 URL
const BASE_WS_URL = 'ws://algo.knu-soft.site'; // WebSocket 기본 URL

export const ChatPage = () => {
  const username = 'changedNickName'; // 사용자 이름
  const email = 'test1@email.com';
  const [roomName, setRoomName] = useState(''); // 현재 접속 중인 채팅방 이름
  const [newRoomName, setNewRoomName] = useState(''); // 새 채팅방 이름 입력 상태
  const [messages, setMessages] = useState<{ sender: string; content: string; email: string }[]>(
    [],
  ); // 메세지 <- 총 메세지(rest + 소켓)
  const [socketMessages, setSocketMessages] = useState<
    { sender: string; email: string; content: string }[]
  >([]); // 메세지
  const [newMessage, setNewMessage] = useState(''); // 새로 작성 중인 메시지 상태
  const [stompClient, setStompClient] = useState<Client | null>(null); // WebSocket 연결 객체

  // 채팅방 목록 가져오기
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

  const [messagePage, setMessagePage] = useState(0); // 채팅 메시지 페이지
  const [hasMoreMessages, setHasMoreMessages] = useState(true); // 더 불러올 메시지가 있는지 여부

  // 특정 채팅방의 최근 메시지 가져오기
  const fetchRecentMessages = async (roomName, pageNumber) => {
    try {
      const encodedRoomName = encodeURIComponent(roomName);
      const response = await fetch(
        `${BASE_API_URL}/api/v1/chat/messages/${encodedRoomName}?page=${pageNumber}&size=10&sort=chatTime,asc`,
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

  // 채팅 메시지 스크롤 이벤트 핸들러
  const handleMessageListScroll = useCallback(() => {
    if (messageListRef.current) {
      const { scrollTop } = messageListRef.current;

      if (scrollTop === 0 && hasMoreMessages) {
        setMessagePage((prevPage) => prevPage + 1);

        setTimeout(() => {
          if (messageListRef.current) {
            messageListRef.current.scrollTop = 50; // 예: 50px만큼 아래로 내림
          }
        }, 0);
      }
    }
  }, [hasMoreMessages]);

  // 🚀 **스크롤 이벤트 핸들러 (무한 스크롤)**
  //   const handleScroll = useCallback(() => {
  //     if (messageListRef.current) {
  //       const { scrollTop } = messageListRef.current;

  //       // 스크롤이 맨 위에 닿았을 때 이전 메시지 페칭
  //       if (scrollTop === 0 && hasNextPage && !isMessagesLoading) {
  //         fetchNextPage();

  //         // 페칭 후 스크롤 위치를 약간 아래로 내림
  //         setTimeout(() => {
  //           if (messageListRef.current) {
  //             messageListRef.current.scrollTop = 50; // 예: 50px만큼 아래로 내림
  //           }
  //         }, 0);
  //       }
  //     }
  //   }, [fetchNextPage, hasNextPage, isMessagesLoading]);

  useEffect(() => {
    const messagesContainer = messageListRef.current;
    if (messagesContainer) {
      (messagesContainer as HTMLElement).addEventListener('scroll', handleMessageListScroll);
      return () =>
        (messagesContainer as HTMLElement).removeEventListener('scroll', handleMessageListScroll);
    }
  }, [handleMessageListScroll]);

  // 메시지 페이지 변경 시 추가 메시지 불러오기
  useEffect(() => {
    if (roomName && messagePage > 0) {
      fetchRecentMessages(roomName, messagePage);
    }
  }, [messagePage]);
  // **새 메시지 추가 시 자동 스크롤**
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

    // 🚀 채팅방 생성 후 즉시 데이터 새로고침
    setTimeout(() => refetch(), 500);
  };

  useEffect(() => {
    connectToWebSocket();
  }, []);

  // WebSocket 연결 설정 및 사용자 이름 등록
  const connectToWebSocket = () => {
    if (stompClient) {
      stompClient.deactivate(); // 기존 WebSocket 연결 종료
    }

    const client = new Client({
      brokerURL: `${BASE_WS_URL}/api/ws`,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('WebSocket에 연결되었습니다.');

        // 사용자 목록 주제 구독
        client.subscribe('/topic/users', (messageOutput) => {
          const userList = JSON.parse(messageOutput.body);
          setUsersInRooms(userList);
        });

        // 방별 사용자 목록 주제 구독
        client.subscribe('/topic/room-users', (messageOutput) => {
          const roomUserList = JSON.parse(messageOutput.body);
          setRoomUserList(roomUserList);
        });

        // 사용자 입장 상태 전송 (미접속 상태)
        client.publish({
          destination: '/api/app/chat/join',
          body: JSON.stringify({
            userName: username,
            roomName: '채팅방 미접속',
          }),
        });
      },
      onStompError: (frame) => {
        console.error(`STOMP 오류: ${frame}`);
      },
    });

    client.activate();
    setStompClient(client); // WebSocket 클라이언트 상태 업데이트
  };

  // 특정 채팅방에 연결
  const connectToChatRoom = () => {
    if (!roomName || !username) return;

    if (stompClient) {
      stompClient.deactivate(); // 기존 연결 종료
    }

    const client = new Client({
      brokerURL: `${BASE_WS_URL}/api/ws`,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log(`${roomName} 채팅방에 연결되었습니다.`);

        // 채팅방 메시지 구독
        client.subscribe(`/topic/${roomName}`, (messageOutput) => {
          const message = JSON.parse(messageOutput.body);

          // 메시지 본문 뒤에 공백 추가
          message.content = message.content + ' ';

          // 메시지를 상태에 저장
          setSocketMessages((prevMessages) => [message, ...prevMessages]);
          setMessages((prevMessages) => [message, ...prevMessages]);
        });

        // 사용자 목록 구독
        client.subscribe('/topic/users', (messageOutput) => {
          const userList = JSON.parse(messageOutput.body);
          setUsersInRooms(userList); // 사용자와 방 정보 업데이트
        });

        client.subscribe('/topic/room-users', (messageOutput) => {
          const roomUserList = JSON.parse(messageOutput.body);
          setRoomUserList(roomUserList);
        });

        // 사용자 입장 정보 서버에 전송
        client.publish({
          destination: '/api/app/chat/join',
          body: JSON.stringify({ userName: username, roomName }),
        });
      },
      onStompError: (frame) => {
        console.error(`STOMP 오류: ${frame}`);
      },
    });

    client.activate();
    setStompClient(client);
  };

  // 채팅방 이름 변경 시 메시지와 연결 초기화
  useEffect(() => {
    if (roomName) {
      setMessagePage(0); // 메시지 페이지 초기화
      setMessages([]); // 메시지 목록 초기화
      fetchRecentMessages(roomName, 0);
      connectToChatRoom();
    }
  }, [roomName]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (!stompClient || !stompClient.connected) {
      console.log('WebSocket 연결이 활성화되지 않았습니다.');
      return;
    }

    if (newMessage.trim()) {
      const messageRequest = {
        sender: username,
        email,
        content: newMessage,
        roomName,
      };

      stompClient.publish({
        destination: `/api/app/chat/${roomName}`,
        body: JSON.stringify(messageRequest),
      });

      setNewMessage(''); // 입력 필드 초기화
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
