import { useState } from 'react';

import { Input, FormControl, Box, Divider, VStack } from '@chakra-ui/react';

export const PostTitle = () => {
  const [title, setTitle] = useState('');
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  return (
    <VStack gap={0} w='full'>
      <FormControl isRequired={true}>
        <Input
          value={title}
          onChange={titleChange}
          placeholder='제목을 입력하세요'
          h={{ base: '50px', md: '75px' }}
          w='full'
          px={{ base: '10px', md: '50px' }}
          fontSize={{ base: '20px', md: '30px' }}
          fontWeight='bold'
          bg='white'
          border='none'
          _focusVisible={{
            border: 'none',
          }}
          _placeholder={{
            color: 'customGray.500',
          }}
        />
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
  );
};
