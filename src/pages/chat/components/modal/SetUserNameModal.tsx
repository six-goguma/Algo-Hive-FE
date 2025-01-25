import { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from '@chakra-ui/react';

export const SetUserNameModal = ({ onComplete }: { onComplete: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nickname, setNickname] = useState(''); // 닉네임 상태 관리

  const handleComplete = () => {
    localStorage.setItem('userNickname', nickname); // 닉네임을 localStorage에 저장
    onClose();
    onComplete(); // 완료 후 상태 변경 호출
  };

  return (
    <>
      <Button mt='15px' h='36px' w='100px' onClick={onOpen}>
        채팅방 입장하기
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p='20px'>
          <ModalHeader fontSize='13px' fontWeight='Bold'>
            입장할 닉네임을 설정해 주세요.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='닉네임을 입력해 주세요.'
              value={nickname} // 닉네임 상태 연결
              onChange={(e) => setNickname(e.target.value)} // 상태 업데이트
            />
          </ModalBody>

          <ModalFooter display='flex' justifyContent='center'>
            <Button h='36px' w='100px' onClick={handleComplete}>
              완료
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
