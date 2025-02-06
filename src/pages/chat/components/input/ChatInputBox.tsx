import { useState, useEffect } from 'react';

import { InputGroup, InputRightElement, Button, Input } from '@chakra-ui/react';

import { SendHorizontal } from 'lucide-react';

import { sendMessage } from '@shared/service';

import { useChatRoomContext } from '../../hooks';

export const ChatInputBox = () => {
  const [message, setMessage] = useState('');
  const { selectedRoom } = useChatRoomContext();
  const [isComposing, setIsComposing] = useState(false); // IME 입력 상태 관리
  const [userNickname, setUserNickname] = useState('');

  // 닉네임을 로컬 스토리지에서 가져오기
  useEffect(() => {
    const storedNickname = localStorage.getItem('userNickname') || '익명';
    setUserNickname(storedNickname);
  }, []);

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || !selectedRoom) return;

    // API 명세에 맞는 메시지 객체 생성
    const messageObject = {
      sender: userNickname, // 로컬에서 가져온 닉네임 사용
      content: trimmedMessage,
      roomName: selectedRoom,
    };

    // WebSocket을 통해 메시지 송신
    sendMessage(`/api/app/chat/${selectedRoom}`, messageObject);

    setMessage('');
  };

  return (
    <InputGroup border='1.5px solid custom.blue' h='36px' mt='8px' alignItems='center' w='full'>
      <Input
        size='md'
        type='text'
        variant='ghost'
        colorScheme='blue'
        placeholder='메세지를 입력해 주세요.'
        value={message}
        onChange={(e) => setMessage(e.target.value)} // 메시지 상태 업데이트
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
  );
};
