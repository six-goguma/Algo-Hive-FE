import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ChatPage } from '@pages/chat';
import { CodeReviewPage } from '@pages/code-review';
import { ErrorPage } from '@pages/error';
import { MainPage } from '@pages/main';
import { Mypage } from '@pages/mypage';
import { PostDetailPage } from '@pages/post-detail';
import { PostEditPage } from '@pages/post-edit';
import { PostWritePage } from '@pages/post-write';

import { RouterPath } from '@shared/constants';

import { Layout } from '@widgets/layouts';

const router = createBrowserRouter(
	[
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
	],
	{
		future: {
			v7_relativeSplatPath: true,
			v7_skipActionErrorRevalidation: true,
		},
	},
);

export const Routes = () => {
	return (
		<RouterProvider
			router={router}
			future={{
				v7_startTransition: true,
			}}
		/>
	);
};
