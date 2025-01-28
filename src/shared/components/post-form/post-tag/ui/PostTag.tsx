import { Text, VStack, HStack, Tag, TagLabel } from '@chakra-ui/react';

import { TAGDATA } from '../data';
import { useTagSelection } from '../hooks';

export const PostTag = () => {
  const { selectedTag, handleTagClick } = useTagSelection();

  return (
    <VStack w='full' h='70px' bg='white' pt='2' pl='50px' align='start'>
      <Text fontSize='sm' fontWeight='bold' color='customGray.500'>
        ※ 태그를 선택하세요
      </Text>
      <HStack spacing={4}>
        {TAGDATA.map((tag) => (
          <Tag
            key={tag.label}
            size='md'
            borderRadius='md'
            variant={selectedTag === tag.label ? 'solid' : 'outline'}
            colorScheme={tag.colorScheme}
            bg={selectedTag === tag.label ? `${tag.colorScheme}.300` : undefined}
            color={selectedTag === tag.label ? 'black' : undefined}
            _hover={{
              bg: `${tag.colorScheme}.300`,
              color: 'black',
            }}
            cursor='pointer'
            onClick={() => handleTagClick(tag.label)} // 선택 상태 변경
          >
            <TagLabel>{tag.label}</TagLabel>
          </Tag>
        ))}
      </HStack>
    </VStack>
  );
};
