import { Link } from 'react-router-dom';

import { Button, HStack } from '@chakra-ui/react';

import { RouterPath } from '@shared/constants';

export const NavigateButton = () => {
  return (
    <HStack spacing={5}>
      <Link to={RouterPath.CODE_REVIEW}>
        <Button variant='outline' py={4}>
          AI 코드리뷰
        </Button>
      </Link>
      <Link to={RouterPath.CHAT}>
        <Button variant='outline' py={4}>
          채팅하기
        </Button>
      </Link>
    </HStack>
  );
};
