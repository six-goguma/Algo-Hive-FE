import React from 'react';

import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Avatar,
} from '@chakra-ui/react';

import { SendHorizontal } from 'lucide-react';

interface ChatRoomInsideProps {
  roomName: string; // 현재 선택된 채팅방 이름
  messages: { sender: string; content: string; email: string }[]; // 채팅 메시지 목록
  socketMessages: { sender: string; content: string; email: string }[]; // 소켓 메시지 목록
  newMessage: string; // 새로 작성 중인 메시지
  setNewMessage: (message: string) => void; // 새 메시지 상태 업데이트 함수
  handleSendMessage: () => void; // 메시지 전송 함수
  isComposing: boolean; // IME 입력 상태
  setIsComposing: (isComposing: boolean) => void; // IME 입력 상태 업데이트 함수
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  messageListRef: React.RefObject<HTMLDivElement | null>; // 메시지 목록 스크롤을 위한 Ref
  handleMessageListScroll: () => void; // 스크롤 이벤트 핸들러
  email: string; // 현재 사용자 이메일
}

export const ChatRoomInside = ({
  roomName,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isComposing,
  setIsComposing,
  messagesEndRef,
  messageListRef,
  handleMessageListScroll,
  email,
}: ChatRoomInsideProps) => {
  return (
    <Box w={{ base: 'full', sm: '70%' }} bg='#F7F9FB'>
      {roomName && (
        <>
          <Box w='full' h='36px'>
            <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
              {roomName || ''}
            </Text>
          </Box>
          <Box bg='custom.blue' h='3px' w='full' />
          <Box
            w='full'
            h='549px'
            overflowY='auto'
            className='relative'
            ref={messageListRef}
            onScroll={handleMessageListScroll}
          >
            {messages
              .slice()
              .reverse()
              .map((message, index) => (
                <Box
                  w='full'
                  h={!(message.email === email) ? '72px' : '44px'}
                  mt='10px'
                  position='relative'
                  key={index}
                >
                  <Flex
                    h='full'
                    gap='7px'
                    pl={!(message.email === email) ? '8px' : undefined}
                    pr={message.email === email ? '8px' : undefined}
                    position='absolute'
                    top='0'
                    left={!(message.email === email) ? '0' : undefined}
                    right={message.email === email ? '0' : undefined}
                    justifyContent={message.email === email ? 'flex-end' : 'flex-start'}
                  >
                    {!(message.email === email) && <Avatar boxSize='36px' />}
                    <Flex
                      w='full'
                      h='full'
                      flexDir='column'
                      align={message.email === email ? 'flex-end' : 'flex-start'}
                    >
                      {!(message.email === email) && (
                        <Text
                          w='full'
                          textAlign={message.email === email ? 'right' : 'left'}
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
                        bg={message.email === email ? '#9BD9FF' : 'white'}
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
              onChange={(e) => setNewMessage(e.target.value)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isComposing) {
                  e.preventDefault();
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
  );
};
