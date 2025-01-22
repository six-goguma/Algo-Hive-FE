import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Avatar,
  Flex,
  Image,
  HStack,
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuButton,
  useDisclosure,
} from '@chakra-ui/react';

import { TriangleDownIcon } from '@chakra-ui/icons';

import { Bell, LogOutIcon, UserIcon } from 'lucide-react';

import { Container } from '../../../container';
import LogoImage from '../_assets/logo.png';
import { LoginModal, SignupModal } from '../components';

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
          <Image src={LogoImage} alt='Logo' w='200px' />
        </Link>
        <HStack spacing='20px'>
          <Bell cursor='pointer' width={30} height={30} />
          {!isLogin ? (
            <Button
              w='80px'
              h='35px'
              border='1.5px solid'
              borderRadius='full'
              onClick={() => onClick()}
            >
              로그인
            </Button>
          ) : (
            <Menu>
              {({ isOpen }) => (
                <>
                  <HStack spacing='20px' cursor='pointer'>
                    <Button
                      as={Link}
                      to={RouterPath.POST_WRITE}
                      w='full'
                      h='35px'
                      px={4}
                      bg='custom.gray'
                      color='black'
                      border='1.5px solid'
                      borderRadius='full'
                      _hover={{ bg: 'black', color: 'white' }}
                    >
                      새 글 작성
                    </Button>
                    <MenuButton>
                      <HStack spacing='10px' cursor='pointer'>
                        <Avatar w='40px' h='auto' src='https://bit.ly/broken-link' />
                        <TriangleDownIcon
                          width='15px'
                          height='auto'
                          color={isOpen ? 'black' : '#868E96'}
                        />
                      </HStack>
                    </MenuButton>
                  </HStack>
                  <MenuList minW='0' w='full'>
                    <MenuItem fontSize='sm' icon={<UserIcon />} as={Link} to={RouterPath.MYPAGE}>
                      마이페이지
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem
                      fontSize='sm'
                      icon={<LogOutIcon />}
                      as={Link}
                      to={RouterPath.MAIN}
                      onClick={() => onClick()}
                    >
                      로그아웃
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
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
