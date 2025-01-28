import { Avatar, Flex, Button, Text, Box } from '@chakra-ui/react';

export const UserProfileSection = () => {
  const userNickname = '고양이는 멍멍';

  return (
    <Flex
      w='full'
      h={{ base: 'auto', sm: '210px' }}
      mt='30px'
      align='flex-start'
      px={{ base: '30px', sm: '80px' }}
    >
      <Flex w={{ base: 'full', sm: '128px' }} flexDir='column' align='center'>
        <Avatar boxSize={24} mb='16px' />
        <Button w={{ base: '80px', sm: '110px' }} h='36px' fontSize='sm' mb='10px'>
          이미지 업로드
        </Button>
        <Button
          variant='outline'
          bg='none'
          border='none'
          w={{ base: '80px', sm: '110px' }}
          h='36px'
          color='custom.blue'
          fontSize='sm'
          _hover={{}}
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
        <Text w='150px' textAlign='left' fontSize='20px' fontWeight='Bold' mb='6px' mt='10px'>
          {userNickname}
        </Text>
        <Box bg='none' border='none' cursor='pointer'>
          <Text
            w='full'
            fontSize='sm'
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
          fontSize='sm'
          _hover={{}}
        >
          회원탈퇴
        </Button>
      </Flex>
    </Flex>
  );
};
