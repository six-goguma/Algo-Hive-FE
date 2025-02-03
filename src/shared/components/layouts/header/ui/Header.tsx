import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Flex, Image, HStack, Button, useDisclosure } from '@chakra-ui/react';

import { Bell } from 'lucide-react';

import { RouterPath } from '@shared/constants';

import { Container } from '@widgets/container';

import LogoImage from '../_assets/logo.png';
import { LoginModal, NavigateMenu, SignupModal } from '../components';

export const Header = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [modalType, setModalType] = useState('login');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onClick = () => {
    setIsLogin(!isLogin);
  };

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
            <Button w='80px' h='35px' border='1.5px solid' borderRadius='full' onClick={onOpen}>
              로그인
            </Button>
          ) : (
            <NavigateMenu onClick={onClick} />
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
