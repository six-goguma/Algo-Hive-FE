import { Box, useBreakpointValue } from '@chakra-ui/react';

import { BlockNoteStyles } from './BlockNoteStyles';
import { locales } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

const locale = locales['en'];

export const PostContent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('파일 업로드 실패');
      }

      const data = await response.json();
      return data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      return '';
    }
  };

  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        default: '글을 작성해주세요...',
      },
    },
    uploadFile,
  });

  return (
    <Box
      w='full'
      h={isMobile ? '400px' : '600px'}
      overflow='auto'
      background='white'
      textAlign='left'
    >
      <BlockNoteStyles />
      <BlockNoteView
        editor={editor}
        sideMenu={isMobile ? false : true}
        formattingToolbar={isMobile ? false : true}
        slashMenu={isMobile ? false : true}
      />
    </Box>
  );
};
