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

type SetUserNameModalProps = {
  onComplete: () => void;
};

export const SetUserNameModal = ({ onComplete }: SetUserNameModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nickname, setNickname] = useState('');

  const handleComplete = () => {
    localStorage.setItem('userNickname', nickname);
    onClose();
    onComplete();
  };

  return (
    <>
      <Button mt='15px' h='36px' w='100px' onClick={onOpen}>
        채팅방 입장하기
      </Button>

      <Modal size='sm' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p='20px'>
          <ModalHeader fontSize='13px' fontWeight='Bold'>
            입장할 닉네임을 설정해 주세요.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder='닉네임을 입력해 주세요.'
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button h='36px' w='100px' onClick={handleComplete}>
              완료
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
