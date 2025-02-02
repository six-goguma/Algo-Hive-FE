import { useState } from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@shared/components';

type HeaderDialogProps = {
  modalTitle: string;
  buttonText: string;
  children: React.ReactNode;
  //   isOpen: boolean;
  navigateText: string;
  navigateModal: string;
  //   scrollBehavior?: 'inside' | 'outside';
  modalType: string;
  setModalType: (modalType: string) => void;
  setIsLogin: (isLogin: boolean) => void;
};

export const HeaderDialog = ({
  modalTitle,
  buttonText,
  children,
  //   isOpen,
  navigateText,
  navigateModal,
  //   scrollBehavior,
  modalType,
  setModalType,
  setIsLogin,
}: HeaderDialogProps) => {
  const [open, setOpen] = useState(false);
  const onClick = () => {
    if (modalType === 'login') {
      setModalType('signup');
    } else {
      setModalType('login');
    }
  };

  const onLogin = () => {
    setIsLogin(true);
  };
  return (
    <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
      <DialogTrigger>
        <Button variant='outline'>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader mt={5} textAlign='left'>
          <DialogTitle>{modalTitle}</DialogTitle>
        </DialogHeader>

        <DialogBody>{children}</DialogBody>

        <DialogFooter>
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
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};
