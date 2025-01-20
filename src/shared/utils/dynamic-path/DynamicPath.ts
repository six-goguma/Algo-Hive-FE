import { RouterPath } from '@shared/constants';

export const getDynamicPath = {
	postDetail: (postId: string) =>
		RouterPath.POST_DETAIL.replace(':postId', postId),
	postEdit: (postId: string) => RouterPath.POST_EDIT.replace(':postId', postId),
};
