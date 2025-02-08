import { Link } from 'react-router-dom';

import {
  HStack,
  Button,
  MenuButton,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  useBreakpointValue,
} from '@chakra-ui/react';

import { TriangleDownIcon } from '@chakra-ui/icons';

import { UserIcon, LogOutIcon, SquarePenIcon } from 'lucide-react';

import { RouterPath } from '@shared/constants';

type NavigateMenuProps = {
  onClick: () => void;
};

export const NavigateMenu = ({ onClick }: NavigateMenuProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <HStack spacing='20px' cursor='pointer'>
            {!isMobile && (
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
            )}
            <MenuButton>
              <HStack spacing='10px' cursor='pointer'>
                <Avatar w='40px' h='auto' src='https://bit.ly/broken-link' />
                <TriangleDownIcon width='15px' height='auto' color={isOpen ? 'black' : '#868E96'} />
              </HStack>
            </MenuButton>
          </HStack>
          <MenuList minW='0' w='full'>
            {isMobile && (
              <>
                <MenuItem
                  fontSize='sm'
                  icon={<SquarePenIcon />}
                  as={Link}
                  to={RouterPath.POST_WRITE}
                >
                  새 글 쓰기
                </MenuItem>
                <MenuDivider />
              </>
            )}
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
  );
};
