import { Box } from '@chakra-ui/react';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

export const PostContent = () => {
  const editor = useCreateBlockNote();

  return (
    <Box w='full' h='600px' overflow='auto' background='white'>
      <BlockNoteView editor={editor} />
    </Box>
  );
};
