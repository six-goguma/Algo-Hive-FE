import { useState } from 'react';

import { InputGroup, InputRightElement, Button, Input } from '@chakra-ui/react';

import { SendHorizonal } from 'lucide-react';

export const ChatInputBox = () => {
  const [message, setMessage] = useState('');

  // 메시지 전송 함수
  const handleSendMessage = () => {
    if (message.trim() === '') return; // 빈 메시지는 전송하지 않음
    console.log('Message sent:', message);
    setMessage(''); // 메시지 전송 후 Input 초기화
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
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(); // 엔터 키 입력 시 메시지 전송 함수 호출
          }
        }}
      />
      <InputRightElement height='100%' display='flex' alignItems='center'>
        <Button
          size='40px'
          bg='white'
          onClick={handleSendMessage} // 버튼 클릭 시 메시지 전송
        >
          <SendHorizonal size={20} color='#0076BF' />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
