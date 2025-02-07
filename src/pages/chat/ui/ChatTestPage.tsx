import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Flex,
  Button,
  Box,
  Text,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  InputGroup,
  InputRightElement,
  Avatar,
} from '@chakra-ui/react';

import { SendHorizontal } from 'lucide-react';

import { RouterPath } from '@shared/constants';
import { useCustomToast } from '@shared/hooks';

import { useGetChatRooms, useCreateChatRoom } from '../hooks';
import { Client } from '@stomp/stompjs';

const BASE_API_URL = 'http://algo.knu-soft.site'; // REST API 기본 URL
const BASE_WS_URL = 'ws://algo.knu-soft.site'; // WebSocket 기본 URL

export const ChatTestPage = () => {
  const username = '고양이는 멍멍'; // 사용자 이름
  const [roomName, setRoomName] = useState(''); // 현재 접속 중인 채팅방 이름
  const [newRoomName, setNewRoomName] = useState(''); // 새 채팅방 이름 입력 상태
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]); // 채팅 메시지 리스트
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
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: createRoom } = useCreateChatRoom();
  const customToast = useCustomToast();

  // 🚀 **새 메시지 추가 시 자동 스크롤**
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
      setMessages([]); // 메시지 목록 초기화
      connectToChatRoom();
    }
  }, [roomName]);

  // 사용자 이름 설정 시 WebSocket 연결 초기화
  useEffect(() => {
    if (username) {
      connectToWebSocket();
    }
  }, [username]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (!stompClient || !stompClient.connected) {
      console.log('WebSocket 연결이 활성화되지 않았습니다.');
      return;
    }

    if (newMessage.trim()) {
      const messageRequest = {
        sender: username,
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
      <Flex w='full' gap='35px' h='full'>
        {/* 채팅방 목록 */}
        <Box w='40%' bg='#F7F9FB'>
          <Flex w='full' justify='center'>
            <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
              채팅방 목록
            </Text>

            <Button h='32px' w='120px' colorScheme='blue' onClick={onOpen}>
              채팅방 생성
            </Button>
          </Flex>

          <Box bg='custom.blue' h='3px' w='full' />
          <Box w='full' h='600px' bg='white' position='relative'>
            <Flex flexDir='column' w='full' h='full' pt='10px'>
              {chatRooms?.content.map((room, index) => (
                <Flex
                  key={index}
                  w='full'
                  gap='20px'
                  h='60px'
                  align='center'
                  p='0 20px 0 20px'
                  bg={roomName === room.roomName ? '#E8EFFC' : 'transparent'}
                  _hover={{ bg: '#E8EFFC' }}
                  cursor='pointer'
                  onClick={() => {
                    setRoomName(room.roomName);
                    setMessages([]);
                  }}
                  justify='space-between'
                >
                  <Text
                    fontSize='14px'
                    fontWeight='bold'
                    noOfLines={2} // ✅ 2줄까지 표시
                    overflow='hidden'
                    textOverflow='ellipsis'
                    wordBreak='break-word'
                  >
                    {room.roomName}
                  </Text>

                  {roomUserList[room.roomName] ? (
                    <Box boxSize='24px' bg='custom.blue' borderRadius='5px' alignContent='center'>
                      <Text fontSize='12px' fontWeight='bold' color='white' ml='auto'>
                        {roomUserList[room.roomName]}
                      </Text>
                    </Box>
                  ) : (
                    <Box
                      boxSize='24px'
                      bg='customGray.400'
                      borderRadius='5px'
                      alignContent='center'
                    >
                      <Text fontSize='12px' fontWeight='bold' color='white' ml='auto'>
                        0
                      </Text>
                    </Box>
                  )}
                </Flex>
              ))}
            </Flex>
          </Box>

          <Flex justify='center' gap='12px' m={4} bottom='0'>
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              isDisabled={chatRooms?.first}
            >
              이전
            </Button>
            <Text>{page + 1}</Text>
            <Button onClick={() => setPage((prev) => prev + 1)} isDisabled={chatRooms?.last}>
              다음
            </Button>
          </Flex>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>채팅방 생성</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder='채팅방 이름 입력'
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter display='flex' justifyContent='center'>
                <Button h='32px' w='100px' colorScheme='blue' onClick={handleCreateRoom}>
                  생성하기
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        {/* 채팅방 */}
        <Box w='70%' bg='#F7F9FB'>
          {roomName && (
            <>
              <Box w='full' h='36px'>
                <Text
                  w='full'
                  textAlign='left'
                  fontSize='24px'
                  color='custom.blue'
                  fontWeight={700}
                >
                  {roomName || ''}
                </Text>
              </Box>
              <Box bg='custom.blue' h='3px' w='full' />
              <Box w='full' h='549px' overflowY='auto' className='relative'>
                {messages
                  .slice()
                  .reverse()
                  .map((message, index) => (
                    <Box
                      w='full'
                      h={!(message.sender == username) ? '72px' : '44px'}
                      mt='10px'
                      position='relative'
                      key={index}
                    >
                      <Flex
                        h='full'
                        gap='7px'
                        pl={!(message.sender == username) ? '8px' : undefined} // 타인 메세지
                        pr={message.sender == username ? '8px' : undefined}
                        position='absolute'
                        top='0'
                        left={!(message.sender == username) ? '0' : undefined} // 타인 메세지일 경우 왼쪽
                        right={message.sender == username ? '0' : undefined} // 본인 메세지일 경우 오른쪽
                        justifyContent={message.sender == username ? 'flex-end' : 'flex-start'}
                      >
                        {/* 유저 아이콘 */}
                        {!(message.sender == username) && <Avatar boxSize='36px' />}
                        <Flex
                          w='full'
                          h='full'
                          flexDir='column'
                          align={message.sender == username ? 'flex-end' : 'flex-start'}
                        >
                          {!(message.sender == username) && (
                            <Text
                              w='full'
                              textAlign={message.sender == username ? 'right' : 'left'}
                              fontSize='12px'
                              fontWeight='semibold'
                              mb='2px'
                            >
                              {message.sender}
                            </Text>
                          )}
                          <Box
                            w='auto'
                            h='44px'
                            p='10px'
                            bg={message.sender == username ? '#9BD9FF' : 'white'}
                            fontSize='14px'
                            borderRadius='5px'
                            alignContent='center'
                          >
                            {message.content}
                          </Box>
                        </Flex>
                      </Flex>
                    </Box>
                  ))}
                <div ref={messagesEndRef} />
              </Box>

              <InputGroup
                border='1.5px solid custom.blue'
                h='36px'
                mt='8px'
                alignItems='center'
                w='full'
              >
                <Input
                  size='md'
                  type='text'
                  variant='ghost'
                  colorScheme='blue'
                  placeholder='메세지를 입력해 주세요.'
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)} // 메시지 상태 업데이트
                  onCompositionStart={() => setIsComposing(true)} // IME 입력 시작
                  onCompositionEnd={() => setIsComposing(false)} // IME 입력 종료
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isComposing) {
                      e.preventDefault(); // 엔터 키의 기본 동작 방지
                      handleSendMessage();
                    }
                  }}
                />
                <InputRightElement h='full'>
                  <Button
                    variant='outline'
                    size='40px'
                    border='none'
                    bg='white'
                    onClick={handleSendMessage}
                    _hover={{}}
                  >
                    <SendHorizontal size={20} color='#0076BF' />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </>
          )}
        </Box>

        {/* 현재 채팅방 사용자 목록 */}
        <Box w='36%' bg='#F7F9FB'>
          <Flex w='full' h='36px' justify='center'>
            <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
              현재 접속자
            </Text>
          </Flex>
          <Box bg='custom.blue' h='3px' w='full' />
          <Box w='full' h='600px' bg='white' overflowY='auto'>
            <Flex flexDir='column' w='full' pt='10px'>
              {usersInRooms.map((user, index) => (
                <Flex key={index} w='full' h='56px' align='center' pl='20px' gap='10px'>
                  <Avatar boxSize='24px' />
                  <Text
                    w='full'
                    fontSize='14px'
                    fontWeight='extrabold'
                    noOfLines={2} // ✅ 2줄까지 표시
                    overflow='hidden'
                    textOverflow='ellipsis'
                    wordBreak='break-word'
                    textAlign='left'
                  >
                    {user.userName}
                  </Text>
                  {user.roomName === '채팅방 미접속' ? (
                    <Text
                      fontSize='14px'
                      w='full'
                      fontWeight='medium'
                      color='gray'
                      justifySelf='flex-end'
                      pr='10px'
                      noOfLines={2} // ✅ 2줄까지 표시
                      overflow='hidden'
                      textOverflow='ellipsis'
                      wordBreak='break-word'
                    >
                      {user.roomName}
                    </Text>
                  ) : (
                    <Text
                      fontSize='14px'
                      w='full'
                      fontWeight='medium'
                      justifySelf='flex-end'
                      pr='10px'
                      noOfLines={2} // ✅ 2줄까지 표시
                      overflow='hidden'
                      textOverflow='ellipsis'
                      wordBreak='break-word'
                    >
                      {user.roomName}
                    </Text>
                  )}
                </Flex>
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};
