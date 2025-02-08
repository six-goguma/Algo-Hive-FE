import { useState } from 'react';

import { Flex, Text, Button, Input, Box, IconButton } from '@chakra-ui/react';

import { ExternalLink, Copy } from 'lucide-react';

import { ResponseCodeReview } from '../../apis';
import { useCodeReview } from '../../hooks';
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

  const [problemName, setProblemName] = useState<string>(''); // 문제 번호
  const [codeReviewResult, setCodeReviewResult] = useState<ResponseCodeReview | null>(null);

  const { mutate, isLoading, isError, error } = useCodeReview(); // react-query 훅 사용

  const handleSubmit = () => {
    const content = editor.document; // 현재 편집기의 내용을 JSON 형식으로 가져옴
    // problemName을 주석으로 추가
    const nameAddedContent = [
      {
        type: 'codeBlock',
        content: `// 문제 번호: ${problemName}\n${content[0].content}`,
      },
      ...content.slice(1), // 나머지 블록 유지
    ];
    const parseDataToSend = {
      code: JSON.stringify(nameAddedContent),
    };

    // 코드 리뷰 요청
    mutate(parseDataToSend.code, {
      onSuccess: (data) => {
        setCodeReviewResult(data); // 코드 리뷰 결과 저장
      },
      onError: (error) => {
        console.error('Code review failed:', error);
      },
    });
  };

  return (
    <Flex direction='column' w='full' mt='60px' gap='5px'>
      <Text w='full' textAlign='left' color='custom.blue' fontSize='24px' fontWeight='Bold'>
        코드 작성하기
      </Text>
      <Text w='full' textAlign='left' fontSize='16px' mb='5px' mt='20px'>
        리뷰하고 싶은 코드의 문제 번호를 적어 주세요.
      </Text>
      <Input
        bg='white'
        color='black'
        w='full'
        h='36px'
        placeholder='ex) 백준 11033번'
        value={problemName}
        onChange={(e) => setProblemName(e.target.value)}
      />

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
        onClick={handleSubmit}
      >
        AI 코드리뷰
      </Button>

      <Flex direction='column' w='full' mt='28px' gap='5px'>
        <Text w='full' textAlign='left' color='custom.blue' fontSize='24px' fontWeight='Bold'>
          코드 리뷰 결과
        </Text>
        <Flex mt='20px'>
          <Text w='full' textAlign='left' fontSize='16px' mb='5px'>
            게시물로 작성하거나 복사해서 코드 리뷰를 활용해보세요!
          </Text>
          <IconButton aria-label='copy' boxSize='24px' icon={<Copy size={16} />}></IconButton>
        </Flex>
        <Box bg='white' color='black' w='full' h='600px' overflow='auto'>
          {codeReviewResult && <pre>{codeReviewResult.candidates[0].content.parts[0].text}</pre>}
        </Box>
        <Button
          leftIcon={<ExternalLink size={16} />}
          colorScheme='custom.blue'
          w='124px'
          h='32px'
          mt='10px'
          fontSize='14px'
          alignSelf='flex-end'
        >
          게시글로 올리기
        </Button>
      </Flex>
    </Flex>
  );
};
