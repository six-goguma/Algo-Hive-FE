import { Text, VStack, HStack, Button } from '@chakra-ui/react';

import { TAG_DATA } from '../data';
import { useTagSelection } from '../hooks';

export const PostTag = () => {
  const { selectedTag, onClickTag } = useTagSelection();

  return (
    <VStack w='full' h='70px' bg='white' py='5px' px={{ base: '10px', md: '50px' }} align='start'>
      <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight='bold' color='customGray.500'>
        ※ 태그를 선택하세요
      </Text>
      <HStack gap={{ base: '2', md: '4' }}>
        {TAG_DATA.map((tag) => (
          <Button
            key={tag.label}
            size='md'
            borderRadius='md'
            variant={selectedTag === tag.label ? 'solid' : 'outline'}
            colorScheme={tag.colorScheme}
            bg={selectedTag === tag.label ? `${tag.colorScheme}.300` : 'transparent'}
            color={selectedTag === tag.label ? 'black' : `${tag.colorScheme}.500`}
            _hover={{
              bg: `${tag.colorScheme}.300`,
              color: 'black',
            }}
            border='1px solid'
            borderColor={
              selectedTag === tag.label ? `${tag.colorScheme}.400` : `${tag.colorScheme}.500`
            }
            onClick={() => onClickTag(tag.label)}
          >
            {tag.label}
          </Button>
        ))}
      </HStack>
    </VStack>
  );
};
