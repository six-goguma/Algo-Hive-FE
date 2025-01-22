import { FormControl } from '@chakra-ui/react';

import { AuthModal } from '@widgets/modals';

import { SIGNUP_SCHEMA } from '../../schema';
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
      modalTitle={SIGNUP_SCHEMA.MODAL_TITLE}
      isOpen={isOpen}
      buttonText={SIGNUP_SCHEMA.BUTTON_TEXT}
      navigateText={SIGNUP_SCHEMA.NAVIGATE_TEXT}
      navigateModal={SIGNUP_SCHEMA.NAVIGATE_MODAL}
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
