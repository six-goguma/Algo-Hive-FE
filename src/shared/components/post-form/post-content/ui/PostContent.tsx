import { Box, useBreakpointValue } from '@chakra-ui/react';

import { BlockNoteStyles } from './BlockNoteStyles';
// import { uploadFile } from '../utils';
import { locales } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

const locale = locales['en'];

export const PostContent = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        default: '글을 작성해주세요...',
      },
    },
    // uploadFile,
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
