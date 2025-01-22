import { FormControl } from '@chakra-ui/react';

import { AuthModal } from '@widgets/modals';

import { LOGIN_DATA } from '../../data';
import { LoginSection } from '../login-section';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalType: string;
  setModalType: (modalType: string) => void;
  setIsLogin: (isLogin: boolean) => void;
};

export const LoginModal = ({
  isOpen,
  onClose,
  setModalType,
  modalType,
  setIsLogin,
}: LoginModalProps) => {
  return (
    <AuthModal
      modalTitle={LOGIN_DATA.MODAL_TITLE}
      isOpen={isOpen}
      buttonText={LOGIN_DATA.BUTTON_TEXT}
      navigateText={LOGIN_DATA.NAVIGATE_TEXT}
      navigateModal={LOGIN_DATA.NAVIGATE_MODAL}
      modalType={modalType}
      setModalType={setModalType}
      onClose={onClose}
      setIsLogin={setIsLogin}
    >
      <FormControl>
        <LoginSection />
      </FormControl>
    </AuthModal>
  );
};
