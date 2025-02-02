import { Flex, Text, Textarea, Button } from '@chakra-ui/react';

export const CodeInputBox = () => {
  return (
    <Flex direction='column' w='full' mt='60px' gap='5px'>
      <Text w='full' textAlign='left' color='custom.blue' fontSize='24px' fontWeight='Bold'>
        코드 작성하기
      </Text>
      <Text w='full' textAlign='left' fontSize='16px' mb='5px'>
        리뷰하고 싶은 코드를 입력해주세요. 코드 리뷰 결과는 Markdown 언어로 제공됩니다.
      </Text>
      <Textarea bg='white' color='black' w='full' h='600px' placeholder='코드를 입력해 주세요.' />
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
  );
};
