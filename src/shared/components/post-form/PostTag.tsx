import { Select, FormControl, FormLabel } from '@chakra-ui/react';

export const PostTag = () => {
  return (
    <FormControl>
      <FormLabel>태그를 선택하세요</FormLabel>
      <Select placeholder='태그를 선택하세요'>
        <option value='홍보'>홍보</option>
        <option value='질문'>질문</option>
        <option value='팁'>팁</option>
        <option value='자유'>자유</option>
        <option value='백준'>백준</option>
      </Select>
    </FormControl>
  );
};
