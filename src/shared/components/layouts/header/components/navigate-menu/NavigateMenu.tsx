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
  Image,
} from '@chakra-ui/react';

import { TriangleDownIcon } from '@chakra-ui/icons';

import { UserIcon, LogOutIcon, SquarePenIcon } from 'lucide-react';

import { useGetProfile } from '@pages/mypage/hooks';

import { DEFAULT_IMAGE, RouterPath } from '@shared/constants';
import { SERVER_URI } from '@shared/service';
import { authStorage } from '@shared/utils';

type NavigateMenuProps = {
  onClick: () => void;
};

export const NavigateMenu = ({ onClick }: NavigateMenuProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data: userData, isPending } = useGetProfile();

  // 프로필 이미지를 올리지 않은 사용자는 url이 null로 내려온다. 객체 유무만 보면 "...cloudnull"이 된다.
  const uploadedProfile = userData?.url ? `${SERVER_URI}${userData.url}` : '';
  const userProfile = uploadedProfile || DEFAULT_IMAGE;

  if (uploadedProfile !== '') {
    authStorage.profile.set(uploadedProfile);
  }

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
                {isPending ? (
                  <Avatar w='40px' h='auto' src='https://bit.ly/broken-link' />
                ) : (
                  <Image
                    src={userProfile}
                    fallbackSrc={DEFAULT_IMAGE}
                    alt='Profile'
                    borderRadius='full'
                    w='40px'
                    h='auto'
                  />
                )}
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
