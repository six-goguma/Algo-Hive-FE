import { Button } from '@chakra-ui/react';

import { useGetMockData } from '@shared/hooks';

import { PostDialog } from '@widgets/dialog';
import { LoadingView } from '@widgets/view';

import { POST_DETAIL_DUMMY_DATA } from '../data';

export const PostEditPage = () => {
  const { data, isPending, isError } = useGetMockData(POST_DETAIL_DUMMY_DATA);

  //TODO: 게시글 data 불러오는 중에 에러 발생 시 custom Toast 메시지 띄우기
  if (isError) return <div>오류가 발생했습니다.</div>;

  //TODO: 게시글 data 불러올 떄 Skeleton으로 변경
  if (isPending) return <LoadingView />;

  return (
    <div>
      <Button>수정하기</Button>
      <PostDialog
        title={data.title}
        buttonTitle='수정하기'
        postType='edit'
        imageUrl={data.thumbnail}
        postContent={data.content}
      />
    </div>
  );
};
