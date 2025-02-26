import { Flex } from '@chakra-ui/react';

import { ResponsePostDetail } from '@pages/post-detail/apis';

import { BlockNoteDetailStyles } from '../../styles';
import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';

type PostContentsProps = {
  post: ResponsePostDetail;
};

export const PostContents = ({ post }: PostContentsProps) => {
  const initialContent = JSON.parse(post.contents) as PartialBlock[];
  const editor = BlockNoteEditor.create({ initialContent });

  return (
    <Flex w='full' my={10} textAlign='start'>
      <BlockNoteDetailStyles />
      <BlockNoteView editor={editor} editable={false} />
    </Flex>
  );
};
