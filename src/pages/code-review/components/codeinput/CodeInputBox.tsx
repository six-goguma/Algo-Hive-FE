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

  const [problemName, setProblemName] = useState<string>('');
  const [codeReviewResult, setCodeReviewResult] = useState<ResponseCodeReview | null>(null);

  const { mutate, isPending } = useCodeReview();
  const customToast = useCustomToast();

  const handleSubmit = () => {
    const codeBlock = editor.document.find((block) => block.type === 'codeBlock');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = codeBlock?.content?.[0] as any;
    const code = JSON.stringify(content.text);

    const parseDataToSend = {
      code: `// 문제 번호: ${problemName}\n${code}`,
    };

    mutate(parseDataToSend.code, {
      onSuccess: (data) => {
        setCodeReviewResult(data);
      },
      onError: (error) => {
        console.error('Code review failed:', error);
      },
    });
  };

  const handleCopyToClipboard = async () => {
    const textToCopy = codeReviewResult?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!textToCopy) {
      customToast({
        toastStatus: 'error',
        toastTitle: '복사 실패',
        toastDescription: '복사할 내용이 없습니다.',
      });
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        customToast({
          toastStatus: 'success',
          toastTitle: '성공!',
          toastDescription: '클립보드에 복사되었습니다.',
        });
        return;
      } catch (error) {
        console.error('클립보드 복사 실패:', error);
      }
    }

    // http 환경
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    customToast({
      toastStatus: 'success',
      toastTitle: '성공!',
      toastDescription: '클립보드에 복사되었습니다.',
    });
  };

  const navigate = useNavigate();

  const handleUploadReviewResult = async () => {
    if (!codeReviewResult || !problemName) {
      customToast({
        toastStatus: 'error',
        toastTitle: '에러 발생',
        toastDescription: '코드 리뷰 결과나 문제 번호가 없습니다.',
      });
      return;
    }

    const markdownText = codeReviewResult.candidates[0].content.parts[0].text;

    try {
      const blocks = await editor.tryParseMarkdownToBlocks(markdownText);

      const data = {
        title: problemName,
        contents: JSON.stringify(blocks),
        thumbnail: null,
        summary: `${problemName} 풀이`,
      };

      await uploadReviewResult(data);
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
            sideMenu={false}
            formattingToolbar={false}
            slashMenu={false}
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
        disabled={isPending}
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
          <Box h='full' p='0 10px 0 10px'>
            {codeReviewResult && <pre>{codeReviewResult.candidates[0].content.parts[0].text}</pre>}
          </Box>
        </Box>
        <Button
          leftIcon={<ExternalLink size={16} />}
          colorScheme='custom.blue'
          w='124px'
          h='32px'
          mt='10px'
          fontSize='14px'
          alignSelf='flex-end'
          onClick={handleUploadReviewResult}
        >
          게시글로 올리기
        </Button>
      </Flex>
    </Flex>
  );
};
