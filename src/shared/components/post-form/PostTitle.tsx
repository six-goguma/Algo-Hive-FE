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
        h='75px'
        pl='15px'
        fontSize='28px'
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
