import { useState } from 'react';

import { Input, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';

export const PostTitle = () => {
  const [title, setTitle] = useState('');
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

  return (
    <FormControl>
      <FormLabel>제목을 입력하세요</FormLabel>
      <Input
        value={title}
        onChange={handleTitleChange}
        maxLength={20}
        placeholder='제목을 입력하세요'
      />
      <FormHelperText>최대 20자까지 입력 가능합니다.</FormHelperText>
    </FormControl>
  );
};
