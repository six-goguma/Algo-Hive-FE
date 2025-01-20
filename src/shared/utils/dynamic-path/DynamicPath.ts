import { RouterPath } from '@shared/constants';

export const getDynamicPath = {
	postDetail: (postId: string) =>
		RouterPath.postDetail.replace(':postId', postId),
	postEdit: (postId: string) => RouterPath.postEdit.replace(':postId', postId),
};
