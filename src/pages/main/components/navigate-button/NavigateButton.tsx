import { Link } from 'react-router-dom';

import {
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from '@chakra-ui/react';

import { MenuIcon } from 'lucide-react';

import { RouterPath } from '@shared/constants';

export const NavigateButton = () => {
  const isMobile = useBreakpointValue({ base: true, md: false }, { ssr: false });

  return (
    <>
      {!isMobile ? (
        <HStack spacing={5}>
          <Link to={RouterPath.CODE_REVIEW}>
            <Button variant='outline' py={4} fontSize={{ base: 'sm', sm: 'md' }}>
              AI 코드리뷰
            </Button>
          </Link>
          <Link to={RouterPath.CHAT}>
            <Button variant='outline' py={4} fontSize={{ base: 'sm', sm: 'md' }}>
              채팅하기
            </Button>
          </Link>
        </HStack>
      ) : (
        <Menu>
          <Flex w={7} align='center'>
            <MenuButton
              as={IconButton}
              variant='outline'
              border='none'
              color='customGray.400'
              bg='none'
              aria-label='menu'
              icon={<MenuIcon />}
              _hover={{}}
            />
          </Flex>
          <MenuList minW='0' w='full'>
            <MenuItem fontSize='sm' as={Link} to={RouterPath.CODE_REVIEW}>
              AI 코드리뷰
            </MenuItem>
            <MenuDivider />
            <MenuItem fontSize='sm' as={Link} to={RouterPath.CHAT}>
              채팅하기
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
};
