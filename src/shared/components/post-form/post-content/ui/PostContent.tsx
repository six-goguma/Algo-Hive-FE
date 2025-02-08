import { useFormContext } from 'react-hook-form';

import { Box, useBreakpointValue } from '@chakra-ui/react';

import { FormField, FormItem } from '@shared/components';
import { BASE_URI } from '@shared/service';

import { BlockNoteStyles } from './BlockNoteStyles';
import { locales, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { useCreateBlockNote } from '@blocknote/react';

const locale = locales['en'];

type PostContentFieldEditorProps = {
  contents?: string;
};

export const PostContent = ({ contents }: PostContentFieldEditorProps) => {
  const { control } = useFormContext();
  const SERVER_URL = 'http://algo.knu-soft.site';
  const isMobile = useBreakpointValue({ base: true, md: false });

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${BASE_URI}/images/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('파일 업로드 실패');
      }

      const data = await response.json();
      return `${SERVER_URL}${data.url}`;
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      return '';
    }
  };

  const initialContent: PartialBlock[] | undefined = contents ? JSON.parse(contents) : undefined;

  const editor = useCreateBlockNote({
    dictionary: {
      ...locale,
      placeholders: {
        ...locale.placeholders,
        default: '글을 작성해주세요...',
      },
    },
    initialContent,
    uploadFile,
  });

  return (
    <FormField
      name='content'
      control={control}
      rules={{ required: '글을 작성해주세요' }}
      render={({ field }) => (
        <FormItem style={{ width: '100%' }}>
          <Box w='full' h={{ base: '4px', md: '8px' }} bg='white' />
          <Box
            w='full'
            h={isMobile ? '400px' : '600px'}
            overflow='auto'
            background='white'
            textAlign='left'
            sx={{
              '::-webkit-scrollbar': { display: 'none' },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
          >
            <BlockNoteStyles />
            <BlockNoteView
              editor={editor}
              onChange={() => field.onChange(JSON.stringify(editor.document))}
              sideMenu={!isMobile}
              formattingToolbar={!isMobile}
              slashMenu={!isMobile}
            />
          </Box>
        </FormItem>
      )}
    />
  );
};
