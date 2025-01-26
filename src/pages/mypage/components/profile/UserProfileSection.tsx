import { Avatar, Flex, Button, Text, Box } from '@chakra-ui/react';

export const UserProfileSection = () => {
  const userNickname = 'gogumalatte';

  return (
    <Flex
      w={{ base: '100%', sm: '80%' }}
      h={{ base: 'auto', sm: '210px' }}
      mt='40px'
      align='flex-start'
      p={{ base: '20px', sm: '0' }}
    >
      <Flex
        w={{ base: 'full', sm: '128px' }}
        flexDir='column'
        align='center'
        mb={{ base: '20px', sm: '0' }}
      >
        <Avatar boxSize={24} mb='16px' />
        <Button w={{ base: '80px', sm: '110px' }} h='36px' fontSize='14px' mb='10px'>
          이미지 업로드
        </Button>
        <Button
          bg='none'
          border='none'
          w={{ base: '80px', sm: '110px' }}
          h='36px'
          color='custom.blue'
          fontSize='14px'
        >
          이미지 제거
        </Button>
      </Flex>

      <Flex
        w={{ base: 'full', sm: '150px' }}
        flexDir='column'
        ml={{ base: '16px', sm: '30px' }}
        align='flex-start'
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

      <Flex w='full' justify='flex-end' mt={{ base: '80px', sm: '0' }}>
        <Button
          variant='outline'
          color='customGray.500'
          borderColor='customGray.500'
          w={{ base: '40px', sm: '80px' }}
          h={{ base: '28px', sm: '32px' }}
          fontSize='14px'
        >
          회원탈퇴
        </Button>
      </Flex>
    </Flex>
  );
};
