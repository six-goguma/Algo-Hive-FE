import { useState, useEffect } from 'react';

import { Box, Text } from '@chakra-ui/react';

import { mockChatMessageList } from '../../mock';
import { ChatInputBox } from '../input';
import { ChatMessageList } from '../message';
import { SetUserNameModal } from '../modal';

type ChatRoomInsideSectionProps = {
  roomName: string;
  onComplete: () => void;
};

export const ChatRoomInsideSection = ({ roomName, onComplete }: ChatRoomInsideSectionProps) => {
  const [messages, setMessages] = useState(
    mockChatMessageList.filter((message) => message.roomName === roomName),
  );
  const [isEntered, setIsEntered] = useState(false);
  const [userNickname, setUserNickname] = useState(localStorage.getItem('userNickname') || '');

  // 메시지 추가 함수
  const handleSendMessage = (content: string) => {
    const newMessage = { sender: userNickname, content, roomName };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const completeCallback = () => {
    setIsEntered(true);
    onComplete();
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
        <SetUserNameModal onComplete={completeCallback} />
      )}
    </>
  );
};
