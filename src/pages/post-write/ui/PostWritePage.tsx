import { Button } from '@chakra-ui/react';

import { PostDialog } from '@widgets/dialog';

export const PostWritePage = () => {
  return (
    <div>
      <Button>작성완료</Button>
      <PostDialog title='백준 1004번 풀이' buttonTitle='출간하기' postType='create' />
    </div>
  );
};
