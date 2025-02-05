import { Flex, Button, Text, Box, Image, VStack } from '@chakra-ui/react';

import { useGetMockData } from '@shared/hooks';

import { MOCK_USER_PROFILE } from '../../data';
import { SkeletonProfileSection } from './SkeletonProfileSection';

export const UserProfileSection = () => {
  const { data, isPending } = useGetMockData(MOCK_USER_PROFILE);
  return (
    <>
      {isPending ? (
        <SkeletonProfileSection />
      ) : (
        <Flex
          w='full'
          maxW={{ base: 'full', sm: '1000px' }}
          h={{ base: 'auto', sm: '210px' }}
          mt='30px'
          align='flex-start'
          px={{ base: '10px', sm: '40px' }}
        >
          <Flex w={{ base: 'full', sm: '128px' }} flexDir='column' align='center'>
            <Image src={data.profile} boxSize={24} mb='16px' borderRadius='full' />

            <Button w={{ base: '100px', sm: '110px' }} h='36px' fontSize='sm' mb='10px'>
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
            w={{ base: 'full', sm: 'full' }}
            ml={{ base: '16px', sm: '30px' }}
            justify='space-between'
          >
            <VStack w='full' align='start' spacing={1}>
              <Text w='150px' textAlign='left' fontSize='20px' fontWeight='Bold' mb='6px' mt='10px'>
                {data.userNickname}
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
            </VStack>
            <Flex align='center' mb={4}>
              <Button
                variant='outline'
                color='customGray.500'
                borderColor='customGray.500'
                w={{ base: '60px', sm: '80px' }}
                h={{ base: '28px', sm: '32px' }}
                fontSize='sm'
                _hover={{}}
              >
                회원탈퇴
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};
