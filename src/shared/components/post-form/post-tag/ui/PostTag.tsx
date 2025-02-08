import { useFormContext } from 'react-hook-form';

import { Text, VStack, HStack, Button } from '@chakra-ui/react';

import { FormField, FormItem } from '@shared/components';

import { TAG_DATA } from '../data';

export const PostTag = () => {
  const { control, setValue, watch } = useFormContext();
  const selectedTag = watch('tag');

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
              ※ 태그를 선택하세요
            </Text>
            <HStack gap={{ base: '2', md: '4' }}>
              {TAG_DATA.map((tag) => (
                <Button
                  key={tag.id}
                  size='md'
                  borderRadius='md'
                  variant={selectedTag === tag.id ? 'solid' : 'outline'}
                  colorScheme={tag.colorScheme}
                  bg={selectedTag === tag.id ? `${tag.colorScheme}.300` : 'transparent'}
                  color={selectedTag === tag.id ? 'black' : `${tag.colorScheme}.500`}
                  _hover={{
                    bg: `${tag.colorScheme}.300`,
                    color: 'black',
                  }}
                  border='1px solid'
                  borderColor={
                    selectedTag === tag.id ? `${tag.colorScheme}.400` : `${tag.colorScheme}.500`
                  }
                  onClick={() => {
                    setValue('tag', tag.id); // 태그를 숫자로 저장
                  }}
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
