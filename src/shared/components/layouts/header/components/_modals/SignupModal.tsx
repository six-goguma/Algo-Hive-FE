import { FormControl } from '@chakra-ui/react';

import { AuthModal } from '@widgets/modals';

import { SIGNUP_DATA } from '../../data';
import { EmailSection, NicknameSection, PasswordSection } from '../signup-section';

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalType: string;
  setModalType: (modalType: string) => void;
  setIsLogin: (isLogin: boolean) => void;
};
export const SignupModal = ({
  isOpen,
  onClose,
  modalType,
  setModalType,
  setIsLogin,
}: SignupModalProps) => {
  return (
    <AuthModal
      modalTitle={SIGNUP_DATA.MODAL_TITLE}
      isOpen={isOpen}
      buttonText={SIGNUP_DATA.BUTTON_TEXT}
      navigateText={SIGNUP_DATA.NAVIGATE_TEXT}
      navigateModal={SIGNUP_DATA.NAVIGATE_MODAL}
      scrollBehavior="outside"
      modalType={modalType}
      setModalType={setModalType}
      onClose={onClose}
      setIsLogin={setIsLogin}
    >
      <FormControl>
        <NicknameSection />
        <EmailSection />
        <PasswordSection />
      </FormControl>
    </AuthModal>
  );
};
