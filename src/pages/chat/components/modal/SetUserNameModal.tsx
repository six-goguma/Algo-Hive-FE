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

export const SetUserNameModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Input placeholder='닉네임을 입력해 주세요.' />
          </ModalBody>

          <ModalFooter display='flex' justifyContent='center'>
            <Button h='36px' w='100px' onClick={onClose}>
              완료
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
