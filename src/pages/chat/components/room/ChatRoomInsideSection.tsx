import { useState } from 'react';

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
  onComplete: () => void; // onComplete Prop 추가
}) => {
  // 메시지 상태를 관리
  const [messages, setMessages] = useState(
    mockChatMessageList.filter((message) => message.roomName === roomName),
  );
  const [isEntered, setIsEntered] = useState(false);

  // 메시지 추가 함수
  const handleSendMessage = (content: string) => {
    const userNickname = localStorage.getItem('userNickname') || 'Unknown'; // 닉네임 가져오기
    const newMessage = { sender: userNickname, content, roomName }; // 새로운 메시지 생성
    setMessages((prevMessages) => [...prevMessages, newMessage]); // 상태 업데이트
  };

  return (
    <>
      <Box w='full' h='36px'>
        <Text w='full' textAlign='left' fontSize='24px' color='blue.500' fontWeight={700}>
          {roomName || ''}
        </Text>
      </Box>
      <Box bg='blue.500' height='3px' width='100%' />
      <Box w='full' h='409px' overflowY='auto'>
        {/* 메시지 리스트 표시 */}
        <ChatMessageList messages={messages} />
      </Box>
      {isEntered ? (
        // 메시지 입력 박스 표시
        <ChatInputBox onSendMessage={handleSendMessage} />
      ) : (
        // 닉네임 설정 모달 표시
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
