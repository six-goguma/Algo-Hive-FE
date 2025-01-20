import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainPage } from '@pages/main';
import { Layout } from '@widgets/layouts';
import { PostDetailPage } from '@pages/post-detail';
import { PostEditPage } from '@pages/post-edit';
import { PostWritePage } from '@pages/post-write';
import { ChatPage } from '@pages/chat';
import { CodeReviewPage } from '@pages/code-review';
import { Mypage } from '@pages/mypage';
import { ErrorPage } from '@pages/error';
import { RouterPath } from '@shared/constants';

const router = createBrowserRouter([
	{
		path: RouterPath.ROOT,
		element: <Layout />,
		children: [
			{
				path: RouterPath.MAIN,
				element: <MainPage />,
			},
			{
				path: RouterPath.POST_DETAIL,
				element: <PostDetailPage />,
			},
			{
				path: RouterPath.POST_EDIT,
				element: <PostEditPage />,
			},
			{
				path: RouterPath.POST_WRITE,
				element: <PostWritePage />,
			},
			{
				path: RouterPath.CHAT,
				element: <ChatPage />,
			},
			{
				path: RouterPath.CODE_REVIEW,
				element: <CodeReviewPage />,
			},
			{
				path: RouterPath.MYPAGE,
				element: <Mypage />,
			},
			{
				path: RouterPath.ERROR,
				element: <ErrorPage />,
			},
		],
	},
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
