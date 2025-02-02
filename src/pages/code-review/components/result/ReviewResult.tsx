import { Flex, Text, Button, Box, IconButton } from '@chakra-ui/react';

// import { ExternalLink, Copy } from 'lucide-react';

export const ReviewResult = () => {
  return (
    <Flex direction='column' w='full' mt='28px' gap='5px'>
      <Text w='full' textAlign='left' color='custom.blue' fontSize='24px' fontWeight='Bold'>
        코드 리뷰 결과
      </Text>
      <Flex>
        <Text w='full' textAlign='left' fontSize='16px' mb='5px'>
          게시물로 작성하거나 복사해서 코드 리뷰를 활용해보세요!
        </Text>
        <IconButton aria-label='copy' boxSize='24px'>
          {/* <Copy size={16} /> */}
        </IconButton>
      </Flex>
      <Box bg='white' color='black' w='full' h='600px' />
      <Button
        colorScheme='custom.blue'
        w='124px'
        h='32px'
        mt='10px'
        fontSize='14px'
        alignSelf='flex-end'
      >
        {/* <ExternalLink size={16} /> */}
        게시글로 올리기
      </Button>
    </Flex>
  );
};
