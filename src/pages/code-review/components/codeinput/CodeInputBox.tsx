import { Flex, Text, Button, Input, Box } from '@chakra-ui/react';

import { locales } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

export const CodeInputBox = () => {
  const locale = locales['en'];
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        default: '글을 작성해주세요...',
      },
    },
    initialContent: [
      {
        type: 'codeBlock',
        content: '',
      },
    ],
  });

  return (
    <Flex direction='column' w='full' mt='60px' gap='5px'>
      <Text w='full' textAlign='left' color='custom.blue' fontSize='24px' fontWeight='Bold'>
        코드 작성하기
      </Text>
      <Text w='full' textAlign='left' fontSize='16px' mb='5px' mt='20px'>
        리뷰하고 싶은 코드의 문제 번호를 적어 주세요.
      </Text>
      <Input bg='white' color='black' w='full' h='36px' placeholder='ex) 백준 11033번' />

      <Text w='full' textAlign='left' fontSize='16px' mb='5px' mt='20px'>
        리뷰하고 싶은 코드를 입력해주세요. 코드 리뷰 결과는 Markdown 언어로 제공됩니다.
      </Text>
      <Flex flexDir='column' w='full' h='auto' background='white' textAlign='left'>
        <Box h='auto' overflow='auto' mt='10px' mb='10px'>
          <BlockNoteView
            editor={editor}
            sideMenu={false} // 사이드 메뉴 비활성화
            formattingToolbar={false} // 포맷팅 툴바 비활성화
            slashMenu={false} // 슬래시 메뉴 비활성화
          />
        </Box>
      </Flex>
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
