import { useState } from 'react';

import { Input, FormControl } from '@chakra-ui/react';

export const PostTitle = () => {
  const [title, setTitle] = useState('');
  const titleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  return (
    <FormControl isRequired={true}>
      <Input
        value={title}
        onChange={titleChange}
        placeholder='제목을 입력하세요'
        h={{ base: '44px', sm: '60px', md: '75px' }}
        pl='50px'
        fontSize={{ base: '20px', sm: '24px', md: '28px' }}
        fontWeight='bold'
        bg='white'
        border='none'
        borderRadius='none'
        _focusVisible={{
          border: 'none',
          boxShadow: 'none',
        }}
        _placeholder={{
          color: '#21259',
        }}
      />
    </FormControl>
  );
};
