import { useState, useEffect } from 'react';

import { Box, Text } from '@chakra-ui/react';

import { ChatInputBox } from '@pages/chat/components/input/ChatInputBox';
import { ChatMessageList } from '@pages/chat/components/message/ChatMessageList';
import { SetUserNameModal } from '@pages/chat/components/modal/SetUserNameModal';
import { mockChatMessageList } from '@pages/chat/mock/mockChatMessageList';

export const ChatRoomInsideSection = ({
  roomName,
  onComplete,
}: {
  roomName: string;
  onComplete: () => void;
}) => {
  const [messages, setMessages] = useState(
    mockChatMessageList.filter((message) => message.roomName === roomName),
  );
  const [isEntered, setIsEntered] = useState(false);
  const [userNickname, setUserNickname] = useState(localStorage.getItem('userNickname') || ''); // 닉네임 상태 관리

  // 메시지 추가 함수
  const handleSendMessage = (content: string) => {
    const newMessage = { sender: userNickname, content, roomName }; // 새로운 메시지 생성
    setMessages((prevMessages) => [...prevMessages, newMessage]); // 상태 업데이트
  };

  useEffect(() => {
    const storedNickname = localStorage.getItem('userNickname') || '';
    setUserNickname(storedNickname); // localStorage에서 닉네임 가져오기
  }, []); // 컴포넌트 마운트 시 실행

  return (
    <>
      <Box w='full' h='36px'>
        <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
          {roomName || ''}
        </Text>
      </Box>
      <Box bg='blue.500' height='3px' width='100%' />
      <Box w='full' h='409px' overflowY='auto'>
        <ChatMessageList messages={messages} userNickname={userNickname} /> {/* 닉네임 전달 */}
      </Box>
      {isEntered ? (
        <ChatInputBox onSendMessage={handleSendMessage} />
      ) : (
        <SetUserNameModal
          onComplete={() => {
            setIsEntered(true);
            onComplete(); // 부모 상태 업데이트
          }}
        />
      )}
    </>
  );
};
