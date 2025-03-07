import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Flex, Image, HStack, Button, useDisclosure } from '@chakra-ui/react';

import { Bell } from 'lucide-react';

import { RouterPath } from '@shared/constants';
import { useCustomToast } from '@shared/hooks';
import { authStorage } from '@shared/utils';

import { Container } from '@widgets/container';

import LogoImage from '../_assets/logo.png';
import { logoutApi } from '../apis';
import { LoginModal, NavigateMenu, SignupModal } from '../components';
import { useMutation } from '@tanstack/react-query';

export const Header = () => {
  const [isLogin, setIsLogin] = useState(() => authStorage.isLogin.get() ?? false);
  const [modalType, setModalType] = useState('login');

  const toast = useCustomToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      onSuccess();
    },
    onError: () => {
      toast({
        toastStatus: 'error',
        toastTitle: '로그아웃',
        toastDescription: '로그아웃을 실패하였습니다.',
      });
    },
  });

  const onSuccess = () => {
    setIsLogin(false);

    toast({
      toastStatus: 'success',
      toastTitle: '로그아웃',
      toastDescription: '로그아웃 되었습니다.',
    });

    authStorage.isLogin.set(false);
    authStorage.nickName.set('');
    authStorage.email.set('');
    authStorage.profile.set('');
  };

  const onClickLogin = () => {
    setModalType('login');
    onOpen();
  };

  useEffect(() => {
    const storedLoginState = authStorage.isLogin.get();

    if (storedLoginState !== undefined && storedLoginState === true) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Flex as='header' w='full' h={HEADER_HEIGHT} bgColor='custom.gray' py='12px'>
      <Container
        maxWidth='100vw'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
      >
        <Link to={RouterPath.MAIN}>
          <Image src={LogoImage} alt='Logo' w='200px' h='auto' />
        </Link>
        <HStack spacing='20px'>
          <Bell cursor='pointer' width={30} height={30} />
          {!isLogin ? (
            <Button
              w='80px'
              h='35px'
              border='1.5px solid'
              borderRadius='full'
              onClick={onClickLogin}
            >
              로그인
            </Button>
          ) : (
            <NavigateMenu onClick={logout} />
          )}
        </HStack>
      </Container>
      {modalType === 'login' ? (
        <LoginModal
          isOpen={isOpen}
          onClose={onClose}
          modalType={modalType}
          setModalType={setModalType}
          setIsLogin={setIsLogin}
        />
      ) : (
        <SignupModal
          isOpen={isOpen}
          onClose={onClose}
          modalType={modalType}
          setModalType={setModalType}
          setIsLogin={setIsLogin}
        />
      )}
    </Flex>
  );
};

export const HEADER_HEIGHT = '64px';
