import { Avatar, Flex, Button, Text, Box } from '@chakra-ui/react';

export const UserProfileSection = () => {
  const userNickname = 'gogumalatte';

  return (
    <Flex
      w={{ base: '100%', sm: '80%' }}
      h={{ base: 'auto', sm: '210px' }}
      mt='40px'
      flexDir={{ base: 'column', sm: 'row' }}
      align={{ base: 'center', sm: 'flex-start' }}
      p={{ base: '20px', sm: '0' }}
    >
      <Flex
        w={{ base: 'full', sm: '128px' }}
        flexDir='column'
        align='center'
        mb={{ base: '20px', sm: '0' }}
      >
        <Avatar boxSize={24} mb='16px' />
        <Button w='110px' h='36px' fontSize='14px' mb='10px'>
          이미지 업로드
        </Button>
        <Button bg='none' border='none' w='1180x' h='36px' color='custom.blue' fontSize='14px'>
          이미지 제거
        </Button>
      </Flex>

      <Flex
        w={{ base: 'full', sm: '150px' }}
        flexDir={{ base: 'column', sm: 'row' }}
        ml={{ base: '0', sm: '30px' }}
        align={{ base: 'center', sm: 'flex-start' }}
      >
        <Text fontSize='20px' fontWeight='Bold' mb='6px' mt='10px'>
          {userNickname}
        </Text>
        <Box fontSize='16px' fontWeight='Bold' bg='none' border='none' cursor='pointer'>
          <Text
            w='full'
            fontSize='14px'
            fontWeight='Bold'
            lineHeight='16px'
            textAlign='center'
            color='custom.blue'
            textDecoration='underline'
          >
            닉네임 수정
          </Text>
        </Box>
      </Flex>

      <Flex w='full' justify={{ base: 'center', sm: 'flex-end' }} mt={{ base: '20px', sm: '0' }}>
        <Button bg='white' color='gray.500' w='80px' h='32px' fontSize='14px'>
          회원탈퇴
        </Button>
      </Flex>
    </Flex>
  );
};
