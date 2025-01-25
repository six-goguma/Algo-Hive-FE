import { Flex, Text, Image } from '@chakra-ui/react';

import userIcon from '@shared/_assets/userIcon.svg';

export const ChatUserListItem = ({ nickName }: { nickName: string }) => {
  return (
    <Flex w='full' h='44px' align='center' pl='20px' gap='10px'>
      <Image src={userIcon} alt='userIcon' boxSize='24px' />
      <Text fontSize='12px' fontWeight='medium'>
        {nickName}
      </Text>
    </Flex>
  );
};
