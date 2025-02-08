import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Flex, Text, Button, Input, Box, IconButton, Spinner } from '@chakra-ui/react';

import { ExternalLink, Copy } from 'lucide-react';

import { useCustomToast } from '@shared/hooks';

import { ResponseCodeReview, uploadReviewResult } from '../../apis';
import { useCodeReview } from '../../hooks';
import { locales } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import { useCreateBlockNote } from '@blocknote/react';

// uploadReviewResult 함수 import

export const CodeInputBox = () => {
  const locale = locales['en'];
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        default: '코드 블락(검정 박스) 안에 작성해 주세요',
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

  const { mutate, isPending, isError, error } = useCodeReview(); // react-query 훅 사용
  const customToast = useCustomToast(); // 커스텀 토스트 훅

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
      code: JSON.stringify(nameAddedContent[0].content),
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

  // 클립보드 복사 함수
  const handleCopyToClipboard = () => {
    if (codeReviewResult) {
      const textToCopy = codeReviewResult.candidates[0].content.parts[0].text;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          customToast({
            toastStatus: 'success',
            toastTitle: '성공!',
            toastDescription: '작업이 성공적으로 완료되었습니다.',
          });
        })
        .catch(() => {
          customToast({
            toastStatus: 'error',
            toastTitle: '복사 실패',
            toastDescription: '클립보드 복사에 실패했습니다',
          });
        });
    }
  };

  const navigate = useNavigate();
  // 게시글로 올리기 함수
  const handleUploadReviewResult = async () => {
    if (!codeReviewResult || !problemName) {
      customToast({
        toastStatus: 'error',
        toastTitle: '에러 발생',
        toastDescription: '코드 리뷰 결과나 문제 번호가 없습니다.',
      });
      return;
    }

    const data = {
      title: problemName, // 문제 번호를 title로 사용
      contents: codeReviewResult.candidates[0].content.parts[0].text, // 코드 리뷰 결과를 contents로 사용
      thumbnail: null, // thumbnail은 null
      summary: `${problemName} 풀이`, // summary는 {문제 번호} 풀이
    };

    try {
      await uploadReviewResult(data); // uploadReviewResult 함수 호출
      customToast({
        toastStatus: 'success',
        toastTitle: '성공!',
        toastDescription: '게시글이 성공적으로 업로드되었습니다.',
      });
      navigate('/');
    } catch (error) {
      console.error('Upload failed:', error);
      customToast({
        toastStatus: 'error',
        toastTitle: '업로드 실패',
        toastDescription: '게시글 업로드에 실패했습니다.',
      });
    }
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
        disabled={isPending} // 로딩 중 버튼 비활성화
      >
        {isPending ? <Spinner size='sm' /> : 'AI 코드리뷰'}
      </Button>

      <Flex direction='column' w='full' mt='28px' gap='5px'>
        <Text w='full' textAlign='left' color='custom.blue' fontSize='24px' fontWeight='Bold'>
          코드 리뷰 결과
        </Text>
        <Flex mt='20px'>
          <Text w='full' textAlign='left' fontSize='16px' mb='5px'>
            게시물로 작성하거나 복사해서 코드 리뷰를 활용해보세요!
          </Text>
          <IconButton
            aria-label='copy'
            boxSize='24px'
            icon={<Copy size={16} />}
            onClick={handleCopyToClipboard}
          ></IconButton>
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
          onClick={handleUploadReviewResult} // 게시글로 올리기 함수 연결
        >
          게시글로 올리기
        </Button>
      </Flex>
    </Flex>
  );
};
