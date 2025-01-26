import { Flex, Text, Textarea, Button, Box } from '@chakra-ui/react';

import { ExternalLink } from 'lucide-react';

export const CodeReviewPage = () => {
  return (
    <Flex w='full' justify='center' overflow={{ base: 'scroll', sm: 'hidden' }}>
      <Flex w='80%' flexDir='column' align='center' mb='100px'>
        <Flex direction='column' w='full' mt='60px' gap='5px'>
          <Text w='full' textAlign='left' color='custom.blue' fontSize='24px' fontWeight='Bold'>
            코드 작성하기
          </Text>
          <Text w='full' textAlign='left' fontSize='16px' mb='5px'>
            리뷰하고 싶은 코드를 입력해주세요. 코드 리뷰 결과는 Markdown 언어로 제공됩니다.
          </Text>
          <Textarea
            bg='white'
            color='black'
            w='full'
            h='600px'
            placeholder='코드를 입력해 주세요.'
          />
          <Button
            colorScheme='custom.blue'
            w='96px'
            h='32px'
            mt='10px'
            fontSize='14px'
            alignSelf='flex-end'
          >
            AI 코드리뷰
          </Button>
        </Flex>
        <Flex direction='column' w='full' mt='28px' gap='5px'>
          <Text w='full' textAlign='left' color='custom.blue' fontSize='24px' fontWeight='Bold'>
            코드 리뷰 결과
          </Text>
          <Text w='full' textAlign='left' fontSize='16px' mb='5px'>
            게시물로 작성하거나 복사해서 코드 리뷰를 활용해보세요!
          </Text>
          <Box bg='white' color='black' w='full' h='600px' />
          <Button
            leftIcon={<ExternalLink size={16} />}
            colorScheme='custom.blue'
            w='100px'
            h='32px'
            mt='10px'
            fontSize='14px'
            alignSelf='flex-end'
          >
            게시글로 올리기
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
