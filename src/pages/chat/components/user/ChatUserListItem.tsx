import { Flex, Text, Avatar } from '@chakra-ui/react';

type ChatUserListItemProps = {
  nickName: string;
};
export const ChatUserListItem = ({ nickName }: ChatUserListItemProps) => {
  return (
    <Flex w='full' h='60px' align='center' pl='20px' gap='10px'>
      <Avatar boxSize='24px' />
      <Text fontSize='14px' fontWeight='medium'>
        {nickName}
      </Text>
    </Flex>
  );
};
