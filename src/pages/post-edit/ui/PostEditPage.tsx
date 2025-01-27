import { Button, useDisclosure } from '@chakra-ui/react';

import { useGetMockData } from '@shared/hooks';

import { PostModal } from '@widgets/modals';
import { LoadingView } from '@widgets/view';

import { POST_DETAIL_DUMMY_DATA } from '../data';

export const PostEditPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, isPending, isError } = useGetMockData(POST_DETAIL_DUMMY_DATA);

  //TODO: 게시글 수정하기 버튼 클릭 시 Modal 열기
  const onClick = () => {
    onOpen();
  };

  //TODO: 게시글 data 불러오는 중에 에러 발생 시 custom Toast 메시지 띄우기
  if (isError) return <div>오류가 발생했습니다.</div>;

  //TODO: 게시글 data 불러올 떄 Skeleton으로 변경
  if (isPending) return <LoadingView />;

  return (
    <div>
      <Button onClick={onClick}>수정하기</Button>
      <PostModal
        title={data.title}
        isOpen={isOpen}
        onClose={onClose}
        buttonTitle='수정하기'
        postType='edit'
        imageUrl={data.thumbnail}
        postContent={data.content}
      />
    </div>
  );
};
