import { HeaderDialog } from '@widgets/dialog';

import { LOGIN_DATA } from '../../data';
import { LoginSection } from '../login-section';

type LoginModalProps = {
  modalType: string;
  setModalType: (modalType: string) => void;
  setIsLogin: (isLogin: boolean) => void;
};

export const LoginModal = ({ setModalType, modalType, setIsLogin }: LoginModalProps) => {
  return (
    <HeaderDialog
      modalTitle={LOGIN_DATA.MODAL_TITLE}
      buttonText={LOGIN_DATA.BUTTON_TEXT}
      navigateText={LOGIN_DATA.NAVIGATE_TEXT}
      navigateModal={LOGIN_DATA.NAVIGATE_MODAL}
      modalType={modalType}
      setModalType={setModalType}
      setIsLogin={setIsLogin}
    >
      <LoginSection />
    </HeaderDialog>
  );
};
