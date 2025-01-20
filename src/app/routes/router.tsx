import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainPage } from '@pages/main';

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <MainPage />,
		},
	],
	{
		future: {
			v7_relativeSplatPath: true,
			v7_skipActionErrorRevalidation: true,
		},
	}
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
