import { Avatar, Flex, Button, Text, Box } from '@chakra-ui/react';

export const UserProfileSection = () => {
  const userNickname = 'gogumalatte';
  return (
    <Flex w='80%' h='210px' mt='40px'>
      <Flex w='128px' flexDir='column' align='center'>
        <Avatar size='128px' mb='16px' />
        <Button w='118px' h='40px' fontSize='18px' mb='10px'>
          이미지 업로드
        </Button>
        <Button bg='none' border='none' w='118px' h='40px' color='custom.blue' fontSize='18px'>
          이미지 제거
        </Button>
      </Flex>
      <Flex w='150px' flexDir='column' ml='30px' align='flex-start'>
        <Text fontSize='24px' fontWeight='Bold' mb='6px' mt='10px'>
          {userNickname}
        </Text>
        <Box fontSize='16px' fontWeight='Bold' bg='none' border='none' cursor='pointer'>
          <Text
            w='full'
            fontSize='16px'
            fontWeight='Bold'
            lineHeight='16px'
            textAlign='left'
            color='custom.blue'
            textDecoration='underline'
          >
            닉네임 수정
          </Text>
        </Box>
      </Flex>
      <Flex w='full' justify='flex-end'>
        <Button bg='white' color='gray.500' w='80px' h='32px' fontSize='16px'>
          회원탈퇴
        </Button>
      </Flex>
    </Flex>
  );
};
