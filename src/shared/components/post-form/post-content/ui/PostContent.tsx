import { Box } from '@chakra-ui/react';

import { uploadFile } from '../utils';
import { locales } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

const locale = locales['en'];

export const PostContent = () => {
  const editor = useCreateBlockNote({
    // We override the `placeholders` in our dictionary
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
    <>
      <Box w='full' h='600px' overflow='auto' background='white'>
        <BlockNoteView editor={editor} />
      </Box>
    </>
  );
};
