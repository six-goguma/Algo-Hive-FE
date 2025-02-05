import { useState } from 'react';

import {
  Box,
  Button,
  Flex,
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
} from '@chakra-ui/react';

import { useCustomToast } from '@shared/hooks';

import { useGetChatRooms, useCreateChatRoom } from '../../hooks';
import { ChatRoomList } from './ChatRoomList';

export const ChatRoomSection = () => {
  const [page, setPage] = useState(0);
  const size = 10;
  const sort = 'createdAt,desc';

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [roomName, setRoomName] = useState('');

  const { mutate: createRoom } = useCreateChatRoom();

  const { data: chatRooms } = useGetChatRooms(page, size, sort);

  const customToast = useCustomToast();

  const handleCreateRoom = () => {
    if (!roomName.trim()) return;
    createRoom({ roomName });
    setRoomName('');
    onClose();
    customToast({
      toastStatus: 'success',
      toastTitle: '성공!',
      toastDescription: '채팅방이 생성되었습니다.',
    });
  };

  return (
    <>
      <Flex w='full' justify='center'>
        <Text w='full' textAlign='left' fontSize='24px' color='custom.blue' fontWeight={700}>
          채팅방 목록
        </Text>

        <Button h='32px' w='120px' onClick={onOpen}>
          채팅방 생성
        </Button>
      </Flex>

      <Box bg='custom.blue' h='3px' w='full' />

      <Box w='full' h='600px' bg='white' position='relative'>
        <ChatRoomList page={page} size={size} sort={sort} />
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
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>채팅방 생성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='채팅방 이름 입력'
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateRoom();
              }}
            />
          </ModalBody>
          <ModalFooter display='flex' justifyContent='center'>
            <Button h='32px' w='100px' colorScheme='blue' onClick={handleCreateRoom}>
              생성하기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
