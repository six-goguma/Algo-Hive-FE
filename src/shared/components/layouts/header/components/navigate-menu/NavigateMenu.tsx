import { HStack, Button } from '@chakra-ui/react';

// import { TriangleDownIcon } from '@chakra-ui/icons';

// import { UserIcon, LogOutIcon } from 'lucide-react';

import { Avatar, MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@shared/components';
import { RouterPath } from '@shared/constants';

type NavigateMenuProps = {
  onClick: () => void;
};

export const NavigateMenu = ({ onClick }: NavigateMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild onClick={() => onClick()}>
        <Button>
          <HStack gap='10px' cursor='pointer'>
            <Avatar w='40px' h='auto' src='https://bit.ly/broken-link' />
            {/* <TriangleDownIcon width='15px' height='auto' color='#868E96' /> */}
          </HStack>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild value='naruto'>
          <a href={RouterPath.MYPAGE}>
            {/* <UserIcon /> */}
            마이페이지
          </a>
        </MenuItem>
        <MenuItem asChild value='naruto'>
          <a href={RouterPath.MAIN}>
            {/* <LogOutIcon /> */}
            로그아웃
          </a>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};
