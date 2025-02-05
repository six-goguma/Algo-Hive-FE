import { useState, useEffect } from 'react';

import { Box, Text, Button } from '@chakra-ui/react';

import { useChatRoomContext } from '../../hooks';
import { mockChatMessageList } from '../../mock';
import { ChatInputBox } from '../input';
import { ChatMessageList } from '../message';

type ChatRoomInsideSectionProps = {
  roomName: string;
};

export const ChatRoomInsideSection = ({ roomName }: ChatRoomInsideSectionProps) => {
  const [messages, setMessages] = useState(
    mockChatMessageList.filter((message) => message.roomName === roomName),
  );
  const { isEntered, setIsEntered } = useChatRoomContext();
  const [userNickname, setUserNickname] = useState(localStorage.getItem('userNickname') || '');

  // 메시지 추가 함수
  const handleSendMessage = (content: string) => {
    const newMessage = { sender: userNickname, content, roomName };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    const storedNickname = localStorage.getItem('userNickname') || '';
    setUserNickname(storedNickname);
  }, []);

  return (
    <>
      <Box w='full' h='36px'>
        <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
          {roomName || ''}
        </Text>
      </Box>
      <Box bg='custom.blue' h='3px' w='full' />
      <Box w='full' h='549px' overflowY='auto'>
        <ChatMessageList messages={messages} userNickname={userNickname} /> {/* 닉네임 전달 */}
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
