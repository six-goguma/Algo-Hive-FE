import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Flex, Spinner, Text } from '@chakra-ui/react';

import { getPostDetail, ResponsePostDetail } from '@pages/post-detail/apis';

import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/react/style.css';

export const PostContents = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<ResponsePostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState<BlockNoteEditor | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchPostData = async () => {
      try {
        setLoading(true);
        const postDetail = await getPostDetail({ postId: Number(postId) });

        setPost(postDetail);

        const initialContent = JSON.parse(postDetail.contents) as PartialBlock[];

        const newEditor = BlockNoteEditor.create({ initialContent });

        setEditor(newEditor);
      } catch (error) {
        console.error('게시글 정보를 불러오는 데 실패했습니다.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  if (loading) {
    return (
      <Flex justify='center' align='center' w='full' h='200px'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  if (!post || !editor) {
    return (
      <Flex justify='center' align='center' w='full' h='200px'>
        <Text>게시글을 불러올 수 없습니다.</Text>
      </Flex>
    );
  }

  return (
    <Flex w='full' my={10} textAlign='start'>
      <BlockNoteView editor={editor} editable={false} />
    </Flex>
  );
};
