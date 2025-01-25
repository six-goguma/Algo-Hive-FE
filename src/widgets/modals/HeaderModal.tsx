import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Text,
} from '@chakra-ui/react';

type HeaderModalProps = {
  modalTitle: string;
  buttonText: string;
  children: React.ReactNode;
  isOpen: boolean;
  navigateText: string;
  navigateModal: string;
  scrollBehavior?: 'inside' | 'outside';
  onClose: () => void;
  modalType: string;
  setModalType: (modalType: string) => void;
  setIsLogin: (isLogin: boolean) => void;
};

export const HeaderModal = ({
  modalTitle,
  buttonText,
  children,
  isOpen,
  navigateText,
  navigateModal,
  scrollBehavior,
  onClose,
  modalType,
  setModalType,
  setIsLogin,
}: HeaderModalProps) => {
  const onClick = () => {
    if (modalType === 'login') {
      setModalType('signup');
    } else {
      setModalType('login');
    }
  };

  const onLogin = () => {
    setIsLogin(true);
    onClose();
  };
  return (
    <Modal size='sm' isOpen={isOpen} onClose={onClose} scrollBehavior={scrollBehavior} isCentered>
      <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(3px)' />
      <ModalContent w='100%'>
        <ModalHeader mt={5} textAlign='left'>
          {modalTitle}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody textAlign='left'>{children}</ModalBody>

        <ModalFooter w='full' flexDir='column'>
          <Button w='full' h='40px' px='auto' colorScheme='custom.blue' onClick={onLogin}>
            {buttonText}
          </Button>
          <Flex mt={5} mb={2} alignItems='center'>
            <Text fontSize='sm' color='custom.blue'>
              {navigateText}
            </Text>
            <Button bg='none' color='custom.blue' border='none' _hover={{}} onClick={onClick}>
              {navigateModal}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
