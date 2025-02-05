import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button, VStack } from '@chakra-ui/react';

import { Form, PasswordInputField } from '@shared/components';
import { useCustomToast } from '@shared/hooks';

import { HeaderModal } from '@widgets/modals';

import { signupApi } from '../../apis';
import { SIGNUP_DATA } from '../../data';
import { Signup, SignupSchema } from '../../schema';
import { EmailSection, NicknameSection } from '../signup-section';
import { EmailCodeSection } from '../signup-section/EmailCodeSection';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

type SignupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  modalType: string;
  setModalType: (modalType: string) => void;
  setIsLogin: (isLogin: boolean) => void;
};
export const SignupModal = ({ isOpen, onClose, modalType, setModalType }: SignupModalProps) => {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      close();
    },
  });

  const toast = useCustomToast();

  const [isValid, setIsValid] = useState({
    nickName: false,
    email: false,
    code: false,
  });

  const form = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: {
      nickName: '',
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = () => {
    try {
      if (!isValid.nickName) {
        throw new Error('닉네임을 중복 확인을 진행해주세요.');
      }
      if (!isValid.code) {
        throw new Error('이메일을 인증을 진행해주세요.');
      }

      const { nickName, email, password } = form.getValues();

      signup({
        nickName,
        email,
        password,
      });

      toast({
        toastStatus: 'success',
        toastTitle: '회원가입',
        toastDescription: '회원가입에 성공했습니다.',
      });
    } catch (error) {
      console.error('회원가입 실패: ', error);
      if (error instanceof Error) {
        if (!isValid.nickName || !isValid.email) {
          toast({
            toastStatus: 'error',
            toastTitle: '회원가입',
            toastDescription: error.message,
          });
        }
      }
    }
    setModalType('login');
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <HeaderModal
          modalTitle={SIGNUP_DATA.MODAL_TITLE}
          isOpen={isOpen}
          navigateText={SIGNUP_DATA.NAVIGATE_TEXT}
          navigateModal={SIGNUP_DATA.NAVIGATE_MODAL}
          scrollBehavior='outside'
          modalType={modalType}
          setModalType={setModalType}
          onClose={onClose}
        >
          <NicknameSection
            name='nickName'
            isValid={isValid.nickName}
            setIsValid={(valid: boolean) => setIsValid((prev) => ({ ...prev, nickName: valid }))}
          />
          <EmailSection
            name='email'
            isValid={isValid.email}
            setIsValid={(valid: boolean) => setIsValid((prev) => ({ ...prev, email: valid }))}
          />
          <EmailCodeSection
            name='code'
            isValid={isValid.code}
            setIsValid={(valid: boolean) => setIsValid((prev) => ({ ...prev, code: valid }))}
          />
          <VStack w='full' align='left' spacing={1}>
            <PasswordInputField
              name='password'
              type='password'
              placeholder={SIGNUP_DATA.PASSWORD.PASSWORD_PLACEHOLDER}
              formLabel='비밀번호'
              formDescription='비밀번호는 숫자와 특수문자를 포함해 8자 이상으로 입력해주세요.'
            />
            <PasswordInputField
              name='confirmPassword'
              type='password'
              placeholder={SIGNUP_DATA.PASSWORD.PASSWORD_CONFIRM_PLACEHOLDER}
            />
          </VStack>
          <Button w='full' my={5} py={5} type='submit' disabled={isPending} onClick={onSubmit}>
            회원가입
          </Button>
        </HeaderModal>
      </form>
    </Form>
  );
};
