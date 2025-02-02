import { HeaderDialog } from '@widgets/dialog';

import { SIGNUP_DATA } from '../../data';
import { EmailSection, NicknameSection, PasswordSection } from '../signup-section';

type SignupModalProps = {
  modalType: string;
  setModalType: (modalType: string) => void;
  setIsLogin: (isLogin: boolean) => void;
};
export const SignupModal = ({ modalType, setModalType, setIsLogin }: SignupModalProps) => {
  return (
    <HeaderDialog
      modalTitle={SIGNUP_DATA.MODAL_TITLE}
      buttonText={SIGNUP_DATA.BUTTON_TEXT}
      navigateText={SIGNUP_DATA.NAVIGATE_TEXT}
      navigateModal={SIGNUP_DATA.NAVIGATE_MODAL}
      modalType={modalType}
      setModalType={setModalType}
      setIsLogin={setIsLogin}
    >
      <NicknameSection />
      <EmailSection />
      <PasswordSection />
    </HeaderDialog>
  );
};
