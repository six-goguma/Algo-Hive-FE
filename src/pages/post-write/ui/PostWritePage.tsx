import { useDisclosure, Button } from '@chakra-ui/react';

import { PostModal } from '@widgets/modals';

export const PostWritePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  //TODO: 작성완료 버튼 클릭 시 Modal 열기
  const onClick = () => {
    onOpen();
  };

  return (
    <div>
      <Button onClick={onClick}>작성완료</Button>
      <PostModal
        title='백준 1004번 풀이'
        isOpen={isOpen}
        onClose={onClose}
        buttonTitle='출간하기'
        postType='create'
      />
    </div>
  );
};
