import {
  Box,
  Flex,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';

import { ResponseChatRooms } from '@pages/chat/apis';

interface ChatRoomListProps {
  chatRooms?: ResponseChatRooms; // 채팅방 목록 데이터
  roomName: string; // 현재 선택된 채팅방 이름
  setRoomName: (name: string) => void; // 채팅방 선택 시 상태 업데이트 함수
  onOpen: () => void; // 채팅방 생성 모달 열기 함수
  roomUserList: { [key: string]: number }; // 각 방의 접속자 수
  setPage: (page: number | ((prev: number) => number)) => void; // 페이지 변경 함수
  page: number; // 현재 페이지 번호
  isFirstPage?: boolean; // 첫 번째 페이지 여부
  isLastPage?: boolean; // 마지막 페이지 여부
  handleCreateRoom: () => void; // 채팅방 생성 함수
  newRoomName: string; // 새 채팅방 이름
  setNewRoomName: (name: string) => void; // 새 채팅방 이름 상태 업데이트 함수
  isOpen: boolean; // 모달 열림 상태
  onClose: () => void; // 모달 닫기 함수
}

export const ChatRoomList = ({
  chatRooms,
  roomName,
  setRoomName,
  onOpen,
  roomUserList,
  setPage,
  page,
  isFirstPage,
  isLastPage,
  handleCreateRoom,
  newRoomName,
  setNewRoomName,
  isOpen,
  onClose,
}: ChatRoomListProps) => {
  return (
    <Box w={{ base: 'full', sm: '40%' }} bg='#F7F9FB'>
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
              onClick={() => setRoomName(room.roomName)}
              justify='space-between'
            >
              <Text
                fontSize='14px'
                fontWeight='bold'
                noOfLines={2}
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
                <Box boxSize='24px' bg='customGray.400' borderRadius='5px' alignContent='center'>
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
          onClick={() => setPage((prev: number) => Math.max(prev - 1, 0))}
          isDisabled={isFirstPage}
        >
          이전
        </Button>
        <Text>{page + 1}</Text>
        <Button onClick={() => setPage((prev: number) => prev + 1)} isDisabled={isLastPage}>
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
  );
};
