import { useState } from 'react';

import { InputGroup, InputRightElement, Button, Input } from '@chakra-ui/react';

import { SendHorizonal } from 'lucide-react';

type ChatInputBoxProps = {
  onSendMessage: (content: string) => void;
};
export const ChatInputBox = ({ onSendMessage }: ChatInputBoxProps) => {
  const [message, setMessage] = useState('');
  const [isComposing, setIsComposing] = useState(false); // IME 입력 상태 관리

  const handleSendMessage = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage === '') return;
    onSendMessage(trimmedMessage);
    setMessage('');
  };

  return (
    <InputGroup border='1.5px solid #0076BF' mt='15px' h='36px'>
      <Input
        size='sm'
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
            // IME 입력 중이 아닐 때만 전송
            e.preventDefault(); // 엔터 키의 기본 동작 방지
            handleSendMessage();
          }
        }}
      />
      <InputRightElement height='100%' display='flex' alignItems='center'>
        <Button size='40px' bg='white' onClick={handleSendMessage}>
          <SendHorizonal size={20} color='#0076BF' />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
