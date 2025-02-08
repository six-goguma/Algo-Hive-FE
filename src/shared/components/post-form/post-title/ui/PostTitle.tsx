import { useFormContext } from 'react-hook-form';

import { VStack, Box, Divider, Textarea } from '@chakra-ui/react';

import { FormField, FormControl, FormMessage, FormItem } from '@shared/components';

export const PostTitle = () => {
  const { control } = useFormContext();

  return (
    <FormField
      name='title'
      control={control}
      rules={{ required: '제목을 입력해주세요' }}
      render={({ field }) => (
        <FormItem style={{ width: '100%' }}>
          <VStack gap={0} w='full'>
            <Box w='full' h={{ base: '5px', md: '15px' }} bg='white' />
            <FormControl>
              <Textarea
                {...field}
                placeholder='제목을 입력하세요'
                h={{ base: '45px', md: '65px' }}
                minH='unset'
                w='full'
                px={{ base: '10px', md: '50px' }}
                fontSize={{ base: '20px', md: '30px' }}
                fontWeight='bold'
                bg='white'
                border='none'
                overflowY='auto'
                whiteSpace='pre-wrap'
                resize='none'
                sx={{
                  '::-webkit-scrollbar': { display: 'none' },
                  '-ms-overflow-style': 'none',
                  'scrollbar-width': 'none',
                }}
                _focusVisible={{
                  border: 'none',
                }}
                _placeholder={{
                  color: 'customGray.500',
                }}
              />
              <FormMessage />
            </FormControl>
            <Box w='full' h='14px' bg='white'>
              <Divider
                w={{ base: '145px', md: '215px' }}
                h='8px'
                bg='black'
                ml={{ base: '10px', md: '50px' }}
              />
            </Box>
          </VStack>
        </FormItem>
      )}
    />
  );
};
