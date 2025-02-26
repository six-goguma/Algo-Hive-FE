import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Text, VStack, HStack, Button } from '@chakra-ui/react';

import { FormField, FormItem } from '@shared/components';

import { TAG_DATA } from '../data';

type PostTagProps = {
  tag?: number[];
};

export const PostTag = ({ tag }: PostTagProps) => {
  const { control, setValue, watch } = useFormContext();
  const selectedTags: number[] = watch('tag') || [];

  useEffect(() => {
    if (tag !== undefined) {
      setValue('tag', tag);
    }
  }, [tag, setValue]);

  const toggleTag = (tagId: number) => {
    const updatedTags = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId];

    setValue('tag', updatedTags);
  };

  return (
    <FormField
      name='tag'
      control={control}
      rules={{ required: '태그를 선택해주세요' }}
      render={() => (
        <FormItem style={{ width: '100%' }}>
          <VStack
            w='full'
            h='70px'
            bg='white'
            py='5px'
            px={{ base: '10px', md: '50px' }}
            align='start'
          >
            <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight='bold' color='customGray.500'>
              ※ 태그를 선택하세요 (여러 개 선택 가능)
            </Text>
            <HStack gap={{ base: '2', md: '4' }}>
              {TAG_DATA.map((tag) => (
                <Button
                  key={tag.id}
                  size='md'
                  borderRadius='md'
                  variant={selectedTags.includes(tag.id) ? 'solid' : 'outline'}
                  bg={selectedTags.includes(tag.id) ? `${tag.color}.300` : 'transparent'}
                  color={selectedTags.includes(tag.id) ? 'black' : `${tag.color}.500`}
                  _hover={{
                    bg: `${tag.color}.300`,
                    color: 'black',
                  }}
                  border='1px solid'
                  borderColor={
                    selectedTags.includes(tag.id) ? `${tag.color}.400` : `${tag.color}.500`
                  }
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.label}
                </Button>
              ))}
            </HStack>
          </VStack>
        </FormItem>
      )}
    />
  );
};
